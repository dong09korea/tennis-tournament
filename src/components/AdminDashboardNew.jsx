import React, { useState } from 'react';
import { generateGroups, generateSchedule, assignMatchesToCourts } from '../utils/tournamentLogic';
import { uploadData, updateMatch, resetTournamentData } from '../services/firebase';

const AdminDashboardNew = ({ data, onUpdateData, isAdmin, onLogin }) => {
    // Local State
    const [teamInput, setTeamInput] = useState("");
    const [numGroups, setNumGroups] = useState(8);
    const [numCourts, setNumCourts] = useState(10);
    const [password, setPassword] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'grouping'

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin') {
            onLogin(true);
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    const handleGenerate = async () => {
        if (!teamInput.trim()) {
            alert("참가자 명단을 입력해주세요.");
            return;
        }

        setIsProcessing(true);
        setStatusMsg("데이터 처리 중...");

        try {
            // Parse Teams
            const lines = teamInput.split('\n').filter(n => n.trim());
            const teams = lines.map((line, idx) => {
                // Check if line has tab or multiple spaces (Extended Format)
                // Expected: "Club P1Name P1Gender P1Score P2Name P2Gender P2Score TotalScore Group"
                // Delimiter: Space or Tab
                const parts = line.trim().split(/\s+/);

                if (parts.length >= 8) {
                    // Try to map extended format
                    // Depending on EXACT columns. User said:
                    // Club, P1, Gender, Score, P2, Gender, Score, Total, Group (9 parts)
                    // But maybe names have spaces? Let's assume compact names for now.

                    // Simple heuristic: if parts >= 8, treat as robust data
                    // 0: Club
                    // 1: P1 Name
                    // 2: P1 Gender
                    // 3: P1 Score
                    // 4: P2 Name
                    // 5: P2 Gender
                    // 6: P2 Score
                    // 7: Total Score
                    // 8: Group (Optional?)

                    const club = parts[0];
                    const p1 = parts[1];
                    const p1g = parts[2];
                    const p1s = parts[3];
                    const p2 = parts[4];
                    const p2g = parts[5];
                    const p2s = parts[6];
                    const total = parts[7];
                    const group = parts[8] || null; // Might be undefined

                    return {
                        id: `t${idx + 1}`,
                        name: `${p1}/${p2}`, // Display Name
                        player1: p1,
                        player2: p2,
                        club: club,
                        p1_gender: p1g,
                        p1_score: p1s,
                        p2_gender: p2g,
                        p2_score: p2s,
                        total_score: total,
                        initial_group: group
                    };
                } else {
                    // Fallback to simple name
                    const name = line.trim();
                    const players = name.split('/');
                    return {
                        id: `t${idx + 1}`,
                        name: name,
                        player1: players[0] || "",
                        player2: players[1] || "",
                        club: "",
                        initial_group: null
                    };
                }
            });

            if (teams.length < numGroups) {
                if (!confirm(`팀 수(${teams.length})가 조 개수(${numGroups})보다 적습니다.계속 진행할까요?`)) {
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

    const handleReset = async () => {
        if (confirm("정말로 모든 대회를 초기화하시겠습니까? (데이터 삭제됨)")) {
            setIsProcessing(true);
            try {
                // Call dedicated reset function
                await resetTournamentData();
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
    .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}
                    .login-box {
    background: rgba(0, 0, 0, 0.4);
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: 400px;
    width: 100%;
}
                    .icon-wrapper {
    margin-bottom: 1.5rem;
    background: rgba(213, 255, 0, 0.1);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}
                    .login-box h2 {
    color: white;
    margin-bottom: 0.5rem;
}
                    .login-box p {
    color: #aaa;
    margin-bottom: 2rem;
}
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
                        <button
                            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            ⚙️ 대회 운영 설정
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'grouping' ? 'active' : ''}`}
                            onClick={() => setActiveTab('grouping')}
                        >
                            👥 조 편성
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
                                        <label>조(Group) 개수</label>
                                        <input
                                            type="number"
                                            className="modern-input"
                                            value={numGroups}
                                            onChange={(e) => setNumGroups(Number(e.target.value))}
                                        />
                                        <p className="field-hint">전체 참가팀을 나눌 조의 개수입니다.</p>
                                    </div>
                                    <div className="input-group" style={{ marginTop: '1.5rem' }}>
                                        <label>코트(Court) 개수</label>
                                        <input
                                            type="number"
                                            className="modern-input"
                                            value={numCourts}
                                            onChange={(e) => setNumCourts(Number(e.target.value))}
                                        />
                                        <p className="field-hint">운영할 테니스 코트의 총 개수입니다.</p>
                                    </div>

                                    <div className="info-box">
                                        <span>⚠️</span>
                                        <span>이 설정은 [대진표 생성] 시 적용됩니다.</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: GROUPING */}
                        {activeTab === 'grouping' && (
                            <div className="tab-content fade-in">
                                <div className="card-header">
                                    <h3><span className="icon-gap">👥</span> 참가자 명단</h3>
                                </div>
                                <div className="form-section">
                                    <label>참가 팀 입력 (한 줄에 한 팀)</label>
                                    <textarea
                                        className="modern-textarea"
                                        placeholder={"예시 1 (간편):\n홍길동/이순신\n김철수/박영희\n\n예시 2 (상세 - 띄어쓰기 구분):\n클럽명 1참가자 남 4.0 2참가자 여 3.0 7.0 1\n(클럽, 이름1, 성별, 점수, 이름2, 성별, 점수, 합계, 조)"}
                                        value={teamInput}
                                        onChange={(e) => setTeamInput(e.target.value)}
                                    />

                                    <div className="action-buttons">
                                        <button
                                            onClick={handleGenerate}
                                            disabled={isProcessing}
                                            className="modern-button primary"
                                        >
                                            ▶️ 대진표 생성 및 시작
                                        </button>

                                        <button
                                            onClick={handleReset}
                                            disabled={isProcessing}
                                            className="modern-button danger"
                                        >
                                            🗑️ 대회 초기화
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {statusMsg && <div className="status-message">{statusMsg}</div>}
                    </div>
                </div>

                {/* RIGHT COLUMN: MANAGEMENT */}
                <div className="right-col">
                    <div className="glass-card status-card">
                        <div className="card-header">
                            <h3><span className="icon-gap">✅</span> 현재 상태</h3>
                        </div>
                        <div className="stat-grid">
                            <div className="stat-item">
                                <span className="stat-label">진행 중</span>
                                <span className="stat-value live">{data.matches.filter(m => m.status === 'LIVE').length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">대기 중</span>
                                <span className="stat-value">{data.matches.filter(m => m.status === 'PENDING').length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">완료됨</span>
                                <span className="stat-value completed">{data.matches.filter(m => m.status === 'COMPLETED').length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card control-card">
                        <div className="card-header">
                            <h3><span className="icon-gap">⚡</span> 경기 배정</h3>
                        </div>
                        <p className="card-desc">
                            빈 코트가 생기면 대기 중인 경기를 자동으로 배정합니다.
                        </p>
                        <button
                            onClick={handleAutoAssign}
                            disabled={isProcessing}
                            className="modern-button secondary full-width"
                        >
                            ⚡ 코트 자동 배정 (수동 실행)
                        </button>
                    </div>

                    <div className="glass-card help-card">
                        <div className="card-header">
                            <h3><span className="icon-gap">ℹ️</span> 관리자 가이드</h3>
                        </div>
                        <ul className="help-list">
                            <li>• <strong>[대회 운영 설정]</strong>에서 코트/조 개수를 정합니다.</li>
                            <li>• <strong>[조 편성]</strong>에서 명단을 넣고 [생성]을 누르세요.</li>
                            <li>• 대회가 진행되면 <strong>[자동 배정]</strong>을 적극 활용하세요.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
    .dashboard-container {
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
}
                .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
                .dashboard-header h2 {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: white; /* Header is white for contrast */
    margin: 0;
}
                .status-badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

                .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
}

@media(max-width: 768px) {
                    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
                
                /* --- TAB STYLES --- */
                .tab-navigation {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
}
                .tab-btn {
    padding: 0.8rem 1.2rem;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    color: #888;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.2s ease;
}
                .tab-btn:hover {
    background: rgba(255,255,255,0.05);
    color: white;
}
                .tab-btn.active {
    background: var(--tennis-yellow);
    color: black;
    border-color: var(--tennis-yellow);
    box-shadow: 0 0 15px rgba(213, 255, 0, 0.3);
}
                
                .field-hint {
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
}
                .info-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 2rem;
    color: #aaa;
    font-size: 0.9rem;
}
                
                .fade-in {
    animation: fadeIn 0.3s ease;
}


                .glass-card {
    background: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
                
                .card-header {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 0.5rem;
}
                .card-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--tennis-yellow);
    display: flex;
    align-items: center;
}

                .modern-input, .modern-textarea {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.8rem;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s;
    box-sizing: border-box; /* Fix width overlap */
}
                .modern-input:focus, .modern-textarea:focus {
    outline: none;
    border-color: var(--tennis-yellow);
    background: rgba(0, 0, 0, 0.5);
}
                .modern-textarea {
    min-height: 200px;
    line-height: 1.5;
    resize: vertical;
}

                .input-row {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}
                .input-group {
    flex: 1;
}
                .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #aaa;
    font-size: 0.9rem;
}

                .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}
                
                .modern-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
}
                .modern-button:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
}
                .modern-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
                
                .primary {
    background: var(--tennis-yellow);
    color: black;
    flex: 2;
}
                .secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}
                .danger {
    background: rgba(255, 68, 68, 0.2);
    color: #ff4444;
    border: 1px solid #ff4444;
    flex: 1;
}

                .full-width {
    width: 100%;
}

                .icon-gap {
    margin-right: 8px;
}

                .stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    text-align: center;
}
                .stat-item {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem 0.5rem;
    border-radius: 8px;
}
                .stat-label {
    display: block;
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 5px;
}
                .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}
                .stat-value.live { color: #ff4444; }
                .stat-value.completed { color: #4caf50; }

                .card-desc {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

                .help-list {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.6;
}
                
                .status-message {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(213, 255, 0, 0.1);
    color: var(--tennis-yellow);
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
}
`}</style>
        </div>
    );
};

export default AdminDashboardNew;
