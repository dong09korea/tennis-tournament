import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subscribeToData, updateMatch, updateCourt, uploadData } from '../services/firebase';
import { updateTournamentProgression } from '../utils/tournamentLogic';

const CourtScoreEntry = () => {
    const { courtId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scoreA, setScoreA] = useState('');
    const [scoreB, setScoreB] = useState('');
    // Tiebreak state (for knockout 5:5 situations)
    const [tbScoreA, setTbScoreA] = useState('');
    const [tbScoreB, setTbScoreB] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const isGroupStageMatch = (match) => {
        if (!match || match.group_id == null) return false;
        const g = match.group_id;
        return typeof g === 'number' || (typeof g === 'string' && g.includes('조')) || /^\d+$/.test(String(g));
    };

    // Clamp main score: group=max6, knockout=max6 (tiebreak handled separately)
    const clampMain = (val) => Math.max(0, Math.min(6, parseInt(val) || 0));
    // Clamp tiebreak score: max 10
    const clampTb = (val) => Math.max(0, Math.min(10, parseInt(val) || 0));

    const handleScoreChange = (field, rawValue) => {
        const isTb = field === 'tb_score_a' || field === 'tb_score_b';
        const strVal = rawValue === '' ? '' : String(isTb ? clampTb(rawValue) : clampMain(rawValue));

        // Update local state immediately
        if (field === 'score_a') setScoreA(strVal);
        else if (field === 'score_b') setScoreB(strVal);
        else if (field === 'tb_score_a') setTbScoreA(strVal);
        else if (field === 'tb_score_b') setTbScoreB(strVal);

        // Auto-sync to Firebase in the background
        if (currentMatch?.id) {
            const numVal = strVal === '' ? 0 : parseInt(strVal, 10);
            updateMatch(currentMatch.id, { [field]: numVal }).catch(e => console.error("Real-time sync failed", e));
        }
    };

    useEffect(() => {
        const unsubscribe = subscribeToData((fetchedData) => {
            setData(fetchedData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Derived state for the initialization effect
    const court = data?.courts?.find(c => c.id === parseInt(courtId));
    const currentMatch = data?.matches?.find(m => m.id === court?.match_id);

    // Initialize state from Firebase data if currently empty
    useEffect(() => {
        if (!currentMatch) return;
        if (scoreA === '' && currentMatch.score_a != null) setScoreA(String(currentMatch.score_a));
        if (scoreB === '' && currentMatch.score_b != null) setScoreB(String(currentMatch.score_b));
        if (tbScoreA === '' && currentMatch.tb_score_a != null) setTbScoreA(String(currentMatch.tb_score_a));
        if (tbScoreB === '' && currentMatch.tb_score_b != null) setTbScoreB(String(currentMatch.tb_score_b));
    }, [currentMatch, scoreA, scoreB, tbScoreA, tbScoreB]);

    if (loading) {
        return (
            <div className="mobile-container">
                <div className="loading-spinner">데이터 불러오는 중...</div>
            </div>
        );
    }

    if (!court) {
        return (
            <div className="mobile-container">
                <div className="error-card glass-panel">
                    <h2>❌ 오류</h2>
                    <p>{courtId}번 코트를 찾을 수 없습니다.</p>
                </div>
            </div>
        );
    }

    // Always allow scoring if a match is assigned to this court, even if its status reverted to PENDING
    if (!currentMatch || currentMatch.status === 'COMPLETED') {
        return (
            <div className="mobile-container">
                <div className="success-card glass-panel">
                    <h2>✅ 안내</h2>
                    <p>현재 {courtId}번 코트에서 진행 중인 경기가 없습니다.</p>
                    <p className="sub-text">대기 중이거나 준비 시간이 필요합니다.</p>
                </div>
            </div>
        );
    }

    const teamA = data?.teams?.find(t => t.id === currentMatch.team_a_id);
    const teamB = data?.teams?.find(t => t.id === currentMatch.team_b_id);

    const isGroupStage = isGroupStageMatch(currentMatch);
    const numA = parseInt(scoreA) || 0;
    const numB = parseInt(scoreB) || 0;

    // For knockout: 5:5 triggers tiebreak mode
    const isTiebreakMode = !isGroupStage && numA === 5 && numB === 5;
    // Group stage 5:5 = draw
    const isGroupDraw = isGroupStage && numA === 5 && numB === 5;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(parseInt(scoreA)) || isNaN(parseInt(scoreB))) {
            alert('두 팀의 점수를 모두 입력해주세요.');
            return;
        }

        // ----- Group stage rules -----
        if (isGroupStage) {
            if (numA > 6 || numB > 6) {
                alert('예선 점수는 최대 6점입니다.');
                return;
            }
            // 5:5 = draw for group stage
            const isDraw = numA === 5 && numB === 5;
            if (numA === numB && !isDraw) {
                alert('동점일 경우 승패를 확실히 입력해주세요. (단, 5:5는 무승부)');
                return;
            }
            const winnerId = isDraw ? null : (numA > numB ? teamA.id : teamB.id);
            const label = isDraw ? '5:5 무승부' : `[${numA > numB ? teamA.name : teamB.name}] 승`;
            if (!confirm(`${label}\n\n이 결과가 맞습니까?`)) return;

            setSubmitting(true);
            try {
                await updateMatch(currentMatch.id, { score_a: numA, score_b: numB, status: 'COMPLETED', winner_id: winnerId });
                await updateCourt(parseInt(courtId), { match_id: null }); // free the court
                alert('✅ 결과가 등록되었습니다. 수고하셨습니다!');
                navigate('/');
            } catch (err) {
                alert('오류: ' + err.message);
                setSubmitting(false);
            }
            return;
        }

        // ----- Knockout rules -----
        if (numA > 6 || numB > 6) {
            alert('본선 일반 점수는 최대 6점입니다.');
            return;
        }

        // Normal win (no tiebreak)
        if (numA !== numB) {
            const winnerId = numA > numB ? teamA.id : teamB.id;
            if (!confirm(`[${teamA.name}] ${numA} : ${numB} [${teamB.name}]\n\n이 결과가 맞습니까?`)) return;
            setSubmitting(true);
            try {
                // Update the current match
                const matchUpdates = { score_a: numA, score_b: numB, status: 'COMPLETED', winner_id: winnerId };
                await updateMatch(currentMatch.id, matchUpdates);

                // Auto-advance logic
                const tempMatches = data.matches.map(m => m.id === currentMatch.id ? { ...m, ...matchUpdates } : m);
                const nextMatches = updateTournamentProgression(tempMatches, currentMatch.id, winnerId);
                await uploadData({ ...data, matches: nextMatches });

                await updateCourt(parseInt(courtId), { match_id: null }); // free the court
                alert('✅ 결과가 등록되었습니다. 수고하셨습니다!');
                navigate('/');
            } catch (err) {
                alert('오류: ' + err.message);
                setSubmitting(false);
            }
            return;
        }

        // 5:5 → tiebreak required
        if (numA === 5 && numB === 5) {
            const ta = parseInt(tbScoreA);
            const tb = parseInt(tbScoreB);
            if (isNaN(ta) || isNaN(tb)) {
                alert('타이브레이크 점수를 입력해주세요.');
                return;
            }
            if (ta > 10 || tb > 10) {
                alert('타이브레이크 최대 점수는 10점입니다.');
                return;
            }
            if (ta === tb) {
                alert('타이브레이크에서는 동점이 없습니다. 승자를 확실히 입력해주세요.');
                return;
            }
            const winner = ta > tb ? ta : tb;
            const loser = ta > tb ? tb : ta;
            if (winner < 7) {
                alert('타이브레이크 승자는 최소 7점 이상이어야 합니다.');
                return;
            }
            if (loser === 10) {
                alert('10점에서는 반드시 승자가 결정되어야 합니다.');
                return;
            }

            const winnerId = ta > tb ? teamA.id : teamB.id;
            const winnerName = ta > tb ? teamA.name : teamB.name;
            if (!confirm(`5:5 타이브레이크 → ${ta}:${tb} [${winnerName}] 승\n\n이 결과가 맞습니까?`)) return;

            setSubmitting(true);
            try {
                const matchUpdates = {
                    score_a: numA,
                    score_b: numB,
                    tb_score_a: ta,
                    tb_score_b: tb,
                    status: 'COMPLETED',
                    winner_id: winnerId
                };
                await updateMatch(currentMatch.id, matchUpdates);

                // Auto-advance logic
                const tempMatches = data.matches.map(m => m.id === currentMatch.id ? { ...m, ...matchUpdates } : m);
                const nextMatches = updateTournamentProgression(tempMatches, currentMatch.id, winnerId);
                await uploadData({ ...data, matches: nextMatches });

                await updateCourt(parseInt(courtId), { match_id: null }); // free the court
                alert('✅ 타이브레이크 결과가 등록되었습니다. 수고하셨습니다!');
                navigate('/');
            } catch (err) {
                alert('오류: ' + err.message);
                setSubmitting(false);
            }
            return;
        }

        // Other equal scores in knockout (e.g. 0:0, 1:1...) not allowed
        alert('동점입니다. 승패를 확실히 입력해주세요.');
    };

    return (
        <div className="mobile-container">
            <div className="score-entry-card glass-panel">
                <div className="card-header">
                    <h2>🏆 {courtId}번 코트 경기 결과 입력</h2>
                    <span className="badge">진행 중</span>
                </div>

                <div className="match-info">
                    <p className="group-info">{currentMatch.group_id}</p>
                </div>

                <form onSubmit={handleSubmit} className="score-form">

                    {/* ── Main Score ── */}
                    <div className="section-label">
                        {isGroupStage ? '🎾 게임 점수 (최대 6점)' : '🎾 게임 점수 (최대 6점)'}
                    </div>
                    <div className="teams-grid">
                        <div className="team-col">
                            <div className="team-name">{teamA?.name}</div>
                            <div className="team-players">{teamA?.player1}, {teamA?.player2}</div>
                            <input
                                type="number"
                                className="score-input modern-input"
                                placeholder="0"
                                value={scoreA}
                                onChange={(e) => handleScoreChange('score_a', e.target.value)}
                                min="0" max="6" required
                            />
                        </div>
                        <div className="vs-divider">VS</div>
                        <div className="team-col">
                            <div className="team-name">{teamB?.name}</div>
                            <div className="team-players">{teamB?.player1}, {teamB?.player2}</div>
                            <input
                                type="number"
                                className="score-input modern-input"
                                placeholder="0"
                                value={scoreB}
                                onChange={(e) => handleScoreChange('score_b', e.target.value)}
                                min="0" max="6" required
                            />
                        </div>
                    </div>

                    {/* ── Group Stage Draw Notice ── */}
                    {isGroupDraw && (
                        <div className="notice notice-draw">
                            🤝 5:5 → <strong>무승부 (예선 규정)</strong>
                        </div>
                    )}

                    {/* ── Knockout Tiebreak Section ── */}
                    {isTiebreakMode && (
                        <div className="tiebreak-section">
                            <div className="tb-header">
                                🎾 5:5 → <strong>타이브레이크</strong>
                                <span className="tb-rule">7점 선승 · 최대 10점</span>
                            </div>
                            <div className="teams-grid">
                                <div className="team-col">
                                    <div className="team-name-sm">{teamA?.name}</div>
                                    <input
                                        type="number"
                                        className="score-input score-input-tb modern-input"
                                        placeholder="0"
                                        value={tbScoreA}
                                        onChange={(e) => handleScoreChange('tb_score_a', e.target.value)}
                                        min="0" max="10"
                                    />
                                </div>
                                <div className="vs-divider">TB</div>
                                <div className="team-col">
                                    <div className="team-name-sm">{teamB?.name}</div>
                                    <input
                                        type="number"
                                        className="score-input score-input-tb modern-input"
                                        placeholder="0"
                                        value={tbScoreB}
                                        onChange={(e) => handleScoreChange('tb_score_b', e.target.value)}
                                        min="0" max="10"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Hint ── */}
                    <div className="score-hint">
                        {isGroupStage
                            ? '⚠️ 예선: 0~6점 | 5:5 = 무승부'
                            : '⚠️ 본선: 0~6점 | 5:5이면 타이브레이크 입력'}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`submit-btn modern-button primary ${submitting ? 'loading' : ''}`}
                    >
                        {submitting ? '등록 중...' : '결과 등록 및 완료'}
                    </button>
                    <p className="instruction-text">점수를 입력하고 등록하면 해당 경기가 종료됩니다.</p>
                </form>
            </div>

            <style>{`
                .mobile-container {
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .glass-panel {
                    background: rgba(30, 30, 30, 0.85);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    width: 100%;
                    padding: 2rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    text-align: center;
                }
                .card-header h2 {
                    color: var(--tennis-yellow);
                    margin: 0 0 10px 0;
                    font-size: 1.4rem;
                }
                .badge {
                    background: rgba(213, 255, 0, 0.15);
                    color: var(--tennis-yellow);
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: bold;
                    display: inline-block;
                    margin-bottom: 16px;
                }
                .group-info {
                    color: #aaa;
                    font-size: 0.95rem;
                    margin-bottom: 20px;
                }
                .section-label {
                    font-size: 0.82rem;
                    color: #888;
                    margin-bottom: 12px;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                }
                .teams-grid {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 12px;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .team-col {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                .vs-divider {
                    font-weight: 900;
                    color: #555;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .team-name {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: white;
                    word-break: break-word;
                }
                .team-name-sm {
                    font-size: 0.85rem;
                    font-weight: bold;
                    color: #ccc;
                    word-break: break-word;
                }
                .team-players {
                    font-size: 0.8rem;
                    color: #888;
                }
                .score-input {
                    width: 80px;
                    height: 80px;
                    font-size: 2.5rem !important;
                    text-align: center;
                    font-weight: bold;
                    color: var(--tennis-yellow) !important;
                    border-radius: 15px !important;
                    background: rgba(0,0,0,0.5) !important;
                }
                .score-input-tb {
                    width: 70px !important;
                    height: 70px !important;
                    font-size: 2rem !important;
                    color: #88ddff !important;
                }
                .score-input::-webkit-outer-spin-button,
                .score-input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }

                /* Tiebreak section */
                .tiebreak-section {
                    background: rgba(85, 153, 255, 0.08);
                    border: 1px solid rgba(85, 153, 255, 0.3);
                    border-radius: 14px;
                    padding: 1rem;
                    margin-bottom: 16px;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .tb-header {
                    color: #88bbff;
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .tb-rule {
                    font-size: 0.78rem;
                    color: #6699cc;
                    background: rgba(85,153,255,0.15);
                    padding: 2px 8px;
                    border-radius: 8px;
                }

                /* Notice banners */
                .notice {
                    border-radius: 10px;
                    padding: 10px 16px;
                    margin-bottom: 14px;
                    font-size: 0.95rem;
                }
                .notice-draw {
                    background: rgba(85, 153, 255, 0.12);
                    border: 1px solid rgba(85, 153, 255, 0.4);
                    color: #88aaff;
                }

                /* Hint */
                .score-hint {
                    font-size: 0.8rem;
                    color: #777;
                    margin-bottom: 18px;
                    padding: 7px 10px;
                    background: rgba(255,255,255,0.03);
                    border-radius: 8px;
                }

                .submit-btn {
                    width: 100%;
                    padding: 1.2rem !important;
                    font-size: 1.2rem !important;
                    border-radius: 12px !important;
                    box-shadow: 0 4px 15px rgba(213, 255, 0, 0.3);
                }
                .instruction-text {
                    margin-top: 15px;
                    font-size: 0.82rem;
                    color: #999;
                }
                .error-card h2 { color: #ff4444; }
                .success-card h2 { color: var(--tennis-yellow); }
                .sub-text { font-size: 0.9rem; color: #888; margin-top: 10px; }

                /* Mobile Optimizations */
                @media (max-width: 500px) {
                    .mobile-container {
                        padding: 5px;
                        min-height: calc(100vh - 2rem);
                    }
                    .glass-panel {
                        padding: 1.5rem 1rem;
                        border-radius: 15px;
                    }
                    .score-input {
                        width: 70px;
                        height: 70px;
                        font-size: 2rem !important;
                    }
                    .score-input-tb {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 1.5rem !important;
                    }
                    .team-name {
                        font-size: 1rem;
                    }
                    .card-header h2 {
                        font-size: 1.2rem;
                        margin-bottom: 5px;
                    }
                    .teams-grid {
                        gap: 8px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CourtScoreEntry;
