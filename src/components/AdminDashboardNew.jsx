import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { generateGroups, generateSchedule, assignMatchesToCourts, calculateStandings, getTop32Teams, generateBracket32, updateTournamentProgression } from '../utils/tournamentLogic';
import { uploadData, updateMatch, updateCourt, resetTournamentData, updateSettings } from '../services/firebase';
import { QRCodeSVG } from 'qrcode.react';
import * as XLSX from 'xlsx';
import MatchCard from './MatchCard';

const AdminDashboardNew = forwardRef(({ data, onUpdateData, isAdmin, onLogin, numCourts, setNumCourts }, ref) => {
    // Local State
    const [numTeams, setNumTeams] = useState(() => {
        const stored = localStorage.getItem('adminNumTeams');
        return stored ? Number(stored) : 48;
    }); // Default 48 Teams
    const [numGroups, setNumGroups] = useState(() => {
        const stored = localStorage.getItem('adminNumGroups');
        return stored ? Number(stored) : 8;
    }); // Default 8 Groups
    const [password, setPassword] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const drawOrderRef = useRef(0);
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('adminActiveTab') || 'settings';
    });
    const [activeManageTab, setActiveManageTab] = useState(() => {
        return localStorage.getItem('adminActiveManageTab') || '전체';
    });

    useImperativeHandle(ref, () => ({
        handleSmartAssign,
        handleGenerate,
        triggerLotteryAnimation
    }));

    // Grid State: numTeams Rows
    const [gridData, setGridData] = useState(() => {
        try {
            const stored = localStorage.getItem('adminGridData');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.error("Failed to parse stored grid data", e);
        }
        return Array.from({ length: 48 }, (_, i) => ({
            id: i, group: '', club: '', p1_name: '', p1_gender: '', p2_name: '', p2_gender: ''
        }));
    });

    // Persist configurations
    useEffect(() => {
        localStorage.setItem('adminNumTeams', numTeams);
    }, [numTeams]);

    useEffect(() => {
        localStorage.setItem('adminNumGroups', numGroups);
    }, [numGroups]);

    useEffect(() => {
        localStorage.setItem('adminGridData', JSON.stringify(gridData));
    }, [gridData]);

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem('adminActiveManageTab', activeManageTab);
    }, [activeManageTab]);

    // Update grid when numTeams changes
    useEffect(() => {
        setGridData(prev => {
            if (prev.length === numTeams) return prev;
            if (prev.length < numTeams) {
                // Add rows
                const added = Array.from({ length: numTeams - prev.length }, (_, i) => ({
                    id: prev.length + i,
                    group: '',
                    club: '',
                    p1_name: '', p1_gender: '', p2_name: '', p2_gender: ''
                }));
                return [...prev, ...added];
            } else {
                // Remove rows (slice)
                return prev.slice(0, numTeams);
            }
        });
    }, [numTeams]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin') {
            onLogin(true);
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    // --- Excel Handlers ---
    const handleExcelDownload = () => {
        const exportData = gridData.map((r, i) => ({
            ' ': i + 1, // Empty header for index
            '참가자A': r.p1_name,
            '참가자B': r.p2_name,
            '클럽': r.club
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "참가자명단");
        XLSX.writeFile(wb, "tennis_teams_template.xlsx");
    };

    const handleDownloadFullBracketExcel = () => {
        if (!data || !data.teams || !data.matches) {
            alert("대회 데이터가 없습니다.");
            return;
        }

        const wb = XLSX.utils.book_new();

        // 1. 조 편성표
        const groupData = gridData.filter(r => r.p1_name || r.club).map(r => ({
            '조': r.group,
            '참가자A': r.p1_name,
            '참가자B': r.p2_name,
            '클럽': r.club
        })).sort((a, b) => {
            const numA = parseInt(a['조']) || 0;
            const numB = parseInt(b['조']) || 0;
            return numA - numB;
        });

        if (groupData.length > 0) {
            const wsGroups = XLSX.utils.json_to_sheet(groupData);
            XLSX.utils.book_append_sheet(wb, wsGroups, "조 편성표");
        }

        // 2. 대진표 결과
        const getTeamName = (id) => {
            if (!id) return '';
            if (id === 'BYE') return '부전승 (BYE)';
            const t = data.teams.find(t => t.id === id);
            return t ? t.name : id;
        };

        const exportMatches = data.matches.map(m => {
            const isGroup = typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes('조'));
            return {
                '구분': isGroup ? '예선 조별리그' : m.group_id,
                '매치번호': m.id,
                '팀A': getTeamName(m.team_a_id),
                '팀B': getTeamName(m.team_b_id),
                '점수A': m.score_a ?? '-',
                '점수B': m.score_b ?? '-',
                '승리팀': getTeamName(m.winner_id),
                '상태': m.status === 'COMPLETED' ? '완료' : m.status === 'LIVE' ? '진행중' : '대기'
            };
        }).sort((a, b) => {
            return a['매치번호'].localeCompare(b['매치번호'], undefined, {numeric: true});
        });

        const groupMatches = exportMatches.filter(m => m['구분'] === '예선 조별리그');
        const knockoutMatches = exportMatches.filter(m => m['구분'] !== '예선 조별리그' && m['구분'] !== 'settings');

        if (groupMatches.length > 0) {
            const wsGroupMatches = XLSX.utils.json_to_sheet(groupMatches);
            XLSX.utils.book_append_sheet(wb, wsGroupMatches, "예선 경기");
        }

        if (knockoutMatches.length > 0) {
            const wsKnockout = XLSX.utils.json_to_sheet(knockoutMatches);
            XLSX.utils.book_append_sheet(wb, wsKnockout, "본선 대진표");
        }
        
        XLSX.writeFile(wb, "테니스대회_전체대진표.xlsx");
    };

    const handleExcelUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Array of arrays

            // Assuming header on row 0: ' ', '참가자A', '참가자B', '클럽'
            const newGrid = Array.from({ length: numTeams }, (_, i) => ({
                id: i,
                group: '',
                club: '',
                p1_name: '',
                p1_gender: '',
                p2_name: '',
                p2_gender: ''
            }));

            // Start from row 1 (index 1) if header exists.
            for (let i = 1; i < data.length; i++) {
                if (i - 1 >= numTeams) break; // Ensure we don't exceed numTeams
                const row = data[i];
                if (!row || row.length === 0) continue;

                newGrid[i - 1] = {
                    ...newGrid[i - 1],
                    p1_name: row[1] || '',
                    p2_name: row[2] || '',
                    club: row[3] || '',
                    group: ''
                };
            }
            setGridData(newGrid);
            alert("엑셀 데이터가 로드되었습니다.");
        };
        reader.readAsBinaryString(file);
    };

    const handleGridChange = (idx, field, value) => {
        const newGrid = [...gridData];
        newGrid[idx][field] = value;
        setGridData(newGrid);
    };

    // --- Generation Logic ---
    const handleGenerate = async (skipConfirm = false) => {
        // Filter valid teams (must have names) and forcefully exclude any "불참" teams so they never enter the logic
        const validRows = gridData.filter(r => 
            r.p1_name && r.p2_name && 
            !r.p1_name.includes("불참") && 
            !r.p2_name.includes("불참") && 
            !(r.club && r.club.includes("불참"))
        );

        if (!skipConfirm && validRows.length === 0) {
            alert("참가자 명단을 입력해주세요. (최소한 이름1, 이름2는 필수입니다)");
            return;
        }

        setIsProcessing(true);
        setStatusMsg("데이터 처리 중...");

        try {
            const teams = validRows.map((r, idx) => ({
                id: `t${idx + 1}`,
                name: `${r.p1_name}/${r.p2_name}`,
                player1: r.p1_name,
                player2: r.p2_name,
                club: r.club,
                p1_gender: r.p1_gender,
                p2_gender: r.p2_gender,
                drawOrder: r.drawOrder ?? 9999,
                initial_group: r.group // Use manual group
            }));

            if (!skipConfirm && teams.length < numGroups) {
                if (!confirm(`팀 수(${teams.length})가 조 개수(${numGroups})보다 적습니다. 계속 진행할까요?`)) {
                    setIsProcessing(false);
                    return;
                }
            }

            // Generate Logic
            const sortedTeams = [...teams].sort((a, b) => (a.drawOrder ?? 9999) - (b.drawOrder ?? 9999));
            const groups = generateGroups(sortedTeams, numGroups);
            const matches = generateSchedule(groups);

            const courts = Array.from({ length: numCourts }, (_, i) => ({
                id: i + 1,
                match_id: null
            }));

            const { matches: assignedMatches, courts: assignedCourts } = assignMatchesToCourts(matches, courts);
            const newData = { teams, groups, matches: assignedMatches, courts: assignedCourts };

            setStatusMsg(`🧹 1단계: 이전 데이터 정리 중...`);
            await resetTournamentData(); 
            
            setStatusMsg(`📤 2단계: 새 대진표 업로드 중 (${newData.matches.length}경기)...`);
            await uploadData(newData);

            setStatusMsg("✅ 성공! 대진표가 인터넷에 실시간 반영되었습니다.");
            setTimeout(() => setStatusMsg(""), 5000);
        } catch (e) {
            console.error("발생한 구체적 에러:", e);
            setStatusMsg(`❌ 오류 발생: ${e.message}`);
            alert(`대진표 생성 중 문제가 발생했습니다:\n${e.message}\n\n도움말: 확인 버튼을 누르고 다시 한 번 시도해보세요.`);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleGenerateKnockout32 = async () => {
        if (!data || !data.teams || !data.matches) {
            alert("먼저 예선전을 생성하고 진행해주세요.");
            return;
        }

        setIsProcessing(true);
        setStatusMsg("32강 본선 대진 자동 추첨 중...");

        try {
            // 1. Calculate final standings from all current matches
            const standings = calculateStandings(data.teams, data.matches);

            // 2. Select Top 32
            const top32 = getTop32Teams(standings);

            if (top32.length < 2) {
                alert("본선에 진출할 팀이 충분하지 않습니다.");
                setIsProcessing(false);
                return;
            }

            // 3. Generate Bracket
            const knockoutMatches = generateBracket32(top32);

            // 4. Update team state with their assigned Knockout Ranks
            const updatedTeams = data.teams.map(t => {
                const statInfo = top32.find(s => s.id === t.id);
                if (statInfo) {
                    return {
                        ...t,
                        groupRank: statInfo.groupRank,
                        initial_group: statInfo.group_id || t.group
                    };
                }
                return t;
            });

            // CLEAR existing knockout matches to prevent duplicate ID overwrites and replace the whole tree
            const knockoutGroups = ["본선 32강", "16강", "8강", "4강", "결승", "본선 16강 (무작위)"];
            const remainingMatches = data.matches.filter(m => !knockoutGroups.includes(m.group_id));

            // FREE courts that were improperly pointing to any of the deleted knockout matches
            const oldKnockoutIds = data.matches.filter(m => knockoutGroups.includes(m.group_id)).map(m => m.id);
            const freedCourts = data.courts.map(c => {
                if (oldKnockoutIds.includes(c.match_id)) {
                    return { ...c, match_id: null };
                }
                return c;
            });

            // 5. Append to existing matches, then auto-assign to courts
            const allMatches = [...remainingMatches, ...knockoutMatches];
            const { matches: assignedMatches, courts: assignedCourts } = assignMatchesToCourts(allMatches, freedCourts);

            const newData = {
                ...data,
                teams: updatedTeams,
                matches: assignedMatches,
                courts: assignedCourts
            };

            await uploadData(newData);
            setStatusMsg("✅ 32강 본선 대진표 생성 + 코트 배정 완료!");
            setTimeout(() => setStatusMsg(""), 3000);

        } catch (e) {
            console.error(e);
            setStatusMsg("❌ 오류: " + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleGenerateKnockout16Random = async () => {
        if (!data || !data.matches) return;

        // Find teams that won in round 32
        const round32Matches = data.matches.filter(m => m.group_id === "본선 32강" && m.status === "COMPLETED");
        if (round32Matches.length < 8) {
            alert("32강 경기가 충분히 완료되지 않았습니다.");
            return;
        }

        const winningTeamIds = round32Matches.map(m => m.winner_id).filter(id => id && id !== "BYE");
        const advancingTeams = data.teams.filter(t => winningTeamIds.includes(t.id));

        setIsProcessing(true);
        setStatusMsg("16강 무작위 대진 추첨 중...");

        try {
            const matches16 = generateBracket16Random(advancingTeams);
            const allMatches16 = [...data.matches, ...matches16];
            const { matches: assigned16, courts: courts16 } = assignMatchesToCourts(allMatches16, data.courts);
            const newData = {
                ...data,
                matches: assigned16,
                courts: courts16
            };
            await uploadData(newData);
            setStatusMsg("✅ 16강 무작위 대진표 생성 + 코트 배정 완료!");
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (e) {
            console.error(e);
            setStatusMsg("❌ 오류: " + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleGenerateSequentialKnockout = async (prevRoundName, nextRoundName, nextMatchPrefix, nextRoundIndex) => {
        if (!data || !data.matches) return;
        const prevMatches = data.matches.filter(m => m.group_id === prevRoundName).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
        if (prevMatches.length === 0) {
            alert(`${prevRoundName} 경기가 존재하지 않습니다.`);
            return;
        }

        setIsProcessing(true);
        setStatusMsg(`${nextRoundName} 대진표 생성 중...`);
        try {
            const nextMatches = generateNextRound(prevMatches, nextRoundName, nextMatchPrefix, nextRoundIndex);
            const allMatchesNext = [...data.matches, ...nextMatches];
            const { matches: assignedNext, courts: courtsNext } = assignMatchesToCourts(allMatchesNext, data.courts);
            await uploadData({ ...data, matches: assignedNext, courts: courtsNext });
            setStatusMsg(`✅ ${nextRoundName} 대진표 생성 + 코트 배정 완료!`);
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (e) {
            console.error(e);
            setStatusMsg("❌ 오류: " + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const fillMockData = () => {
        const mock = Array.from({ length: 48 }, (_, i) => ({
            id: i,
            group: '',
            club: `Club ${i % 5}`, // Mix of 5 clubs to test distribution
            p1_name: `User ${i}A`,
            p1_gender: 'M',
            p2_name: `User ${i}B`,
            p2_gender: 'F'
        }));
        setGridData(mock);
        setNumTeams(48);
        setNumGroups(12); // Test with 12 groups of 4 as per typical 48 team setup
    };

    const handleFastForwardGroups = async () => {
        if (!data || !data.matches) return;
        setIsProcessing(true);
        setStatusMsg("예선전 결과를 무작위로 시뮬레이션 중...");

        try {
            // Find the last match for each group
            const groupLastMatches = {};
            data.matches.forEach(m => {
                const isGroupStage = typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes("조"));
                if (isGroupStage) {
                    groupLastMatches[m.group_id] = m.id;
                }
            });

            const nextMatches = data.matches.map(m => {
                const isGroupStage = typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes("조"));
                const isLastMatch = groupLastMatches[m.group_id] === m.id;

                if (isGroupStage && !isLastMatch && m.status !== "COMPLETED") {
                    // Random win/loss avoiding ties
                    const scoreA = Math.floor(Math.random() * 7);
                    const scoreB = Math.floor(Math.random() * 7);
                    const finalB = scoreA === scoreB ? scoreB + 1 : scoreB;
                    return {
                        ...m,
                        score_a: scoreA,
                        score_b: finalB,
                        status: "COMPLETED",
                        winner_id: scoreA > finalB ? m.team_a_id : m.team_b_id,
                        court_id: null
                    };
                }
                return m;
            });

            // Free all courts
            const nextCourts = data.courts.map(c => ({ ...c, match_id: null }));

            await uploadData({ ...data, matches: nextMatches, courts: nextCourts });
            setStatusMsg("✅ 각 조 마지막 경기 제외 예선전 무작위 종료 완료!");
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (e) {
            console.error(e);
            setStatusMsg("❌ 오류: " + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- Smart Assign Logic ---
    const handleSmartAssign = () => {
        if (numGroups <= 0 || numTeams % numGroups !== 0) {
            alert(`${numTeams}팀을 균등하게 나눌 수 있는 조 개수를 입력해주세요.`);
            return;
        }

        if (!confirm(`${numGroups}개 조로 '스마트 배정' 하시겠습니까?\n(클럽 중복 최소화 무작위 배정)`)) {
            return;
        }

        // 1. Get valid teams from grid
        const validTeams = gridData.map((row, idx) => ({ ...row, originalIdx: idx })).filter(r => r.p1_name || r.club);

        // 2. Randomize teams for fair distribution (since we removed score seeding)
        validTeams.sort(() => Math.random() - 0.5);

        // 3. Prepare Buckets
        const groups = Array.from({ length: numGroups }, () => []);

        // 4. Distribute (Backtracking for strict club constraints)
        const teamsPerGroup = numTeams / numGroups;

        // Group by club to check if mathematically impossible
        const clubCounts = {};
        validTeams.forEach(t => {
            const c = t.club ? t.club.trim() : "";
            if (c) {
                clubCounts[c] = (clubCounts[c] || 0) + 1;
            }
        });

        // Validate possibility
        const maxSingleClub = Object.values(clubCounts).reduce((m, v) => Math.max(m, v), 0);
        const strictMode = maxSingleClub <= numGroups;

        if (!strictMode) {
            alert(`⚠️ 주의: 특정 클럽의 인원(${maxSingleClub}명)이 전체 조 개수(${numGroups}개)보다 많아 완벽한 분산이 불가능하여 일부 중복이 발생합니다.`);
        }

        // Sort validTeams to place largest clubs first (optimizes backtracking)
        validTeams.sort((a, b) => {
            const countA = a.club ? clubCounts[a.club.trim()] || 0 : 0;
            const countB = b.club ? clubCounts[b.club.trim()] || 0 : 0;
            return countB - countA; // Descending
        });

        let foundSolution = false;

        if (strictMode) {
            // DFS Backtracking function
            const solve = (teamIndex) => {
                if (teamIndex === validTeams.length) return true; // All assigned

                const team = validTeams[teamIndex];
                const club = team.club ? team.club.trim() : "";

                // Try placing in each group
                // Shuffle group order to ensure randomness on multiple clicks
                const groupIndices = Array.from({ length: numGroups }, (_, i) => i).sort(() => Math.random() - 0.5);

                for (const gIdx of groupIndices) {
                    const g = groups[gIdx];
                    if (g.length >= teamsPerGroup) continue; // Full

                    if (club) {
                        const hasConflict = g.some(m => m.club && m.club.trim() === club);
                        if (hasConflict) continue;
                    }

                    // Place team
                    g.push(team);
                    if (solve(teamIndex + 1)) return true;
                    // Backtrack
                    g.pop();
                }
                return false;
            };

            foundSolution = solve(0);
        }

        // Fallback or non-strict mode greedy assignment
        if (!foundSolution) {
            // Clear groups
            for (let i = 0; i < numGroups; i++) groups[i] = [];
            // Shuffle teams again for greedy
            validTeams.sort(() => Math.random() - 0.5);

            validTeams.forEach((team) => {
                let candidateGroups = groups.map((g, idx) => ({ id: idx, members: g, count: g.length }))
                    .filter(g => g.count < teamsPerGroup);

                const club = team.club ? team.club.trim() : "";
                let bestGroups = candidateGroups;

                if (club) {
                    const noConflictGroups = candidateGroups.filter(g => !g.members.some(m => m.club && m.club.trim() === club));
                    if (noConflictGroups.length > 0) bestGroups = noConflictGroups;
                }

                bestGroups.sort((a, b) => a.count - b.count);
                if (bestGroups.length > 0) groups[bestGroups[0].id].push(team);
            });
        }

        // 4.5. Randomize positions WITHIN each group (so club teams aren't always 1st or 2nd)
        groups.forEach(g => g.sort(() => Math.random() - 0.5));

        // 5. Update Grid
        const newGrid = [...gridData];
        groups.forEach((g, gIdx) => {
            g.forEach(team => {
                newGrid[team.originalIdx] = {
                    ...newGrid[team.originalIdx],
                    group: `${gIdx + 1}조`
                };
            });
        });

        setGridData(newGrid);
        alert("✅ 조 구성 완료! (무작위 셔플 + 클럽 분산)");
    };

    const triggerLotteryAnimation = (onFrame, onComplete) => {
        if (numGroups <= 0 || numTeams % numGroups !== 0) {
            alert(`${numTeams}팀을 균등하게 나눌 수 있는 조 개수를 입력해주세요.`);
            return;
        }
        if (!confirm(`조 추첨 룰렛을 시작하시겠습니까?\n(약 3초 후 자동으로 대진표가 생성됩니다)`)) {
            return;
        }

        setIsProcessing(true);
        setStatusMsg("조 추첨 룰렛 진행 중...");

        let count = 0;
        const maxFrames = 20; // 20 frames * 150ms = 3 seconds
        let currentGrid = [...gridData];

        const interval = setInterval(() => {
            const validIdx = currentGrid.map((r, i) => i).filter(i => currentGrid[i].p1_name || currentGrid[i].club);
            const validTeams = validIdx.map(i => ({ ...currentGrid[i], originalIdx: i }));

            const tempGroups = Array.from({ length: numGroups }, () => []);
            const teamsPerGroup = numTeams / numGroups;

            // For intermediate animation frames, use fast greedy
            if (count < maxFrames - 1) {
                validTeams.sort(() => Math.random() - 0.5);
                validTeams.forEach((team) => {
                    let candidateGroups = tempGroups.map((g, idx) => ({ id: idx, members: g, count: g.length }))
                        .filter(g => g.count < teamsPerGroup);
                    const club = team.club ? team.club.trim() : "";
                    let bestGroups = candidateGroups;

                    if (club) {
                        const noConflict = candidateGroups.filter(g => !g.members.some(m => m.club && m.club.trim() === club));
                        if (noConflict.length > 0) bestGroups = noConflict;
                    }

                    bestGroups.sort((a, b) => a.count - b.count);
                    if (bestGroups.length > 0) tempGroups[bestGroups[0].id].push(team);
                });
            } else {
                // For the very last frame, use STRICT backtracking algorithm
                const clubCounts = {};
                validTeams.forEach(t => {
                    const c = t.club ? t.club.trim() : "";
                    if (c) clubCounts[c] = (clubCounts[c] || 0) + 1;
                });

                validTeams.sort((a, b) => {
                    const countA = a.club ? clubCounts[a.club.trim()] || 0 : 0;
                    const countB = b.club ? clubCounts[b.club.trim()] || 0 : 0;
                    return countB - countA;
                });

                const maxSingleClub = Object.values(clubCounts).reduce((m, v) => Math.max(m, v), 0);
                const strictMode = maxSingleClub <= numGroups;
                let foundSolution = false;

                if (strictMode) {
                    const solve = (teamIndex) => {
                        if (teamIndex === validTeams.length) return true;
                        const team = validTeams[teamIndex];
                        const club = team.club ? team.club.trim() : "";
                        const groupIndices = Array.from({ length: numGroups }, (_, i) => i).sort(() => Math.random() - 0.5);

                        for (const gIdx of groupIndices) {
                            const g = tempGroups[gIdx];
                            if (g.length >= teamsPerGroup) continue;
                            if (club && g.some(m => m.club && m.club.trim() === club)) continue;

                            g.push(team);
                            if (solve(teamIndex + 1)) return true;
                            g.pop();
                        }
                        return false;
                    };
                    foundSolution = solve(0);
                }

                // Fallback greedy
                if (!foundSolution) {
                    for (let i = 0; i < numGroups; i++) tempGroups[i] = [];
                    validTeams.sort(() => Math.random() - 0.5);
                    validTeams.forEach((team) => {
                        let candidateGroups = tempGroups.map((g, idx) => ({ id: idx, members: g, count: g.length }))
                            .filter(g => g.count < teamsPerGroup);
                        const club = team.club ? team.club.trim() : "";
                        let bestGroups = candidateGroups;

                        if (club) {
                            const noConflict = candidateGroups.filter(g => !g.members.some(m => m.club && m.club.trim() === club));
                            if (noConflict.length > 0) bestGroups = noConflict;
                        }

                        bestGroups.sort((a, b) => a.count - b.count);
                        if (bestGroups.length > 0) tempGroups[bestGroups[0].id].push(team);
                    });
                }
            }

            tempGroups.forEach(g => g.sort(() => Math.random() - 0.5));

            const newGrid = [...currentGrid];
            tempGroups.forEach((g, gIdx) => {
                g.forEach(team => {
                    newGrid[team.originalIdx] = { ...newGrid[team.originalIdx], group: `${gIdx + 1}조` };
                });
            });

            currentGrid = newGrid;
            setGridData(newGrid); // Update UI visually

            // ----- PREVIEW DATA FOR STANDINGS (since actual data is not uploaded yet) -----
            const validRows = newGrid.filter(r => r.p1_name && r.p2_name);
            const previewTeams = validRows.map((r, idx) => ({
                id: `t${idx + 1}`,
                name: `${r.p1_name}/${r.p2_name}`,
                club: r.club,
                initial_group: r.group
            }));
            const previewGroups = {};
            previewTeams.forEach(t => {
                if (!previewGroups[t.initial_group]) previewGroups[t.initial_group] = [];
                previewGroups[t.initial_group].push(t.id);
            });

            if (onFrame) onFrame(previewTeams, previewGroups);

            count++;
            if (count >= maxFrames) {
                clearInterval(interval);
                handleGenerate(true).then(() => {
                    if (onComplete) onComplete();
                });
            }
        }, 150);
    };

    const handleClearGroups = () => {
        if (confirm("모든 조 배정 결과를 초기화하시겠습니까?")) {
            drawOrderRef.current = 0;
            setGridData(gridData.map(r => ({ ...r, group: '', drawOrder: undefined })));
        }
    };

    const handleSeedLottery = (seedVal) => {
        // Find all currently unassigned valid teams
        const unassignedValidTeams = gridData.map((r, i) => ({ ...r, originalIdx: i }))
            .filter(r => !r.group && (r.p1_name || r.club));

        if (unassignedValidTeams.length === 0) {
            alert(`남아있는 팀이 없습니다. 모든 팀이 조에 배정되었습니다.`);
            return;
        }

        // We want to divide the total number of valid teams into 4 buckets.
        // E.g., if total valid teams is 48, each bucket gets 12.
        const totalValidTeams = gridData.filter(r => (r.p1_name || r.club)).length;
        const bucketSize = Math.ceil(totalValidTeams / 4);

        // We only draw up to bucketSize teams at a time.
        // First, randomly shuffle the remaining unassigned teams (Fisher-Yates shuffle)
        for (let i = unassignedValidTeams.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [unassignedValidTeams[i], unassignedValidTeams[j]] = [unassignedValidTeams[j], unassignedValidTeams[i]];
        }

        // Take exactly bucketSize teams for this seed's turn (or fewer if not enough left)
        let seedTeams = unassignedValidTeams.slice(0, bucketSize);

        // Group currently assigned teams
        const currentGroups = Array.from({ length: numGroups }, () => []);
        gridData.forEach((r, i) => {
            if (r.group) {
                const gNum = parseInt(r.group.replace('조', '')) - 1;
                if (gNum >= 0 && gNum < numGroups) currentGroups[gNum].push({ ...r, originalIdx: i });
            }
        });

        const newGrid = [...gridData];
        // Assign to groups, perfectly balancing group size and guaranteeing zero club conflicts (if mathematically possible)
        // by actively building valid assignments with a Randomized Greedy search (1000 retries).

        // Ensure size balance by creating exactly the slots needed to evenly distribute members
        const slots = [];
        let currentGroupSizes = currentGroups.map((g, idx) => ({ idx, count: g.length }));

        for (let i = 0; i < seedTeams.length; i++) {
            currentGroupSizes.sort((a, b) => a.count - b.count);
            currentGroupSizes[0].count++;
            slots.push(currentGroupSizes[0].idx);
        }

        let bestAssignment = null;
        let minConflicts = Infinity;
        const maxRetries = 1000;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            let currentSlots = [...slots];
            let attemptAssignment = []; // stores { origIndex, gIdx }
            let currentConflicts = 0;

            // Randomize the order we place the teams in this attempt to avoid getting stuck
            let teamsToAssign = seedTeams.map((t, i) => ({ team: t, origIndex: i }));

            for (let i = teamsToAssign.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [teamsToAssign[i], teamsToAssign[j]] = [teamsToAssign[j], teamsToAssign[i]];
            }

            for (let i = 0; i < teamsToAssign.length; i++) {
                const { team, origIndex } = teamsToAssign[i];
                const club = team.club ? team.club.trim() : "";

                let validSlots = [];
                let conflictSlots = [];

                for (let j = 0; j < currentSlots.length; j++) {
                    const gIdx = currentSlots[j];
                    let hasConflict = false;

                    if (club) {
                        // Check against existing members in this group
                        hasConflict = currentGroups[gIdx].some(m => m.club && m.club.trim() === club);

                        if (!hasConflict) {
                            // Check against successfully placed teams in this same attempt
                            for (let k = 0; k < attemptAssignment.length; k++) {
                                if (attemptAssignment[k].gIdx === gIdx) {
                                    const assignedTeam = seedTeams[attemptAssignment[k].origIndex];
                                    const otherClub = assignedTeam.club ? assignedTeam.club.trim() : "";
                                    if (otherClub === club) {
                                        hasConflict = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    if (hasConflict) {
                        conflictSlots.push(j);
                    } else {
                        validSlots.push(j);
                    }
                }

                // Prioritize picking a valid (conflict-free) slot available for this team!
                if (validSlots.length > 0) {
                    const pickIdx = validSlots[Math.floor(Math.random() * validSlots.length)];
                    attemptAssignment.push({ origIndex, gIdx: currentSlots[pickIdx] });
                    currentSlots.splice(pickIdx, 1);
                } else {
                    // Fallback: forced to pick a conflict slot
                    const pickIdx = conflictSlots[Math.floor(Math.random() * conflictSlots.length)];
                    attemptAssignment.push({ origIndex, gIdx: currentSlots[pickIdx] });
                    currentSlots.splice(pickIdx, 1);
                    currentConflicts++;
                }
            }

            // If this attempt resulted in fewer conflicts than our best so far, save it
            if (currentConflicts < minConflicts) {
                minConflicts = currentConflicts;
                attemptAssignment.sort((a, b) => a.origIndex - b.origIndex);
                bestAssignment = attemptAssignment.map(a => a.gIdx);

                if (minConflicts === 0) break; // Found perfect match, exit early!
            }
        }

        // Apply best found assignment. We need to guarantee that teams picked in earlier seeds 
        // ALWAYS have a lower drawOrder than teams picked in later seeds.
        const sortedAssignment = seedTeams.map((t, i) => ({ team: t, gIdx: bestAssignment[i], origIndex: i }));
        sortedAssignment.sort((a, b) => a.origIndex - b.origIndex);

        for (let i = 0; i < sortedAssignment.length; i++) {
            const { team, gIdx } = sortedAssignment[i];
            currentGroups[gIdx].push(team);
            newGrid[team.originalIdx].group = `${gIdx + 1}조`;
            // Increment drawOrder globally so any team drawn in this bucket gets a higher number 
            // than the previous bucket, but we also sequence them within the bucket so there are no ties.
            // Since sortedAssignment is sorted by origIndex, the absent team (origIndex 0) gets the lowest drawOrder.
            newGrid[team.originalIdx].drawOrder = ++drawOrderRef.current;
        }

        setGridData(newGrid);

        if (minConflicts > 0) {
            setStatusMsg(`⚠️ 배정 완료: 클럽 중복을 피할 수 없어 ${minConflicts}건의 중복이 발생했습니다.`);
        } else {
            setStatusMsg(`✅ 추첨 완료! 랜덤하게 ${seedTeams.length}팀이 완벽 배정되었습니다.`);
        }
        setTimeout(() => setStatusMsg(""), 5000);
    };

    const handleReset = async () => {
        if (confirm("정말로 모든 대회를 초기화하시겠습니까? (데이터 삭제됨)")) {
            setIsProcessing(true);
            try {
                await resetTournamentData();
                // Reset Grid too? Maybe not, keep user input.
                setStatusMsg("🗑️ 데이터가 초기화되었습니다.");
                setTimeout(() => setStatusMsg(""), 3000);
            } catch (error) {
                console.error("초기화 실패:", error);
                setStatusMsg("❌ 초기화 실패: " + error.message);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleAutoAssign = async () => {
        setIsProcessing(true);
        try {
            const { matches: nextMatches, courts: nextCourts } = assignMatchesToCourts(data.matches, data.courts);
            const newData = { ...data, matches: nextMatches, courts: nextCourts };
            await uploadData(newData);
            setStatusMsg("⚡ 코트 배정 완료!");
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    // ── 16강 일괄 코트 배정 ─────────────────────────────────────────────────
    // 32강이 모두 끝난 후 브레이크타임을 마치고 관리자가 이 버튼을 누르면
    // 16강 전 경기를 빈 코트에 일제히 배정합니다.
    const handleStart16Kang = async () => {
        if (!data || !data.matches || !data.courts) return;

        const ko16Matches = data.matches.filter(m =>
            m.group_id === '본선 16강' &&
            m.status === 'PENDING' &&
            !m.court_id &&
            m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
            m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE'
        );

        if (ko16Matches.length === 0) {
            alert('배정할 16강 경기가 없습니다.\n(대진표에 TBD가 남아있거나 이미 배정된 상태입니다.)');
            return;
        }

        const emptyCourts = data.courts
            .filter(c => {
                if (!c.match_id) return true;
                const linked = data.matches.find(m => m.id === c.match_id);
                return !linked || linked.status !== 'LIVE';
            })
            .sort((a, b) => a.id - b.id);

        if (emptyCourts.length === 0) {
            alert('빈 코트가 없습니다. 진행 중인 경기가 모두 끝난 뒤 다시 시도하세요.');
            return;
        }

        if (!confirm(`16강 ${ko16Matches.length}경기를 ${emptyCourts.length}개 빈 코트에 일괄 배정하시겠습니까?\n브레이크타임이 끝난 후 눌러주세요!`)) return;

        setIsProcessing(true);
        setStatusMsg('16강 코트 배정 중...');
        try {
            const sortedMatches = [...ko16Matches].sort((a, b) => a.round - b.round);
            const busyTeams = new Set(
                data.matches.filter(m => m.status === 'LIVE')
                    .flatMap(m => [m.team_a_id, m.team_b_id])
            );

            const promises = [];
            let courtIdx = 0;
            for (const match of sortedMatches) {
                if (courtIdx >= emptyCourts.length) break;
                if (busyTeams.has(match.team_a_id) || busyTeams.has(match.team_b_id)) continue;

                const court = emptyCourts[courtIdx++];
                busyTeams.add(match.team_a_id);
                busyTeams.add(match.team_b_id);

                promises.push(updateMatch(match.id, { status: 'LIVE', court_id: court.id }));
                promises.push(updateCourt(court.id, { match_id: match.id }));
            }

            await updateSettings('tournament_state', { allow16: true });
            if (promises.length === 0) {
                alert('16강 배정 제한만 해제되었습니다. 자동 배정을 기다려주세요.');
                setIsProcessing(false);
                return;
            }

            await Promise.all(promises);
            setStatusMsg(`✅ 16강 ${promises.length / 2}경기 코트 배정 완료!`);
            setTimeout(() => setStatusMsg(''), 4000);
        } catch (e) {
            console.error(e);
            setStatusMsg('❌ 오류: ' + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // ── 점수 전체 리셋 (참가자·조·대진 유지) ────────────────────────────────
    // 모든 경기의 점수/상태만 초기화. 팀 편성·대진표 구조는 절대 변경 안 함.
    const handleScoreReset = async () => {
        if (!data || !data.matches) return;

        const confirmed = window.confirm(
            '⚠️ 점수 전체 리셋\n\n' +
            '• 참가자, 조 편성, 대진표 구조는 유지됩니다.\n' +
            '• 모든 경기 점수, 경기 상태, 코트 배정이 초기화됩니다.\n' +
            '• 본선(32강~결승) 슬롯은 TBD로 돌아갑니다.\n\n' +
            '계속하시겠습니까?'
        );
        if (!confirmed) return;

        setIsProcessing(true);
        setStatusMsg('점수 리셋 중...');
        try {
            const isGroupMatch = (m) =>
                typeof m.group_id === 'number' ||
                (typeof m.group_id === 'string' && (m.group_id.includes('조') || /^\d+$/.test(m.group_id)));

            const knockoutGroups = new Set(['본선 32강', '본선 16강', '본선 8강', '본선 4강', '본선 결승',
                '16강', '8강', '4강', '결승', '본선 16강 (무작위)']);

            const promises = [];

            data.matches.forEach(m => {
                if (isGroupMatch(m)) {
                    // 예선: 점수·상태만 초기화, 팀은 그대로
                    promises.push(updateMatch(m.id, {
                        score_a: null,
                        score_b: null,
                        tb_score_a: null,
                        tb_score_b: null,
                        status: 'PENDING',
                        winner_id: null,
                        court_id: null
                    }));
                } else if (knockoutGroups.has(m.group_id)) {
                    // 본선: 점수·상태 초기화 + TBD로 슬롯 비우기
                    promises.push(updateMatch(m.id, {
                        score_a: null,
                        score_b: null,
                        tb_score_a: null,
                        tb_score_b: null,
                        status: 'PENDING',
                        winner_id: null,
                        court_id: null,
                        team_a_id: 'TBD',
                        team_b_id: 'TBD'
                    }));
                }
            });

            // 모든 코트 비우기
            data.courts.forEach(c => {
                promises.push(updateCourt(c.id, { match_id: null }));
            });

            await Promise.all(promises);

            // 32강 고정 대진 슬롯 복원 (FIXED_BRACKET_LAYOUT 기반으로 1위/2위 슬롯 팀 재배정)
            // → App.jsx의 자동 채우기가 다음 렌더에서 처리해줌 (fillBracket32Slots)
            setStatusMsg('✅ 점수 리셋 완료! 예선부터 다시 시작하세요.');
            setTimeout(() => setStatusMsg(''), 5000);
        } catch (e) {
            console.error(e);
            setStatusMsg('❌ 오류: ' + e.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- LOGIN VIEW ---
    if (!isAdmin) {
        return (
            <div className="login-container glass-panel">
                <div className="login-box">
                    <div className="icon-wrapper">
                        <span style={{ fontSize: '48px' }}>⚙️</span>
                    </div>
                    <h2>운영자 로그인</h2>
                    <p>대회 설정을 위해 관리자 권한이 필요합니다.</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="modern-input"
                            autoFocus
                        />
                        <button type="submit" className="modern-button primary full-width">
                            🔑 로그인
                        </button>
                    </form>
                </div>
                <style>{`
                    .login-container { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
                    .login-box { background: rgba(0, 0, 0, 0.4); padding: 3rem; border-radius: 20px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); max-width: 400px; width: 100%; }
                    .icon-wrapper { margin-bottom: 1.5rem; background: rgba(213, 255, 0, 0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
                    .login-box h2 { color: white; margin-bottom: 0.5rem; }
                    .login-box p { color: #aaa; margin-bottom: 2rem; }
                `}</style>
            </div>
        );
    }

    // --- DASHBOARD VIEW ---
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2><span className="icon-gap">⚙️</span> 대회 운영 대시보드</h2>
                <div className="status-badge" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isProcessing ? "🔄 처리 중..." : "✅ 시스템 준비됨"}
                    <span style={{ fontSize: '0.8rem', color: '#ff9800', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => window.location.reload(true)}>
                        (오류 지속 시 클릭하여 강제 새로고침)
                    </span>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* LEFT COLUMN: SETUP & TABS */}
                <div className="left-col">
                    {/* Tabs */}
                    <div className="tab-navigation">
                        <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                            ⚙️ 대회 운영 설정
                        </button>
                        <button className={`tab-btn ${activeTab === 'grouping' ? 'active' : ''}`} onClick={() => setActiveTab('grouping')}>
                            👥 참가자 명단 (Grid)
                        </button>
                        <button className={`tab-btn ${activeTab === 'standings' ? 'active' : ''}`} onClick={() => setActiveTab('standings')}>
                            📊 조별 순위 및 추첨
                        </button>
                        <button className={`tab-btn ${activeTab === 'qrcode' ? 'active' : ''}`} onClick={() => setActiveTab('qrcode')}>
                            📱 QR 출입증 인쇄
                        </button>
                        <button className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
                            🎾 경기 결과 관리
                        </button>
                    </div>

                    <div className="glass-card setup-card">
                        {/* TAB 1: SETTINGS */}
                        {activeTab === 'settings' && (
                            <div className="tab-content fade-in">
                                <div className="card-header">
                                    <h3><span className="icon-gap">⚙️</span> 환경 설정</h3>
                                </div>
                                <div className="form-section">
                                    <div className="input-group">
                                        <label>참가 팀 수</label>
                                        <input type="number" className="modern-input" value={numTeams} onChange={(e) => setNumTeams(Number(e.target.value))} />
                                        <p className="field-hint">전체 참가팀의 수입니다. (기본 48팀)</p>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '1.5rem' }}>
                                        <label>조(Group) 개수</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                type="number"
                                                className="modern-input"
                                                value={numGroups}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value);
                                                    setNumGroups(val);
                                                    if (val > 0 && numTeams % val === 0) {
                                                        const perGroup = numTeams / val;
                                                        const newGrid = gridData.map((row, idx) => ({
                                                            ...row,
                                                            group: `${Math.floor(idx / perGroup) + 1}조`
                                                        }));
                                                        setGridData(newGrid);
                                                    }
                                                }}
                                            />
                                            <button
                                                className="modern-button secondary"
                                                onClick={handleSmartAssign}
                                                title="클럽 분산 무작위 자동 배정"
                                                disabled={true}
                                            >
                                                🔀 조 구성 셔플 배정 (완료됨)
                                            </button>
                                        </div>
                                        <p className="field-hint">전체 참가팀을 나눌 조의 개수입니다.</p>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '1.5rem' }}>
                                        <label>코트(Court) 개수</label>
                                        <input type="number" className="modern-input" value={numCourts} onChange={(e) => setNumCourts(Number(e.target.value))} />
                                        <p className="field-hint">운영할 테니스 코트의 총 개수입니다.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: GROUPING (GRID INPUT) */}
                        {activeTab === 'grouping' && (
                            <div className="tab-content fade-in">
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3><span className="icon-gap">📋</span> 참가자 명단 입력 ({numTeams}팀)</h3>
                                    <div className="excel-actions">
                                        <button
                                            className="mini-btn"
                                            style={{ backgroundColor: '#ff9800', color: 'white', opacity: 0.5, cursor: 'not-allowed' }}
                                            onClick={handleSmartAssign}
                                            disabled={true}
                                        >
                                            🔀 조 구성 다시하기 (마감됨)
                                        </button>
                                        <button onClick={handleExcelDownload} className="mini-btn success">📥 엑셀 양식 다운</button>
                                        <label className="mini-btn info" style={{ cursor: 'not-allowed', opacity: 0.5 }}>
                                            📤 엑셀 업로드 (마감됨)
                                            <input type="file" disabled={true} accept=".xlsx, .xls" onChange={handleExcelUpload} style={{ display: 'none' }} />
                                        </label>
                                        <button 
                                            onClick={async () => {
                                                alert("현재 대회 조 편성이 마감되어 강제 초기화를 사용할 수 없습니다.");
                                            }}
                                            className="mini-btn danger"
                                            style={{ marginLeft: '10px', opacity: 0.5, cursor: 'not-allowed' }}
                                            disabled={true}
                                        >
                                            ☢️ 서버 강제 초기화 (마감됨)
                                        </button>
                                    </div>
                                </div>

                                <div className="grid-container">
                                    <div className="grid-header-row">
                                        <div className="gh-cell w-num">No</div>
                                        <div className="gh-cell w-group">조</div>
                                        <div className="gh-cell w-name">참가자A</div>
                                        <div className="gh-cell w-name">참가자B</div>
                                        <div className="gh-cell w-club">클럽</div>
                                    </div>
                                    <div className="grid-body">
                                        {gridData.map((row, idx) => (
                                            <div key={idx} className="grid-row">
                                                <div className="gc-cell w-num">{idx + 1}</div>
                                                <input type="text" className="gc-input w-group" placeholder="조" value={row.group} disabled={true} onChange={(e) => handleGridChange(idx, 'group', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="참가자A" value={row.p1_name} disabled={true} onChange={(e) => handleGridChange(idx, 'p1_name', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="참가자B" value={row.p2_name} disabled={true} onChange={(e) => handleGridChange(idx, 'p2_name', e.target.value)} />
                                                <input type="text" className="gc-input w-club" placeholder="클럽" value={row.club} disabled={true} onChange={(e) => handleGridChange(idx, 'club', e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-header" style={{ marginTop: '20px' }}>
                                    <h3>🚀 대회 대진표 확정 및 컨트롤</h3>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <button
                                        className="modern-button primary"
                                        onClick={handleGenerate}
                                        disabled={isProcessing}
                                        style={{ flex: 1, minWidth: '200px' }}
                                    >
                                        ▶️ 1. 예선 대진표 생성 및 시작
                                    </button>
                                    <button
                                        className="modern-button"
                                        onClick={handleGenerateKnockout32}
                                        disabled={isProcessing}
                                        style={{ flex: 1, minWidth: '200px', backgroundColor: '#e91e63' }}
                                    >
                                        👑 2. 본선 32강 대진표 생성 (고정 대진표)
                                    </button>

                                    <button
                                        className="modern-button"
                                        onClick={async () => {
                                            if (!data || !data.matches || !data.courts) return alert("데이터가 없습니다.");
                                            setIsProcessing(true);
                                            try {
                                                const { matches: nextMatches, courts: nextCourts } = assignMatchesToCourts(data.matches, data.courts);
                                                const changedCourts = nextCourts.filter(c => c.match_id !== data.courts.find(oc => oc.id === c.id)?.match_id);
                                                const changedMatches = nextMatches.filter(m => {
                                                    const oldM = data.matches.find(om => om.id === m.id);
                                                    return oldM && (m.status !== oldM.status || m.court_id !== oldM.court_id);
                                                });
                                                
                                                if (changedCourts.length === 0 && changedMatches.length === 0) {
                                                    alert("배정할 대기 경기가 없거나 빈 코트가 없습니다.");
                                                } else {
                                                    const promises = [];
                                                    changedCourts.forEach(c => promises.push(updateCourt(c.id, { match_id: c.match_id })));
                                                    changedMatches.forEach(m => promises.push(updateMatch(m.id, { status: m.status, court_id: m.court_id })));
                                                    await Promise.all(promises);
                                                    alert(`${changedCourts.length}개 빈 코트에 강제 배정이 완료되었습니다!`);
                                                }
                                            } catch (e) {
                                                console.error(e);
                                                alert("배정 중 오류 발생: " + e.message);
                                            }
                                            setIsProcessing(false);
                                        }}
                                        disabled={isProcessing}
                                        style={{ width: 'auto', backgroundColor: '#3498db' }}
                                    >
                                        ⚡ 빈 코트 강제 배정
                                    </button>

                                    <button
                                        className="modern-button danger"
                                        onClick={handleReset}
                                        disabled={true}
                                        style={{ width: 'auto', opacity: 0.5, cursor: 'not-allowed' }}
                                    >
                                        🗑️ 초기화 (조 확정)
                                    </button>

                                </div>
                            </div>
                        )}

                        {/* TAB 3: GROUP STANDINGS & LOTTERY */}
                        {activeTab === 'standings' && (
                            <div className="tab-content fade-in">
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3><span className="icon-gap">📊</span> 조별 현황 및 시드 추첨</h3>
                                </div>
                                <p className="card-desc">아래 버튼을 순차적으로 눌러 무작위 시드별로 팀을 조에 배정합니다. 배정 현황은 아래 표에 실시간으로 표시됩니다.</p>

                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '15px 0 25px 0' }}>
                                    {[1, 2, 3, 4].map(s => (
                                        <button key={s} className="modern-button secondary" onClick={() => handleSeedLottery(s)} disabled={true} style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', opacity: 0.5, cursor: 'not-allowed' }}>
                                            🎱 시드 {s} 추첨 (마감됨)
                                        </button>
                                    ))}
                                    <button className="modern-button danger" onClick={handleClearGroups} disabled={true} style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', flex: 'none', marginLeft: 'auto', opacity: 0.5, cursor: 'not-allowed' }}>
                                        🧹 조 배정 초기화 (마감됨)
                                    </button>
                                </div>

                                <div className="groups-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                                    {Array.from({ length: numGroups }).map((_, gIdx) => {
                                        const groupName = `${gIdx + 1}조`;
                                        const groupMembers = gridData
                                            .filter(r => r.group === groupName)
                                            .sort((a, b) => (a.drawOrder ?? 0) - (b.drawOrder ?? 0));
                                        return (
                                            <div key={gIdx} className="glass-card" style={{ padding: '15px' }}>
                                                <h4 style={{ margin: '0 0 10px 0', color: 'var(--tennis-yellow)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>{groupName}</h4>
                                                {groupMembers.length === 0 ? (
                                                    <p style={{ color: '#666', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>비어있음</p>
                                                ) : (
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                        {groupMembers.map((m, mIdx) => (
                                                            <li key={mIdx} style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span>{m.p1_name}/{m.p2_name}</span>
                                                                {m.club && <span style={{ fontSize: '0.8rem', color: '#aaa', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{m.club}</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isProcessing}
                                        style={{
                                            padding: '14px 40px',
                                            fontSize: '1.1rem',
                                            fontWeight: '900',
                                            background: isProcessing ? '#555' : 'linear-gradient(135deg, #d5ff00, #a8c800)',
                                            color: '#111',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 20px rgba(213,255,0,0.35)',
                                            border: 'none',
                                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseDown={(e) => !isProcessing && (e.currentTarget.style.transform = 'scale(0.97)')}
                                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    >
                                        {isProcessing ? '⏳ 저장 중...' : '💾 추첨 저장 및 예선 대진표 생성'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: QR CODE GENERATOR */}
                        {activeTab === 'qrcode' && (
                            <div className="tab-content fade-in">
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3><span className="icon-gap">📱</span> 모바일 접속 QR & 코트별 점수 입력 ({numCourts}개)</h3>
                                    <button
                                        className="modern-button primary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                        onClick={() => window.print()}
                                    >
                                        🖨️ 인쇄하기
                                    </button>
                                </div>
                                <p className="card-desc">아래의 접속용 QR코드 및 코트별 점수 입력 QR코드를 인쇄하여 현장에 배치하세요.</p>

                                <div className="main-qr-section" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <div className="qr-card main-qr-card" style={{ maxWidth: '420px', background: 'rgba(213,255,0,0.05)', border: '2px solid var(--tennis-yellow)', padding: '2rem', borderRadius: '16px' }}>
                                        <h4 className="main-qr-title" style={{ color: 'var(--tennis-yellow)', marginBottom: '20px', fontSize: '1.5rem', wordBreak: 'keep-all' }}>🌐 모바일 접속 QR 출입증</h4>
                                        <div className="qr-wrapper" style={{ padding: '20px', background: 'white', display: 'inline-block', borderRadius: '12px' }}>
                                            <QRCodeSVG value="https://racketup.vercel.app/" size={250} level={"H"} />
                                        </div>
                                        <p className="qr-url" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--tennis-yellow)', marginTop: '20px', marginBottom: '10px' }}>https://racketup.vercel.app/</p>
                                        <p className="qr-desc" style={{ color: '#aaa', fontSize: '1rem', margin: '0' }}>스마트폰 카메라로 스캔하여 접속하세요!</p>
                                    </div>
                                </div>

                                <div className="qr-grid">
                                    {Array.from({ length: numCourts }).map((_, i) => {
                                        const courtNum = i + 1;
                                        // Generate absolute URL for the QR code based on current domain
                                        const qrUrl = `${window.location.origin}/score/${courtNum}`;
                                        return (
                                            <div key={courtNum} className="qr-card">
                                                <h4>Court {courtNum}</h4>
                                                <div className="qr-wrapper">
                                                    <QRCodeSVG value={qrUrl} size={150} level={"H"} />
                                                </div>
                                                <p className="qr-url">{qrUrl}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* TAB 4: MATCH MANAGEMENT */}
                        {activeTab === 'manage' && (
                            <div className="tab-content fade-in">
                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3><span className="icon-gap">🎾</span> 경기 결과 관리</h3>
                                    <button onClick={handleDownloadFullBracketExcel} className="mini-btn success">
                                        📊 전체 대진표 엑셀 다운
                                    </button>
                                </div>

                                    {/* ── 시뮬레이션 패널 ── */}
                                    {data?.courts?.some(c => c.match_id) && (
                                        <div style={{
                                            background: 'rgba(255,152,0,0.08)',
                                            border: '1px solid rgba(255,152,0,0.3)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            marginBottom: '1.2rem'
                                        }}>
                                            <div style={{ color: '#ff9800', fontWeight: 700, marginBottom: '0.7rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>🧪 시뮬레이션 — 간편 테스트 도구</span>
                                                <button 
                                                    onClick={async () => {
                                                        if (!confirm("모든 예선 경기를 랜덤 점수로 즉시 종료하시겠습니까?")) return;
                                                        setIsProcessing(true);
                                                        try {
                                                            const groupMatches = data.matches.filter(m => {
                                                                const gid = String(m.group_id);
                                                                return (typeof m.group_id === 'number' || gid.includes('조')) && m.status !== 'COMPLETED';
                                                            });
                                                            
                                                            if (groupMatches.length === 0) {
                                                                alert("종료할 예선 경기가 없습니다.");
                                                                return;
                                                            }

                                                            const promises = [];
                                                            groupMatches.forEach(m => {
                                                                const winner = Math.random() > 0.5 ? 'a' : 'b';
                                                                const loserScore = Math.floor(Math.random() * 5); // 0~4
                                                                promises.push(updateMatch(m.id, {
                                                                    status: 'COMPLETED',
                                                                    score_a: winner === 'a' ? 6 : loserScore,
                                                                    score_b: winner === 'b' ? 6 : loserScore,
                                                                    winner_id: winner === 'a' ? m.team_a_id : m.team_b_id,
                                                                    court_id: null
                                                                }));
                                                            });
                                                            
                                                            // Free any courts tied to these matches
                                                            data.courts.forEach(c => {
                                                                if (groupMatches.some(m => m.id === c.match_id)) {
                                                                    promises.push(updateCourt(c.id, { match_id: null }));
                                                                }
                                                            });

                                                            await Promise.all(promises);
                                                            alert(`✅ ${groupMatches.length}개의 예선 경기가 자동 종료되었습니다.`);
                                                        } catch (e) {
                                                            alert("시뮬레이션 중 오류 발생: " + e.message);
                                                        }
                                                        setIsProcessing(false);
                                                    }}
                                                    style={{ 
                                                        background: '#ff9800', border: 'none', color: 'black', 
                                                        padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', 
                                                        fontWeight: 800, cursor: 'pointer' 
                                                    }}
                                                >
                                                    ⏩ 모든 예선 경기 즉시 종료 (6:0 랜덤)
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {data.courts
                                                    .filter(c => {
                                                        if (!c.match_id) return false;
                                                        const m = data.matches.find(m => m.id === c.match_id);
                                                        return m && m.status === 'LIVE';
                                                    })
                                                    .sort((a, b) => a.id - b.id)
                                                    .map(court => {
                                                        const match = data.matches.find(m => m.id === court.match_id);
                                                        const teamA = data.teams.find(t => t.id === match.team_a_id);
                                                        const teamB = data.teams.find(t => t.id === match.team_b_id);
                                                        const isGroupMatch = typeof match.group_id === 'number' || (typeof match.group_id === 'string' && (match.group_id.includes('조') || /^\d+$/.test(String(match.group_id))));
                                                        const groupLabel = isGroupMatch
                                                            ? `${match.group_id} · ${match.match_in_group || match.round}번째 경기`
                                                            : `${match.group_id} R${match.round}`;
                                                        const teamAName = teamA?.name || '?';
                                                        const teamBName = teamB?.name || '?';
                                                        return (
                                                            <div key={court.id} style={{
                                                                background: 'rgba(0,0,0,0.3)',
                                                                borderRadius: '10px',
                                                                padding: '0.6rem 0.9rem',
                                                                border: '1px solid #444',
                                                                minWidth: '240px',
                                                                maxWidth: '320px'
                                                            }}>
                                                                {/* 코트 번호 + 조/경기 정보 */}
                                                                <div style={{ fontSize: '0.72rem', color: '#d5ff00', fontWeight: 700, marginBottom: '2px' }}>
                                                                    🎾 {court.id}번 코트 &nbsp;·&nbsp; {groupLabel}
                                                                </div>
                                                                {/* 팀A 전체 이름 */}
                                                                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, marginBottom: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    🔴 {teamAName}
                                                                </div>
                                                                {/* vs */}
                                                                <div style={{ fontSize: '0.7rem', color: '#555', margin: '1px 0', textAlign: 'center' }}>vs</div>
                                                                {/* 팀B 전체 이름 */}
                                                                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    🔵 {teamBName}
                                                                </div>
                                                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                                    <button
                                                                        onClick={async () => {
                                                                            // A wins - random score
                                                                            const loserScore = Math.floor(Math.random() * 6); // 0~5
                                                                            const { updateMatch: um, updateCourt: uc } = await import('../services/firebase');
                                                                            await um(match.id, { status: 'COMPLETED', score_a: 6, score_b: loserScore, winner_id: match.team_a_id, court_id: null });
                                                                            await uc(parseInt(court.id), { match_id: null });
                                                                        }}
                                                                        style={{ background: '#1de9b6', color: '#000', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                                                                    >
                                                                        A팀승 (랜덤)
                                                                    </button>
                                                                    <button
                                                                        onClick={async () => {
                                                                            // B wins - random score
                                                                            const loserScore = Math.floor(Math.random() * 6); // 0~5
                                                                            const { updateMatch: um, updateCourt: uc } = await import('../services/firebase');
                                                                            await um(match.id, { status: 'COMPLETED', score_a: loserScore, score_b: 6, winner_id: match.team_b_id, court_id: null });
                                                                            await uc(parseInt(court.id), { match_id: null });
                                                                        }}
                                                                        style={{ background: '#82b1ff', color: '#000', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                                                                    >
                                                                        B팀승 (랜덤)
                                                                    </button>
                                                                    <button
                                                                        onClick={async () => {
                                                                            // 5:5 무승부 (예선은 타이브레이크 없음)
                                                                            const { updateMatch: um, updateCourt: uc } = await import('../services/firebase');
                                                                            await um(match.id, { status: 'COMPLETED', score_a: 5, score_b: 5, winner_id: null, court_id: null });
                                                                            await uc(parseInt(court.id), { match_id: null });
                                                                        }}
                                                                        style={{ background: '#ff9800', color: '#000', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                                                                    >
                                                                        5:5 무승부
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )}
                                <p className="card-desc">운영자가 직접 점수(+/-)나 경기 상태를 변경할 수 있습니다. 변경된 점수는 대진표 모니터에 실시간 반영됩니다.</p>

                                {/* Manage Sub-Tabs */}
                                <div className="manage-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem', marginTop: '1rem' }}>
                                    {['전체', '예선 조별리그', '본선 32강', '16강', '8강', '4강', '결승'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveManageTab(tab)}
                                            style={{
                                                padding: '6px 12px',
                                                background: activeManageTab === tab ? 'var(--tennis-yellow)' : 'rgba(0,0,0,0.3)',
                                                color: activeManageTab === tab ? 'black' : '#ccc',
                                                border: activeManageTab === tab ? '1px solid var(--tennis-yellow)' : '1px solid #444',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: activeManageTab === tab ? 'bold' : 'normal',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {(() => {
                                        const filteredMatches = [...data.matches]
                                            .filter(m => {
                                                if (activeManageTab === '전체') return true;
                                                if (activeManageTab === '예선 조별리그') return typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes('조'));
                                                if (activeManageTab === '본선 32강') return m.group_id === '본선 32강';
                                                if (activeManageTab === '16강') return ['본선 16강', '16강', '본선 16강 (무작위)'].includes(m.group_id);
                                                if (activeManageTab === '8강')  return ['본선 8강',  '8강'].includes(m.group_id);
                                                if (activeManageTab === '4강')  return ['본선 4강',  '4강'].includes(m.group_id);
                                                if (activeManageTab === '결승')  return ['본선 결승', '결승'].includes(m.group_id);
                                                return m.group_id === activeManageTab;
                                            })
                                            .sort((a, b) => {
                                                // 1. Sort by Status (LIVE > PENDING > COMPLETED)
                                                const statusOrder = { 'LIVE': 1, 'PENDING': 2, 'SCHEDULED': 2, 'COMPLETED': 3 };
                                                const sA = statusOrder[a.status] || 4;
                                                const sB = statusOrder[b.status] || 4;
                                                if (sA !== sB) return sA - sB;

                                                // 2. Sort by Group/Round
                                                if (a.group_id !== b.group_id) {
                                                    const parseGroup = g => parseInt(String(g).replace(/[^0-9]/g, '') || 999);
                                                    return parseGroup(a.group_id) - parseGroup(b.group_id);
                                                }
                                                return a.round - b.round;
                                            });

                                        const getTeam = (id) => data.teams.find(t => t.id === id) || { id: 'TBD', name: 'TBD', player1: '', player2: '' };

                                        if (activeManageTab === '예선 조별리그') {
                                            const grouped = {};
                                            filteredMatches.forEach(m => {
                                                const g = typeof m.group_id === 'number' ? `${m.group_id}조` : m.group_id;
                                                if (!grouped[g]) grouped[g] = [];
                                                grouped[g].push(m);
                                            });
                                            const sortedGroups = Object.keys(grouped).sort((a,b) => {
                                                const numA = parseInt(a.replace(/[^0-9]/g, '')) || 999;
                                                const numB = parseInt(b.replace(/[^0-9]/g, '')) || 999;
                                                return numA - numB;
                                            });

                                            return sortedGroups.map(group => (
                                                <div key={group} style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <h4 style={{ color: 'var(--tennis-yellow)', marginBottom: '1rem', fontSize: '1.1rem', borderBottom: '1px solid rgba(213,255,0,0.2)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '1.2em' }}>📋</span> {group} 경기 목록
                                                    </h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                        {grouped[group].map(match => (
                                                            <MatchCard
                                                                key={match.id}
                                                                match={match}
                                                                teamA={getTeam(match.team_a_id)}
                                                                teamB={getTeam(match.team_b_id)}
                                                                isAdmin={true}
                                                                allMatches={data.matches}
                                                                courts={data.courts}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ));
                                        }

                                        return filteredMatches.map(match => (
                                            <MatchCard
                                                key={match.id}
                                                match={match}
                                                teamA={getTeam(match.team_a_id)}
                                                teamB={getTeam(match.team_b_id)}
                                                isAdmin={true}
                                                allMatches={data.matches}
                                                courts={data.courts}
                                            />
                                        ));
                                    })()}
                                    {data.matches.length === 0 && (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                                            생성된 경기가 없습니다. [대회 운영 설정] 탭에서 대진표를 먼저 생성해주세요.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {statusMsg && <div className="status-message">{statusMsg}</div>}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="right-col">
                    <div className="glass-card status-card">
                        <div className="card-header"><h3>✅ 현재 상태</h3></div>
                        <div className="stat-grid">
                            <div className="stat-item"><span className="stat-label">진행 중</span><span className="stat-value live">{data.matches.filter(m => m.status === 'LIVE').length}</span></div>
                            <div className="stat-item"><span className="stat-label">대기 중</span><span className="stat-value">{data.matches.filter(m => m.status === 'PENDING').length}</span></div>
                            <div className="stat-item"><span className="stat-label">완료됨</span><span className="stat-value completed">{data.matches.filter(m => m.status === 'COMPLETED').length}</span></div>
                        </div>
                    </div>
                    <div className="glass-card control-card">
                        <div className="card-header"><h3>⚡ 경기 배정</h3></div>
                        <p className="card-desc">빈 코트가 생기면 대기 중인 경기를 자동으로 배정합니다.</p>
                        <button onClick={handleAutoAssign} disabled={isProcessing} className="modern-button secondary full-width">⚡ 코트 자동 배정</button>
                    </div>
                    {/* 점수 리셋 버튼 - 테스트용, 참가자·조·대진 구조는 유지 */}
                    <div className="glass-card control-card" style={{ border: '1px solid rgba(255,80,80,0.35)', background: 'rgba(80,10,10,0.4)' }}>
                        <div className="card-header"><h3 style={{ color: '#ff6b6b' }}>🔄 점수 리셋 (테스트용)</h3></div>
                        <p className="card-desc" style={{ color: '#ff9999', fontSize: '0.82rem' }}>
                            참가자·조·대진 구조는 <strong>절대 변경되지 않습니다.</strong><br/>
                            모든 경기 점수·상태·코트 배정만 초기화해서 처음부터 다시 테스트합니다.
                        </p>
                        <button
                            onClick={handleScoreReset}
                            disabled={isProcessing}
                            className="modern-button full-width"
                            style={{ background: 'linear-gradient(135deg,#c62828,#b71c1c)', color: '#fff', fontWeight: 700 }}
                        >
                            🔄 점수 전체 리셋 (예선부터 재시작)
                        </button>
                    </div>
                    {/* 16강 일괄 시작 버튼 - 32강 완료 후 브레이크타임 뒤 관리자 수동 시작 */}
                    {(() => {
                        const ko32Done = data.matches.filter(m => m.group_id === '본선 32강').length > 0 &&
                            data.matches.filter(m => m.group_id === '본선 32강').every(m => m.status === 'COMPLETED');
                        const ko16Ready = data.matches.filter(m =>
                            m.group_id === '본선 16강' &&
                            m.status === 'PENDING' &&
                            m.team_a_id !== 'TBD' && m.team_b_id !== 'TBD'
                        ).length > 0;
                        if (!ko32Done || !ko16Ready) return null;
                        return (
                            <div className="glass-card control-card" style={{ border: '2px solid #1de9b6', boxShadow: '0 0 20px rgba(29,233,182,0.3)' }}>
                                <div className="card-header"><h3>🚀 16강 시작</h3></div>
                                <p className="card-desc" style={{ color: '#1de9b6', fontWeight: 700 }}>32강 완료! 브레이크타임 후 아래 버튼으로 16강을 일괄 시작하세요.</p>
                                <button
                                    onClick={handleStart16Kang}
                                    disabled={isProcessing}
                                    className="modern-button full-width"
                                    style={{ background: 'linear-gradient(135deg, #1de9b6, #00bfa5)', color: '#000', fontWeight: 900, fontSize: '1.1rem', padding: '14px' }}
                                >
                                    🎾 16강 전 경기 코트 배정!
                                </button>
                            </div>
                        );
                    })()}
                    <div className="glass-card help-card">
                        <div className="card-header"><h3>ℹ️ 도움말</h3></div>
                        <ul className="help-list">
                            <li>• 엑셀 양식을 다운받아 작성 후 업로드하면 편리합니다.</li>
                            <li>• '조'를 입력하면 해당 조로 배정됩니다.</li>
                            <li>• 이름1, 이름2는 필수 입력 사항입니다.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                /* ... (Keep existing styles) ... */
                .dashboard-container { padding: 1rem; max-width: 1400px; margin: 0 auto; color: white; }
                .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
                .dashboard-header h2 { display: flex; align-items: center; font-size: 1.8rem; color: white; margin: 0; }
                .status-badge { background: rgba(255, 255, 255, 0.1); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; color: var(--text-secondary); }
                .dashboard-grid { display: grid; grid-template-columns: 3fr 1fr; gap: 1.5rem; }
                @media(max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }
                
                .tab-navigation { display: flex; gap: 10px; margin-bottom: 1rem; }
                .tab-btn { padding: 0.8rem 1.2rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #888; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; transition: all 0.2s ease; }
                .tab-btn:hover { background: rgba(255,255,255,0.05); color: white; }
                .tab-btn.active { background: var(--tennis-yellow); color: black; border-color: var(--tennis-yellow); box-shadow: 0 0 15px rgba(213, 255, 0, 0.3); }
                
                .glass-card { background: rgba(30, 30, 30, 0.6); backdrop-filter: blur(10px); border-radius: 16px; padding: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); }
                
                /* QR Grid Specifics */
                .qr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
                .qr-card { background: white; padding: 1rem; border-radius: 12px; text-align: center; color: black; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
                .qr-card h4 { margin: 0 0 10px 0; font-size: 1.2rem; color: #333; }
                .qr-wrapper { background: white; padding: 10px; display: inline-block; }
                .qr-url { margin-top: 10px; font-size: 0.7rem; color: #666; word-break: break-all; }
                
                /* Print Styles */
                @media print {
                    @page { 
                        size: A4 portrait; 
                        margin: 0; 
                    }
                    
                    /* Reset body and root to block to prevent flexbox from breaking print pagination */
                    body, #root {
                        display: block !important;
                        height: auto !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                    }

                    /* Hide all UI elements we don't want to print */
                    .dashboard-header, 
                    .tab-navigation, 
                    .card-header, 
                    .card-desc, 
                    .right-col, 
                    button, 
                    .status-badge,
                    .status-message {
                        display: none !important;
                    }

                    /* Hide fixed elements from App.jsx (like the push notification banner) */
                    div[style*="position: fixed"] {
                        display: none !important;
                    }

                    /* Reset the layout containers to standard block flow */
                    .dashboard-container, 
                    .dashboard-grid, 
                    .left-col, 
                    .tab-content,
                    .glass-card {
                        display: block !important;
                        width: 100% !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        border: none !important;
                        box-shadow: none !important;
                        overflow: visible !important;
                    }

                    .qr-grid {
                        display: block !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    /* Unset the flex parent container to prevent issues */
                    .main-qr-section, div[style*="marginBottom: 2.5rem"] {
                        margin: 0 auto !important;
                        padding: 0 !important;
                        display: block !important;
                        width: 100% !important;
                    }

                    .qr-card {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        width: 100% !important; /* Take full available width for perfect flex centering */
                        height: 260mm !important; /* Safe height to prevent 2nd blank page overflow */
                        max-width: none !important; /* Override screen max-width */
                        page-break-after: always !important;
                        page-break-inside: avoid !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        border: none !important;
                        box-shadow: none !important;
                        color: black !important;
                        box-sizing: border-box !important;
                    }

                    .qr-card h4 {
                        font-size: 3.5rem !important; /* Reduced size */
                        margin: 0 0 15mm 0 !important;
                        color: black !important;
                        text-align: center !important;
                        font-weight: 800 !important;
                        width: 100% !important;
                    }

                    /* Make the main QR title slightly smaller to prevent huge multi-line wrapping */
                    .qr-card h4.main-qr-title {
                        font-size: 2.5rem !important; /* Smaller size for single line */
                        line-height: 1.2 !important;
                        margin-bottom: 20mm !important;
                    }

                    .qr-wrapper {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        background: white !important;
                        padding: 0 !important;
                        margin-bottom: 10mm !important;
                    }

                    .qr-wrapper svg {
                        width: 100mm !important; /* Make QR codes smaller! */
                        height: 100mm !important;
                    }

                    .qr-url {
                        display: block !important;
                        font-size: 1.5rem !important; /* Reduced size */
                        font-weight: bold !important;
                        color: black !important;
                        margin-top: 5mm !important;
                        text-align: center !important;
                        word-break: break-all !important;
                    }

                    p[style*="color: #aaa"], .qr-desc {
                        font-size: 1rem !important; /* Reduced size */
                        color: #555 !important;
                        margin-top: 5mm !important;
                        text-align: center !important;
                        width: 100% !important;
                    }
                }

                .card-header { margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.5rem; }
                .card-header h3 { margin: 0; font-size: 1.2rem; color: var(--tennis-yellow); display: flex; align-items: center; }
                
                .modern-input { width: 100%; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 0.8rem; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s; }
                .modern-input:focus { outline: none; border-color: var(--tennis-yellow); background: rgba(0, 0, 0, 0.5); }
                .input-group label { display: block; margin-bottom: 0.5rem; color: #aaa; font-size: 0.9rem; }
                .field-hint { font-size: 0.85rem; color: #666; margin-top: 5px; }

                .action-buttons { display: flex; gap: 1rem; margin-top: 2rem; }
                .modern-button { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 1rem 1.5rem; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
                .modern-button:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
                .modern-button:disabled { opacity: 0.5; cursor: not-allowed; }
                .primary { background: var(--tennis-yellow); color: black; flex: 2; }
                .secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
                .danger { background: rgba(255, 68, 68, 0.2); color: #ff4444; border: 1px solid #ff4444; flex: 1; }
                .full-width { width: 100%; }

                /* Grid Styles */
                .grid-container { max-height: 500px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; }
                .grid-header-row { display: flex; background: rgba(255,255,255,0.1); position: sticky; top: 0; z-index: 10; font-weight: bold; color: var(--tennis-yellow); font-size: 0.85rem; }
                .grid-row { display: flex; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .grid-row:hover { background: rgba(255,255,255,0.02); }
                
                .gh-cell, .gc-cell { padding: 8px; display: flex; align-items: center; justify-content: center; }
                .gc-input { background: transparent; border: none; color: white; padding: 8px; font-size: 0.9rem; width: 100%; text-align: center; }
                .gc-input:focus { background: rgba(255,255,255,0.1); outline: none; color: var(--tennis-yellow); }

                /* Column Widths */
                .w-num { width: 40px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.05); }
                .w-group { width: 50px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.05); }
                .w-club { width: 100px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.05); }
                .w-name { flex: 1; min-width: 80px; border-right: 1px solid rgba(255,255,255,0.05); }
                .w-gender { width: 50px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.05); }

                .excel-actions { display: flex; gap: 10px; }
                .mini-btn { padding: 5px 10px; font-size: 0.8rem; border-radius: 4px; border: none; cursor: pointer; color: white; display: inline-block; }
                .mini-btn.success { background: #4caf50; }
                .mini-btn.info { background: #2196f3; }
                
                /* Right Col Stats */
                .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; }
                .stat-item { background: rgba(0,0,0,0.2); padding: 1rem 0.5rem; border-radius: 8px; }
                .stat-label { font-size: 0.8rem; color: #888; display: block; margin-bottom: 5px; }
                .stat-value { font-size: 1.5rem; font-weight: bold; color: white; }
                .stat-value.live { color: #ff4444; }
                .stat-value.completed { color: #4caf50; }
                .card-desc { color: #aaa; font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.4; }
                .help-list { list-style: none; padding: 0; margin: 0; color: #ccc; font-size: 0.9rem; line-height: 1.6; }
                .status-message { margin-top: 1rem; padding: 1rem; background: rgba(213, 255, 0, 0.1); color: var(--tennis-yellow); border-radius: 8px; text-align: center; font-weight: bold; animation: fadeIn 0.3s ease; }
            `}</style>
        </div>
    );
});

export default AdminDashboardNew;
