import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { generateGroups, generateSchedule, assignMatchesToCourts, calculateStandings, getTop32Teams, generateBracket32, updateTournamentProgression } from '../utils/tournamentLogic';
import { uploadData, updateMatch, updateCourt, resetTournamentData } from '../services/firebase';
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
        // Filter valid teams (must have names)
        const validRows = gridData.filter(r => r.p1_name && r.p2_name);

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
        const seedTeams = unassignedValidTeams.slice(0, bucketSize);

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
        // We can do this by using the current max drawOrder or a base offset.
        for (let i = 0; i < seedTeams.length; i++) {
            const team = seedTeams[i];
            const bestGIdx = bestAssignment[i];
            currentGroups[bestGIdx].push(team);
            newGrid[team.originalIdx].group = `${bestGIdx + 1}조`;
            // Increment drawOrder globally so any team drawn in this bucket gets a higher number 
            // than the previous bucket, but we also sequence them within the bucket so there are no ties.
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
                                            >
                                                🔀 조 구성 셔플 배정
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
                                            style={{ backgroundColor: '#ff9800', color: 'white' }}
                                            onClick={handleSmartAssign}
                                        >
                                            🔀 조 구성 다시하기 (클럽분산)
                                        </button>
                                        <button onClick={handleExcelDownload} className="mini-btn success">📥 엑셀 양식 다운</button>
                                        <label className="mini-btn info" style={{ cursor: 'pointer' }}>
                                            📤 엑셀 업로드
                                            <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} style={{ display: 'none' }} />
                                        </label>
                                        <button 
                                            onClick={async () => {
                                                if (confirm("🚨 경고: 서버의 모든 대회 데이터를 '강제'로 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며, 통신 오류를 해결하기 위해 사용합니다.")) {
                                                    setIsProcessing(true);
                                                    try {
                                                        await resetTournamentData();
                                                        alert("🧹 서버 데이터가 깨끗하게 비워졌습니다. 이제 다시 생성해보세요.");
                                                        window.location.reload(); // Force reload to be sure
                                                    } catch (e) {
                                                        alert("초기화 실패: " + e.message);
                                                    }
                                                    setIsProcessing(false);
                                                }
                                            }}
                                            className="mini-btn danger"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            ☢️ 서버 강제 초기화
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
                                                <input type="text" className="gc-input w-group" placeholder="조" value={row.group} onChange={(e) => handleGridChange(idx, 'group', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="참가자A" value={row.p1_name} onChange={(e) => handleGridChange(idx, 'p1_name', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="참가자B" value={row.p2_name} onChange={(e) => handleGridChange(idx, 'p2_name', e.target.value)} />
                                                <input type="text" className="gc-input w-club" placeholder="클럽" value={row.club} onChange={(e) => handleGridChange(idx, 'club', e.target.value)} />
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
                                        disabled={isProcessing}
                                        style={{ width: 'auto' }}
                                    >
                                        🗑️ 초기화
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
                                        <button key={s} className="modern-button secondary" onClick={() => handleSeedLottery(s)} style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
                                            🎱 시드 {s} 추첨
                                        </button>
                                    ))}
                                    <button className="modern-button danger" onClick={handleClearGroups} style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', flex: 'none', marginLeft: 'auto' }}>
                                        🧹 조 배정 초기화
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

                                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                    <h4 style={{ color: 'var(--tennis-yellow)', marginBottom: '15px', fontSize: '1.2rem' }}>🌐 모바일 접속용 전체 QR 출입증 (Racket Up)</h4>
                                    <div className="qr-card" style={{ display: 'inline-block', maxWidth: '350px', background: 'rgba(213,255,0,0.05)', borderColor: 'var(--tennis-yellow)' }}>
                                        <div className="qr-wrapper" style={{ padding: '15px', background: 'white' }}>
                                            <QRCodeSVG value="https://racketup.vercel.app/" size={200} level={"H"} />
                                        </div>
                                        <p className="qr-url" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--tennis-yellow)', marginTop: '10px' }}>https://racketup.vercel.app/</p>
                                        <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '10px', marginBottom: '10px' }}>스마트폰 카메라로 스캔하여 사이트에 접속하세요!</p>
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
                                <div className="card-header">
                                    <h3><span className="icon-gap">🎾</span> 경기 결과 관리</h3>

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
                                                        const label = `${court.id}코트: ${teamA?.name?.split('/')[0] || '?'} vs ${teamB?.name?.split('/')[0] || '?'}`;
                                                        return (
                                                            <div key={court.id} style={{
                                                                background: 'rgba(0,0,0,0.3)',
                                                                borderRadius: '10px',
                                                                padding: '0.6rem 0.9rem',
                                                                border: '1px solid #444',
                                                                minWidth: '200px'
                                                            }}>
                                                                <div style={{ fontSize: '0.78rem', color: '#ccc', marginBottom: '6px' }}>{label}</div>
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
                                </div>
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
                                    {[...data.matches]
                                        .filter(m => {
                                            if (activeManageTab === '전체') return true;
                                            if (activeManageTab === '예선 조별리그') return typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes('조'));
                                            if (activeManageTab === '16강') return m.group_id === '본선 16강 (무작위)' || m.group_id === '16강';
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
                                        })
                                        .map(match => {
                                            const getTeam = (id) => data.teams.find(t => t.id === id) || { id: 'TBD', name: 'TBD', player1: '', player2: '' };
                                            return (
                                                <MatchCard
                                                    key={match.id}
                                                    match={match}
                                                    teamA={getTeam(match.team_a_id)}
                                                    teamB={getTeam(match.team_b_id)}
                                                    isAdmin={true}
                                                    allMatches={data.matches}
                                                />
                                            );
                                        })}
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

                    /* Unset the flex parent container of the main QR to prevent issues */
                    div[style*="marginBottom: 2.5rem"] {
                        margin: 0 !important;
                        padding: 0 !important;
                        display: block !important;
                        width: 100% !important;
                    }

                    .qr-card {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        width: 210mm !important; /* A4 Width */
                        height: 297mm !important; /* A4 Height */
                        page-break-after: always !important;
                        page-break-inside: avoid !important;
                        margin: 0 !important;
                        padding: 20mm !important;
                        background: white !important;
                        border: none !important;
                        box-shadow: none !important;
                        color: black !important;
                        box-sizing: border-box !important;
                    }

                    .qr-card h4 {
                        font-size: 4rem !important;
                        margin: 0 0 20mm 0 !important;
                        color: black !important;
                        text-align: center !important;
                        font-weight: 800 !important;
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
                        width: 140mm !important;
                        height: 140mm !important;
                    }

                    .qr-url {
                        display: block !important;
                        font-size: 1.8rem !important;
                        font-weight: bold !important;
                        color: black !important;
                        margin-top: 5mm !important;
                        text-align: center !important;
                        word-break: break-all !important;
                    }

                    p[style*="color: #aaa"] {
                        font-size: 1.2rem !important;
                        color: #333 !important;
                        margin-top: 5mm !important;
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
