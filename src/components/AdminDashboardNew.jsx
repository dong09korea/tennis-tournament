import React, { useState, useEffect } from 'react';
import { generateGroups, generateSchedule, assignMatchesToCourts } from '../utils/tournamentLogic';
import { uploadData, updateMatch, resetTournamentData } from '../services/firebase';
import * as XLSX from 'xlsx';

const AdminDashboardNew = ({ data, onUpdateData, isAdmin, onLogin }) => {
    // Local State
    const [numTeams, setNumTeams] = useState(48); // Default 48 Teams
    const [numGroups, setNumGroups] = useState(8); // Default 8 Groups
    const [numCourts, setNumCourts] = useState(10);
    const [password, setPassword] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'grouping'

    // Grid State: numTeams Rows
    const [gridData, setGridData] = useState(
        Array.from({ length: 48 }, (_, i) => ({
            id: i,
            group: '',
            club: '',
            p1_name: '',
            p1_gender: '',
            p1_score: '',
            p2_name: '',
            p2_gender: '',
            p2_score: '',
            total_score: ''
        }))
    );

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
                    ...{ p1_name: '', p1_gender: '', p1_score: '', p2_name: '', p2_gender: '', p2_score: '', total_score: '' }
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
        const ws = XLSX.utils.json_to_sheet(gridData.map(r => ({
            '조': r.group,
            '클럽': r.club,
            '이름1': r.p1_name,
            '성별1': r.p1_gender,
            '점수1': r.p1_score,
            '이름2': r.p2_name,
            '성별2': r.p2_gender,
            '점수2': r.p2_score,
            '합계': r.total_score
        })));
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

            // Parse data (Skip header row if exists)
            // Assuming header on row 0: '조', '클럽', ...
            // Map to gridData
            const newGrid = [...gridData];
            // Start from row 1 (index 1) if header exists. Let's assume header exists.
            let gridIdx = 0;
            for (let i = 1; i < data.length; i++) {
                if (gridIdx >= numTeams) break;
                const row = data[i];
                if (!row || row.length === 0) continue;

                newGrid[gridIdx] = {
                    ...newGrid[gridIdx],
                    group: row[0] || '',
                    club: row[1] || '',
                    p1_name: row[2] || '',
                    p1_gender: row[3] || '',
                    p1_score: row[4] || '',
                    p2_name: row[5] || '',
                    p2_gender: row[6] || '',
                    p2_score: row[7] || '',
                    total_score: row[8] || ''
                };
                gridIdx++;
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
    const handleGenerate = async () => {
        // Filter valid teams (must have names)
        const validRows = gridData.filter(r => r.p1_name && r.p2_name);

        if (validRows.length === 0) {
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
                p1_score: r.p1_score,
                p2_gender: r.p2_gender,
                p2_score: r.p2_score,
                total_score: r.total_score,
                initial_group: r.group // Use manual group
            }));

            if (teams.length < numGroups) {
                if (!confirm(`팀 수(${teams.length})가 조 개수(${numGroups})보다 적습니다. 계속 진행할까요?`)) {
                    setIsProcessing(false);
                    return;
                }
            }

            // Generate Logic
            const groups = generateGroups(teams, numGroups);
            const matches = generateSchedule(groups);
            const courts = Array.from({ length: numCourts }, (_, i) => ({
                id: i + 1,
                match_id: null
            }));

            // Auto Assign
            const { matches: assignedMatches, courts: assignedCourts } = assignMatchesToCourts(matches, courts);

            const newData = { teams, groups, matches: assignedMatches, courts: assignedCourts };

            await uploadData(newData);
            setStatusMsg("✅ 대회 생성 및 업로드 완료!");
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

        if (!confirm(`${numGroups}개 조로 '스마트 배정' 하시겠습니까?\n(1. 점수순 시드 배정, 2. 클럽 중복 최소화)`)) {
            return;
        }

        // 1. Get valid teams from grid
        const validTeams = gridData.map((row, idx) => ({ ...row, originalIdx: idx })).filter(r => r.p1_name || r.club || r.total_score);

        // 2. Sort by Total Score (Desc) for Seeding
        // Treat empty score as 0
        validTeams.sort((a, b) => {
            const scoreA = parseFloat(a.total_score) || 0;
            const scoreB = parseFloat(b.total_score) || 0;
            return scoreB - scoreA;
        });

        // 3. Prepare Buckets
        const groups = Array.from({ length: numGroups }, () => []);

        // 4. Distribute (Snake Draft + Club Constraint)
        // We iterate through teams. For each team, we find the best group.
        // Rule: Avoid group where a team from same 'club' exists (if possible).
        // Rule: Balance group sizes (Snake order helps, but we enforce size limit).

        const teamsPerGroup = numTeams / numGroups;

        validTeams.forEach((team, i) => {
            // Determine snake direction based on round
            // Round 0 (0..numGroups-1): Forward
            // Round 1 (numGroups..2*numGroups-1): Backward? 
            // Actually, simplified balancing:
            // Just find a group that is not full.

            // Preferred groups: Not full AND No club conflict
            let candidateGroups = groups.map((g, idx) => ({ id: idx, members: g, count: g.length }))
                .filter(g => g.count < teamsPerGroup); // Must have space

            // Try to filter by Club Conflict
            const club = team.club ? team.club.trim() : "";
            let bestGroups = candidateGroups;

            if (club) {
                const noConflictGroups = candidateGroups.filter(g => !g.members.some(m => m.club && m.club.trim() === club));
                if (noConflictGroups.length > 0) {
                    bestGroups = noConflictGroups;
                }
                // If noConflictGroups is empty, we MUST conflict (Pigeonhole). Fallback to candidateGroups.
            }

            // From bestGroups, pick the one with fewest members (to balance filling)
            // If equal, picking random or sequential? 
            // To simulate "Snake Seeding" behavior along with Club constraint is hard.
            // Let's prioritize "Smallest size" first to keep them even.
            bestGroups.sort((a, b) => a.count - b.count);

            // If counts are equal, maybe use ID based on Snake?
            // Simple approach: Just pick the first.

            if (bestGroups.length > 0) {
                groups[bestGroups[0].id].push(team);
            } else {
                // Should not happen if total teams <= 48
                console.warn("No space left for team", team);
            }
        });

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
        alert("✅ 스마트 배정 완료! (점수순 시드 + 클럽 분산)");
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
                <div className="status-badge">
                    {isProcessing ? "🔄 처리 중..." : "✅ 시스템 준비됨"}
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
                                                title="점수순 시드 배정 + 클럽 분산 배정"
                                            >
                                                ⚡ 스마트 배정
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
                                            style={{ backgroundColor: '#9c27b0', color: 'white' }}
                                            onClick={handleSmartAssign}
                                        >
                                            ⚡ 스마트 배정 ({numGroups}개)
                                        </button>
                                        <button onClick={handleExcelDownload} className="mini-btn success">📥 엑셀 양식 다운</button>
                                        <label className="mini-btn info" style={{ cursor: 'pointer' }}>
                                            📤 엑셀 업로드
                                            <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} style={{ display: 'none' }} />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid-container">
                                    <div className="grid-header-row">
                                        <div className="gh-cell w-num">No</div>
                                        <div className="gh-cell w-group">조</div>
                                        <div className="gh-cell w-club">클럽</div>
                                        <div className="gh-cell w-name">이름1</div>
                                        <div className="gh-cell w-gender">성별</div>
                                        <div className="gh-cell w-score">점수</div>
                                        <div className="gh-cell w-name">이름2</div>
                                        <div className="gh-cell w-gender">성별</div>
                                        <div className="gh-cell w-score">점수</div>
                                        <div className="gh-cell w-total">합계</div>
                                    </div>
                                    <div className="grid-body">
                                        {gridData.map((row, idx) => (
                                            <div key={idx} className="grid-row">
                                                <div className="gc-cell w-num">{idx + 1}</div>
                                                <input type="text" className="gc-input w-group" placeholder="조" value={row.group} onChange={(e) => handleGridChange(idx, 'group', e.target.value)} />
                                                <input type="text" className="gc-input w-club" placeholder="클럽" value={row.club} onChange={(e) => handleGridChange(idx, 'club', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="이름1" value={row.p1_name} onChange={(e) => handleGridChange(idx, 'p1_name', e.target.value)} />
                                                <input type="text" className="gc-input w-gender" placeholder="성" value={row.p1_gender} onChange={(e) => handleGridChange(idx, 'p1_gender', e.target.value)} />
                                                <input type="text" className="gc-input w-score" placeholder="점" value={row.p1_score} onChange={(e) => handleGridChange(idx, 'p1_score', e.target.value)} />
                                                <input type="text" className="gc-input w-name" placeholder="이름2" value={row.p2_name} onChange={(e) => handleGridChange(idx, 'p2_name', e.target.value)} />
                                                <input type="text" className="gc-input w-gender" placeholder="성" value={row.p2_gender} onChange={(e) => handleGridChange(idx, 'p2_gender', e.target.value)} />
                                                <input type="text" className="gc-input w-score" placeholder="점" value={row.p2_score} onChange={(e) => handleGridChange(idx, 'p2_score', e.target.value)} />
                                                <input type="text" className="gc-input w-total" placeholder="합" value={row.total_score} onChange={(e) => handleGridChange(idx, 'total_score', e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button onClick={handleGenerate} disabled={isProcessing} className="modern-button primary">
                                        ▶️ 대진표 생성 및 시작
                                    </button>
                                    <button onClick={handleReset} disabled={isProcessing} className="modern-button danger">
                                        🗑️ 대회 초기화
                                    </button>
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
                .w-score { width: 50px; flex-shrink: 0; border-right: 1px solid rgba(255,255,255,0.05); }
                .w-total { width: 60px; flex-shrink: 0; }

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
};

export default AdminDashboardNew;
