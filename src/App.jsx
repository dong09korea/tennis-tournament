import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Bracket from './components/BracketFixed';
import Standings from './components/Standings';
import AdminDashboard from './components/AdminDashboardNew';
import SplashScreen from './components/SplashScreen';

import { subscribeToData, uploadData, updateCourt, updateMatch } from './services/firebase';
import {
    calculateStandings,
    isGroupMatch,
    generateBracket32,
    getTop32Teams,
    FIXED_BRACKET_LAYOUT
} from './utils/tournamentLogic';

// Request notification permission on load
const requestNotifPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
    }
};

// Register service worker
const registerSW = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (e) {
            console.warn('SW registration failed:', e);
        }
    }
};

function App() {
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'live');
    const [data, setData] = useState({ teams: [], groups: [], matches: [], courts: [] });
    const [status, setStatus] = useState("");
    const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
    const [numCourts, setNumCourts] = useState(() => Number(localStorage.getItem('numCourts')) || 10);
    const [notifications, setNotifications] = useState([]);
    const prevMatchesRef = useRef([]);
    const assignDebounceRef = useRef(null);
    const bracketFillDebounceRef = useRef(null);
    const alarmAudioRef = useRef(null);
    const latestDataRef = useRef({ teams: [], groups: [], matches: [], courts: [] });
    const adminRef = useRef(null);
    const autoKnock32DoneRef = useRef(false); // prevent repeated auto-generation
    const [audioUnlocked, setAudioUnlocked] = useState(false);
    // Splash: show once per browser session
    const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashDone'));

    // For Lottery Animation preview in Standings
    const [previewTeams, setPreviewTeams] = useState(null);
    const [previewGroups, setPreviewGroups] = useState(null);

    const getNotifiedMatches = () => {
        try {
            const stored = localStorage.getItem('notifiedMatchesList');
            return new Set(stored ? JSON.parse(stored) : []);
        } catch (e) { return new Set(); }
    };
    const addNotifiedMatch = (id) => {
        const set = getNotifiedMatches();
        if (!set.has(id)) {
            set.add(id);
            localStorage.setItem('notifiedMatchesList', JSON.stringify([...set]));
        }
    };

    // Register SW + request notification permission once
    useEffect(() => {
        registerSW();
        requestNotifPermission();
    }, []);

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('isAdmin', isAdmin);
    }, [isAdmin]);

    useEffect(() => {
        localStorage.setItem('numCourts', numCourts);
    }, [numCourts]);

    useEffect(() => {
        const unsubscribe = subscribeToData((updater) => {
            setData(updater);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!data) return;
        const newData = data;
        latestDataRef.current = newData; // constantly keep freshest data reference

        // Check for newly assigned matches to trigger alarm
        if (newData.matches && newData.courts && newData.teams) {
            const newLiveMatches = newData.matches.filter(m => {
                if (m.status !== 'LIVE' || !m.court_id) return false;
                if (getNotifiedMatches().has(m.id)) return false;

                const prevMatch = prevMatchesRef.current.find(pm => pm.id === m.id);

                // If the match was not PENDING before (e.g., initial generation or page refresh),
                // we quietly add it to notified set without ringing the alarm.
                if (!prevMatch || prevMatch.status !== 'PENDING') {
                    addNotifiedMatch(m.id);
                    return false;
                }

                return true; // Match was PENDING and is now LIVE
            });

            if (newLiveMatches.length > 0) {
                newLiveMatches.forEach(matchToNotify => {
                    const courtId = newData.courts.find(c => c.match_id === matchToNotify.id)?.id;
                    const teamA = newData.teams.find(t => t.id === matchToNotify.team_a_id);
                    const teamB = newData.teams.find(t => t.id === matchToNotify.team_b_id);

                    if (courtId && teamA && teamB) {
                        triggerAlarm({
                            id: matchToNotify.id,
                            court: courtId,
                            teamA: teamA.name,
                            teamB: teamB.name,
                            group: matchToNotify.group_id
                        });
                        addNotifiedMatch(matchToNotify.id);
                    }
                });
            }
        }

        // ── Tie detection: alert admin when a group finishes with tied teams ──
        if (isAdmin && newData.matches && newData.teams) {
            const isGroupMatchFn = (m) => {
                const g = m.group_id;
                return typeof g === 'number' || (typeof g === 'string' && g.includes('조')) || /^\d+$/.test(String(g));
            };
            const byGroup = {};
            newData.matches.filter(isGroupMatchFn).forEach(m => {
                if (!byGroup[m.group_id]) byGroup[m.group_id] = [];
                byGroup[m.group_id].push(m);
            });
            Object.entries(byGroup).forEach(([gName, gMatches]) => {
                const allDone = gMatches.every(m => m.status === 'COMPLETED');
                if (!allDone) return;
                const prevGMatches = (prevMatchesRef.current || []).filter(m => m.group_id === gName);
                const wasDone = prevGMatches.length > 0 && prevGMatches.every(m => m.status === 'COMPLETED');
                if (wasDone) return;
                const standings = calculateStandings(newData.teams, newData.matches);
                const gs = standings[gName] || [];
                const hasTie = gs.some((t, i) => gs.some((u, j) =>
                    i !== j && t.pts === u.pts && t.wins === u.wins && t.goalDiff === u.goalDiff && !t.tiebreakAge && !u.tiebreakAge
                ));
                if (hasTie) {
                    const notifId = `tie_${gName}`;
                    setNotifications(prev => prev.some(n => n.id === notifId) ? prev : [
                        ...prev, {
                            id: notifId, type: 'tie', group: gName,
                            teamA: '🔥 동점 발생!', teamB: '순위표에서 합산 나이를 입력·확정해주세요', court: '→ 순위표 탭'
                        }
                    ]);
                }
            });
        }

        // Auto-assignment check
        if (newData.matches && newData.courts) {
            const hasEmptyCourts = newData.courts.some(c => {
                if (c.match_id === null) return true;
                const linkedMatch = newData.matches.find(m => m.id === c.match_id);
                return !linkedMatch || linkedMatch.status !== 'LIVE';
            });
            const hasPendingMatches = newData.matches.some(m => m.status === 'PENDING' && !m.court_id);
            console.log(`[AutoAssign Watcher] hasEmptyCourts: ${hasEmptyCourts}, hasPendingMatches: ${hasPendingMatches}`);

            if (hasEmptyCourts && hasPendingMatches) {
                if (assignDebounceRef.current) clearTimeout(assignDebounceRef.current);
                
                // Capture the current snapshot data in closure
                const capturedData = { matches: [...newData.matches], courts: [...newData.courts] };
                setDebugMsg('TIMER SET, WAITING...');
                
                assignDebounceRef.current = setTimeout(async () => {
                    setDebugMsg('TIMER FIRED!');
                    console.log(`[AutoAssign Timer Fired]`);
                    try {
                        const { matches: nextMatches, courts: nextCourts } = assignMatchesToCourts(capturedData.matches, capturedData.courts);
                        
                        // Extract only the courts and matches that actually changed to save Firebase writes
                        const changedCourts = nextCourts.filter(c => c.match_id !== capturedData.courts.find(oc => oc.id === c.id)?.match_id);
                        const changedMatches = nextMatches.filter(m => {
                            const oldM = capturedData.matches.find(om => om.id === m.id);
                            return oldM && (m.status !== oldM.status || m.court_id !== oldM.court_id);
                        });

                        setDebugMsg(`ALG OUT: ${changedCourts.length}C, ${changedMatches.length}M`);
                        console.log(`[AutoAssign Check] Changed matches: ${changedMatches.length}, Changed courts: ${changedCourts.length}`);

                        if (changedCourts.length > 0 || changedMatches.length > 0) {
                            console.log(`[AutoAssign Executing] Updating ${changedCourts.length} courts and ${changedMatches.length} matches.`);
                            setDebugMsg('UPLOADING TO DB...');
                            const promises = [];
                            
                            changedCourts.forEach(c => {
                                promises.push(updateCourt(c.id, { match_id: c.match_id }));
                            });
                            
                            changedMatches.forEach(m => {
                                promises.push(updateMatch(m.id, { status: m.status, court_id: m.court_id }));
                            });

                            await Promise.all(promises);
                            setDebugMsg('DB UPDATE SUCCESS');
                            console.log(`[AutoAssign Success] Firebase updated.`);
                        }
                    } catch (e) {
                        setDebugMsg(`ERROR: ${e.message}`);
                        console.error('[AutoAssign Error]', e);
                    }
                }, 500); // reduced timeout to feel snappier
            }

            // ── Progressive 32-bracket slot filling ─────────────────────────
            const knockoutGroups = ['본선 32강', '16강', '8강', '4강', '결승', '본선 16강 (무작위)'];
            const isGroupMatch = (m) => {
                const g = m.group_id;
                return typeof g === 'number' || (typeof g === 'string' && g.includes('조')) || /^\d+$/.test(String(g));
            };
            const groupMatches = newData.matches.filter(isGroupMatch);
            const bracketShellExists = newData.matches.some(m => m.group_id === '본선 32강');

            if (groupMatches.length > 0 && newData.teams) {
                const anyGroupCompleted = (() => {
                    // Check if at least one full group (all its matches) is completed
                    const byGrp = {};
                    groupMatches.forEach(m => {
                        const key = m.group_id;
                        if (!byGrp[key]) byGrp[key] = { total: 0, done: 0 };
                        byGrp[key].total++;
                        if (m.status === 'COMPLETED') byGrp[key].done++;
                    });
                    return Object.values(byGrp).some(g => g.total > 0 && g.done === g.total);
                })();

                // Step 1: Create bracket shell as soon as the first group finishes.
                // TBD matches are safe thanks to the TBD guard in assignMatchesToCourts.
                if (!bracketShellExists && !autoKnock32DoneRef.current && anyGroupCompleted) {
                    autoKnock32DoneRef.current = true;
                    setTimeout(async () => {
                        const fd = latestDataRef.current;
                        if (!fd || fd.matches.some(m => m.group_id === '본선 32강')) return;
                        const shell = initBracket32Shell();
                        await uploadData({ ...fd, matches: [...fd.matches, ...shell] });
                        console.log('✅ 32강 브라켓 틀 생성 완료 (첫 번째 조 완료 시)');
                    }, 800);
                }

                // Step 2: Fill slots for completed groups + all-done wildcard fill
                if (bracketShellExists) {
                    if (bracketFillDebounceRef.current) clearTimeout(bracketFillDebounceRef.current);
                    bracketFillDebounceRef.current = setTimeout(async () => {
                        const fd = latestDataRef.current;
                        if (!fd || !fd.matches || !fd.teams) return;

                        const standings = calculateStandings(fd.teams, fd.matches);

                        // Build wildcard map only when ALL groups are done
                        const allGroupsDone = fd.matches.filter(isGroupMatch).every(m => m.status === 'COMPLETED');
                        let wildcardMap = {};
                        if (allGroupsDone) {
                            const top32 = getTop32Teams(standings);
                            const wildcards = top32.filter(t => t.groupRank === 3);
                            // Assign wildcards to their W-slots using existing backtrack logic (reuse generateBracket32 result)
                            const tempBracket = generateBracket32(top32);
                            tempBracket.filter(m => m.group_id === '본선 32강').forEach((m, idx) => {
                                if (m.team_a_id !== 'TBD' || m.team_b_id !== 'TBD') {
                                    wildcardMap[idx] = { a: m.team_a_id, b: m.team_b_id };
                                }
                            });
                        }

                        // Fill slots progressively
                        let updatedMatches = JSON.parse(JSON.stringify(fd.matches));
                        const getGroupNum = (g) => parseInt(String(g).replace(/[^0-9]/g, ''), 10);

                        // Build a set of group numbers where rankings are confirmed for 1위/2위.
                        // Two cases are accepted:
                        //  (A) All matches in the group are COMPLETED (full confirmation)
                        //  (B) 1위 and 2위 are mathematically locked in even before all matches finish
                        const matchesByGroup = {};
                        fd.matches.filter(isGroupMatch).forEach(m => {
                            const key = getGroupNum(m.group_id);
                            if (!matchesByGroup[key]) matchesByGroup[key] = [];
                            matchesByGroup[key].push(m);
                        });

                        const rankMap = {};
                        Object.entries(matchesByGroup).forEach(([gNumStr, gMatches]) => {
                            const gNum = parseInt(gNumStr, 10);
                            const allDone = gMatches.every(m => m.status === 'COMPLETED');

                            if (allDone) {
                                // Full group done: use standings
                                const gStandings = standings[`${gNum}조`] || standings[gNum] || [];

                                // ── Tie check: if any top-2-affecting tie is unresolved, skip this group ──
                                // A tie is unresolved if two teams share pts+wins+goalDiff and NEITHER has tiebreakAge
                                const hasUnresolvedTie = gStandings.some((t, i) =>
                                    gStandings.some((u, j) =>
                                        i !== j &&
                                        t.pts === u.pts &&
                                        t.wins === u.wins &&
                                        t.goalDiff === u.goalDiff &&
                                        !t.tiebreakAge && !u.tiebreakAge &&
                                        // Only block if the tie involves at least one team in top 2
                                        (i < 2 || j < 2)
                                    )
                                );

                                if (hasUnresolvedTie) {
                                    // Leave 32강 slots as TBD until admin confirms tiebreaker
                                    console.log(`🔴 ${gNum}조: 동점 미확정 → 32강 슬롯 보류`);
                                    return;
                                }

                                rankMap[gNum] = {};
                                gStandings.forEach((t, i) => { rankMap[gNum][i + 1] = t.id; });
                            } else {
                                // Group matches are still in progress.
                                // Enforce: Do not populate any 32강 slots for this group until ALL matches are COMPLETED.
                                // This avoids the confusion of placing the current 1st-place team into a predicted 2nd-place slot.
                            }
                        });

                        let changed = false;
                        updatedMatches = updatedMatches.map((match, _) => {
                            if (match.group_id !== '본선 32강') return match;
                            const idx = parseInt(match.id.replace('ko32_m', '')) - 1;
                            if (isNaN(idx) || idx < 0 || idx > 15) return match;
                            const def = FIXED_BRACKET_LAYOUT[idx];
                            if (!def) return match;

                            let m = { ...match };

                            // Sync slots for PENDING matches (keeps them in line with standings)
                            if (m.status === 'PENDING') {
                                // Side A
                                if (def.a.g === 'W') {
                                    if (allGroupsDone && wildcardMap[idx]?.a && m.team_a_id !== wildcardMap[idx].a) {
                                        m.team_a_id = wildcardMap[idx].a; changed = true;
                                    }
                                } else {
                                    const tid = rankMap[def.a.g]?.[def.a.rank];
                                    if (tid && m.team_a_id !== tid) {
                                        m.team_a_id = tid; changed = true;
                                    }
                                }

                                // Side B
                                if (def.b.g === 'W') {
                                    if (allGroupsDone && wildcardMap[idx]?.b && m.team_b_id !== wildcardMap[idx].b) {
                                        m.team_b_id = wildcardMap[idx].b; changed = true;
                                    }
                                } else {
                                    const tid = rankMap[def.b.g]?.[def.b.rank];
                                    if (tid && m.team_b_id !== tid) {
                                        m.team_b_id = tid; changed = true;
                                    }
                                }
                            }
                            return m;
                        });

                        if (changed) {
                            const { matches: assigned, courts: assignedCourts } = assignMatchesToCourts(updatedMatches, fd.courts);
                            await uploadData({ ...fd, matches: assigned, courts: assignedCourts });
                            console.log('✅ 32강 슬롯 업데이트 완료');
                        }
                    }, 1200);
                }
            }

            prevMatchesRef.current = newData.matches || [];
        }
    }, [data]);

    const triggerAlarm = (info) => {
        setNotifications(prev => {
            // Check if this exact match is already in the notification queue to prevent dupes
            if (prev.some(n => n.id === info.id)) return prev;
            return [...prev, info];
        });

        playAudio(info);

        // Native browser/phone notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const n = new Notification('🎾 코트 배정 알림', {
                body: `[${info.group}] ${info.teamA} VS ${info.teamB}\n→ ${info.court}번 코트로 출전해주세요!`,
                icon: '/tennis-icon.png',
                vibrate: [300, 100, 300],
                requireInteraction: true
            });
            n.onclick = () => { n.close(); window.focus(); };
        }
    };

    const playAudio = (info) => {
        try {
            if (!alarmAudioRef.current) {
                alarmAudioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                alarmAudioRef.current.loop = true; // Loop continuously
            }

            // Only call play if it's paused to avoid "The play() request was interrupted" errors
            if (alarmAudioRef.current.paused) {
                alarmAudioRef.current.play().catch(e => {
                    console.error('Audio play failed, maybe user interaction needed', e);
                    // Fallback to speech if audio file is blocked
                    if ('speechSynthesis' in window && info) {
                        const stageLabel = info.group || '';
                        const msg = new SpeechSynthesisUtterance(
                            `${stageLabel} ${info.teamA} 대 ${info.teamB}, ${info.court}번 코트로 출전해주세요.`
                        );
                        msg.lang = 'ko-KR';
                        window.speechSynthesis.speak(msg);
                    }
                });
            }
        } catch (e) {
            console.error('Audio setup failed', e);
        }
    };

    const dismissNotification = (idToDismiss) => {
        setNotifications(prev => {
            const updated = prev.filter(n => n.id !== idToDismiss);
            // If no more notifications, stop the looping alarm
            if (updated.length === 0 && alarmAudioRef.current) {
                alarmAudioRef.current.pause();
                alarmAudioRef.current.currentTime = 0;
            }
            return updated;
        });
    };

    const handleUpload = async () => {
        alert('업로드 기능이 비활성화되었습니다. (initialData 제거됨)');
    };

    return (
        <>
            {showSplash && (
                <SplashScreen onEnter={() => {
                    sessionStorage.setItem('splashDone', '1');
                    setShowSplash(false);
                }} />
            )}
            <Layout
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isAdmin={isAdmin}
                onToggleAdmin={() => {
                    if (isAdmin) {
                        setIsAdmin(false);
                        setActiveTab('match');
                    } else {
                        setActiveTab('admin');
                    }
                }}
            >
                {/* Global Notification Overlay - Supports Multiple Stacked Notifications */}
                {notifications.length > 0 && (
                    <div className="global-notification">
                        <div className="notification-stack">
                            {notifications.map((notif, idx) => (
                                <div key={notif.id} className="notification-content pulse-animation">
                                    <h2>📢 다음 경기 배정 알림 {notifications.length > 1 ? `(${idx + 1}/${notifications.length})` : ''}</h2>
                                    <p className="notification-teams">[{notif.group}] {notif.teamA} VS {notif.teamB}</p>
                                    <p className="notification-court">👉 <span>{notif.court}번 코트</span>로 출전 바랍니다!</p>
                                    <button onClick={() => dismissNotification(notif.id)} className="modern-button primary full-width mt-10">확인 (알람 종료)</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Operator Mode - Always visible */}
                {/* Operator Mode - Moved to AdminDashboard */}
                {/* 🔔 알람 활성화 버튼: mobile browsers block audio without user interaction */}
                {!audioUnlocked && !isAdmin && (
                    <div style={{
                        position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
                        zIndex: 9999, textAlign: 'center'
                    }}>
                        <button
                            onClick={() => {
                                try {
                                    if (!alarmAudioRef.current) {
                                        alarmAudioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                                        alarmAudioRef.current.loop = true;
                                    }
                                    alarmAudioRef.current.volume = 0.01;
                                    alarmAudioRef.current.play().then(() => {
                                        alarmAudioRef.current.pause();
                                        alarmAudioRef.current.currentTime = 0;
                                        alarmAudioRef.current.volume = 1.0;
                                        setAudioUnlocked(true);
                                    }).catch(() => setAudioUnlocked(true));
                                } catch (e) { setAudioUnlocked(true); }
                                // Also request browser push notification permission
                                if ('Notification' in window && Notification.permission === 'default') {
                                    Notification.requestPermission();
                                }
                            }}
                            style={{
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #ff9800, #e65100)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(255,152,0,0.5)',
                                animation: 'pulse 2s infinite'
                            }}
                        >
                            🔔 경기 알람 켜기
                        </button>
                        <div style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '6px' }}>눌러야 경기 배정 알림을 받을 수 있어요</div>
                    </div>
                )}

                {activeTab !== 'admin' && (
                    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
                        <button
                            onClick={() => setActiveTab('admin')}
                            style={{
                                padding: '10px 15px',
                                background: '#444',
                                color: 'white',
                                border: '1px solid #666',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                opacity: 0.9,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                            }}
                        >
                            🔐 운영자 로그인
                        </button>
                        {/* DB Reset Removed - Access inside Admin Dashboard */}
                    </div>
                )}

                <div style={{ display: activeTab === 'admin' ? 'block' : 'none' }}>
                    <AdminDashboard
                        ref={adminRef}
                        data={data}
                        isAdmin={isAdmin}
                        onLogin={(val) => setIsAdmin(val)}
                        numCourts={numCourts}
                        setNumCourts={setNumCourts}
                    />
                </div>

                <div style={{ display: (activeTab === 'match' || activeTab === 'live') ? 'block' : 'none' }}>
                    <Bracket matches={data.matches} teams={data.teams} courts={data.courts} isAdmin={false} numCourts={numCourts} activeTab={activeTab} />
                </div>

                <div style={{ display: activeTab === 'standings' ? 'block' : 'none' }}>
                    <Standings
                        teams={previewTeams || data.teams}
                        groups={previewGroups || data.groups}
                        matches={data.matches} // matches remain same during preview
                        isAdmin={isAdmin}
                        onAdminAction={(action) => {
                            if (action === 'lottery') {
                                if (adminRef.current && adminRef.current.triggerLotteryAnimation) {
                                    adminRef.current.triggerLotteryAnimation(
                                        (teams, groups) => {
                                            setPreviewTeams(teams);
                                            setPreviewGroups(groups);
                                        },
                                        () => {
                                            setPreviewTeams(null);
                                            setPreviewGroups(null);
                                        }
                                    );
                                } else {
                                    alert("관리자 대시보드 탭에 한번 접속해야 활성화됩니다.");
                                }
                            }
                        }}
                        onConfirmTiebreaker={async (tiebreakAges) => {
                            const updatedTeams = data.teams.map(t =>
                                tiebreakAges[t.id] !== undefined
                                    ? { ...t, tiebreakAge: Number(tiebreakAges[t.id]) }
                                    : t
                            );
                            await uploadData({ ...data, teams: updatedTeams });
                        }}
                    />
                </div>

                <style>{`
                .global-notification {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.85);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                    overflow-y: auto;
                    padding: 2rem;
                }
                .notification-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    width: 100%;
                    max-width: 500px;
                }
                .notification-content {
                    background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%);
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 2px solid var(--tennis-yellow);
                    text-align: center;
                    box-shadow: 0 0 50px rgba(213, 255, 0, 0.4);
                    width: 100%;
                }
                .mt-10 { margin-top: 20px; }
                .notification-content h2 {
                    color: white;
                    font-size: 2rem;
                    margin-bottom: 20px;
                }
                .notification-teams {
                    font-size: 1.5rem;
                    color: #ddd;
                    margin-bottom: 15px;
                }
                .notification-court {
                    font-size: 2.2rem;
                    color: white;
                    margin-bottom: 30px;
                }
                .notification-court span {
                    color: var(--tennis-yellow);
                    font-weight: 900;
                    text-decoration: underline;
                }
                .pulse-animation {
                    animation: pulse-ring 2s infinite;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(213, 255, 0, 0.5); }
                    50% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(213, 255, 0, 0); }
                    100% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(213, 255, 0, 0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
                {/* ---- DEBUG OVERLAY ---- */}
                <div style={{
                    position: 'fixed', bottom: '10px', left: '10px', zIndex: 10000,
                    background: 'rgba(0,0,0,0.8)', color: '#0f0', padding: '10px',
                    borderRadius: '5px', fontSize: '11px', fontFamily: 'monospace',
                    pointerEvents: 'none', border: '1px solid #0f0'
                }}>
                    <div>Data: {data.matches.length} matches, {data.courts.length} courts</div>
                    <div>Empty: {data.courts.some(c => c.match_id === null || !data.matches.find(m => m.id === c.match_id && m.status === 'LIVE')) ? 'YES' : 'NO'}</div>
                    <div>Pending: {data.matches.some(m => m.status === 'PENDING' && !m.court_id) ? 'YES' : 'NO'}</div>
                    <div>Wait, if YES YES... why no assign?</div>
                </div>
                {/* ---- DEBUG OVERLAY ---- */}
                <div style={{
                    position: 'fixed', bottom: '10px', left: '10px', zIndex: 10000,
                    background: 'rgba(0,0,0,0.85)', color: '#0f0', padding: '12px',
                    borderRadius: '5px', fontSize: '12px', fontFamily: 'monospace',
                    pointerEvents: 'none', border: '2px solid #0f0', whiteSpace: 'pre-wrap'
                }}>
                    <div>Data: {data.matches.length} matches, {data.courts.length} courts</div>
                    <div>Admin: {isAdmin ? 'YES' : 'NO'}</div>
                    <div>Empty: {data.courts.some(c => c.match_id === null || !data.matches.find(m => m.id === c.match_id && m.status === 'LIVE')) ? 'YES' : 'NO'}</div>
                    <div>Pending: {data.matches.some(m => m.status === 'PENDING' && !m.court_id) ? 'YES' : 'NO'}</div>
                    <div style={{color: '#ff0', marginTop: '5px'}}>Status: {debugMsg}</div>
                    <div style={{marginTop: '5px'}}>
                        {(() => {
                            if (!isAdmin) return "Admin required for auto-assign.";
                            const testAssign = assignMatchesToCourts([...data.matches], [...data.courts]);
                            const diff = testAssign.courts.filter(c => c.match_id !== data.courts.find(oc => oc.id === c.id)?.match_id);
                            return `Alg would change ${diff.length} courts locally right now`;
                        })()}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default App;
