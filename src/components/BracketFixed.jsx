import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import KnockoutTree from './KnockoutTree';

const BracketFixed = ({ matches, teams, courts, isAdmin, numCourts, activeTab }) => {
    const rounds = [
        { id: '본선 32강', label: '32강' },
        { id: '본선 16강', label: '16강' },
        { id: '8강', label: '8강' },
        { id: '4강', label: '4강' },
        { id: '결승', label: '결승' }
    ];

    const getTeam = (id) => teams.find(t => t.id === id) || { id: 'TBD', name: 'TBD', player1: '', player2: '' };

    // Helper to identify group stage vs knockout
    const isGroupStageMatch = (m) => {
        if (!m || !m.group_id) return false;
        const g = m.group_id.toString();
        // Knockout groups contain '강' or '결승'
        if (g.includes('강') || g.includes('결승')) return false;
        return !isNaN(parseInt(g));
    };

    // Group Matches 
    const groupMatches = matches.filter(m => isGroupStageMatch(m));

    const hasKnockout = matches.some(m => !isGroupStageMatch(m));

    // Determine active match for each court
    const getMatchForCourt = (courtId) => {
        if (!courts) return null;
        const court = courts.find(c => c.id === courtId);
        if (!court || !court.match_id) return null;
        return matches.find(m => m.id === court.match_id);
    };

    // Tab Navigation: Always show group and all bracket tabs
    let availableTabs = [];
    if (matches && matches.length > 0) {
        if (matches.some(m => !isNaN(parseInt(m.group_id)))) availableTabs.push({ id: 'group', label: '예선 조별리그' });
    }

    // Always show the knockout bracket tabs (even before group stage finishes)
    // KnockoutTree will render seeded dummy matches when real matches don't exist yet
    const koMatches = matches.filter(m => !isGroupStageMatch(m));
    if (matches.length > 0) {
        availableTabs.push({ id: 'all', label: '전체' });
        availableTabs.push({ id: '32강', label: '32강' });
        availableTabs.push({ id: '16강', label: '16강' });
        availableTabs.push({ id: '8강', label: '8강' });
        availableTabs.push({ id: '4강', label: '4강' });
        availableTabs.push({ id: '결승', label: '결승' });
    }

    const [activeTabId, setActiveTabId] = useState('group');

    useEffect(() => {
        if (availableTabs.length > 0 && !availableTabs.find(t => t.id === activeTabId)) {
            // Default to the first available tab if current is invalid
            setActiveTabId(availableTabs[0].id);
        } else if (availableTabs.length > 0 && activeTabId === 'group' && !availableTabs.find(t => t.id === 'group')) {
            setActiveTabId(availableTabs[0].id);
        } else if (availableTabs.length === 0) {
            setActiveTabId('group');
        }
    }, [matches, availableTabs, activeTabId]);

    return (
        <div className="bracket-wrapper">
            {/* --- LIVE COURT GRID --- */}
            {activeTab === 'live' && (
                <div className="court-grid-section">
                    <h3 className="section-title">🎾 실시간 코트 현황 (Live Courts)</h3>
                    <div className="court-grid">
                        {Array.from({ length: numCourts || 10 }, (_, i) => {
                            const courtId = i + 1;
                            const court = (courts || []).find(c => c.id === courtId) || { id: courtId, match_id: null };
                            const match = getMatchForCourt(court.id);
                            const teamA = match ? getTeam(match.team_a_id) : null;
                            const teamB = match ? getTeam(match.team_b_id) : null;

                            return (() => {
                                const isLive = match?.status === 'LIVE';
                                const isCompleted = match?.status === 'COMPLETED';

                                // Build Match Sequence Label (e.g., "1조 1경기" or "본선 32강 2경기")
                                let stageLabel = '';
                                if (match) {
                                    const isGroupNumeric = typeof match.group_id === 'number' || /^\d+$/.test(String(match.group_id));
                                    const baseStageName = isGroupNumeric ? `${match.group_id}조` : match.group_id;

                                    let matchSeq = '';
                                    const parsedId = match.id?.match(/_m(\d+)$/);
                                    if (parsedId) {
                                        matchSeq = `${parsedId[1]}경기`;
                                    }

                                    stageLabel = matchSeq ? `${baseStageName} ${matchSeq}` : baseStageName;
                                }

                                // Is tiebreak (knockout 5:5)
                                const isGroupMatch = match && (typeof match.group_id === 'number' || (typeof match.group_id === 'string' && match.group_id.includes('조')) || /^\d+$/.test(String(match.group_id)));
                                const isKnockoutTb = match && isLive &&
                                    (match.score_a === 5 && match.score_b === 5) &&
                                    !isGroupMatch;

                                const winnerName = isCompleted && match?.winner_id
                                    ? (match.winner_id === match.team_a_id ? teamA?.name : teamB?.name)
                                    : null;

                                return (
                                    <div key={court.id} className={`court-card ${match ? (isLive ? 'active live' : isCompleted ? 'active done' : 'active') : 'empty'}`}>
                                        <div className="court-header">
                                            Court {court.id}
                                            {isLive && <span className="court-status-live"> ● 진행중</span>}
                                            {isCompleted && <span className="court-status-done"> 종료</span>}
                                        </div>
                                        {match ? (
                                            <div className="court-match-info">
                                                <div className="court-team">
                                                    <span className={`team-name ${isCompleted && match.winner_id === match.team_a_id ? 'team-winner' : ''}`}>{teamA?.name}</span>
                                                    <span className={`team-score ${isCompleted && match.winner_id === match.team_a_id ? 'score-winner' : ''}`}>{match.score_a ?? 0}</span>
                                                </div>
                                                <div className="court-team">
                                                    <span className={`team-name ${isCompleted && match.winner_id === match.team_b_id ? 'team-winner' : ''}`}>{teamB?.name}</span>
                                                    <span className={`team-score ${isCompleted && match.winner_id === match.team_b_id ? 'score-winner' : ''}`}>{match.score_b ?? 0}</span>
                                                </div>

                                                {/* Tiebreak live indicator */}
                                                {isKnockoutTb && (
                                                    <div className="court-tb-badge">🎾 타이브레이크 진행 중</div>
                                                )}

                                                {/* Tiebreak result */}
                                                {isCompleted && match.tb_score_a != null && match.tb_score_b != null && (
                                                    <div className="court-tb-result">
                                                        🎾 TB {match.tb_score_a}:{match.tb_score_b}
                                                        {winnerName && <span className="tb-win-name"> · {winnerName} 승</span>}
                                                    </div>
                                                )}

                                                <div className="match-status-badge">{stageLabel}</div>
                                            </div>
                                        ) : (
                                            <div className="court-empty-state">빈 코트</div>
                                        )}
                                    </div>
                                );
                            })();
                        })}
                    </div>
                </div>
            )}

            {/* --- BRACKET TABS & CONTAINER --- */}
            {activeTab === 'match' && (
                <>
                    {availableTabs.length > 0 && (
                        <div className="bracket-tabs">
                            {availableTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`bracket-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTabId(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="bracket-container">
                        {activeTabId !== 'group' && (
                            <KnockoutTree matches={matches} teams={teams} isAdmin={isAdmin} rounds={rounds} activeTabId={activeTabId} />
                        )}
                        {activeTabId === 'group' && groupMatches.length > 0 && (
                            <div className="bracket-round" style={{ minWidth: '100%', padding: '0 1rem' }}>
                                <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>예선 조별리그 (GROUP STAGE)</h3>
                                <div className="group-stage-grid">
                                    {Array.from(new Set(groupMatches.map(m => m.group_id)))
                                        .sort((a, b) => parseInt(String(a).replace(/[^0-9]/g, '') || 0) - parseInt(String(b).replace(/[^0-9]/g, '') || 0))
                                        .map(groupId => (
                                            <div key={groupId} className="group-column">
                                                <h4 className="group-column-title">{groupId}조 매치 리스트</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {groupMatches.filter(m => m.group_id === groupId).map(match => (
                                                        <MatchCard
                                                            key={match.id}
                                                            match={match}
                                                            teamA={getTeam(match.team_a_id)}
                                                            teamB={getTeam(match.team_b_id)}
                                                            isAdmin={false}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

            <style>{`
        .bracket-wrapper {
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        /* --- COURT GRID STYLES --- */
        .court-grid-section {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .section-title {
            color: var(--tennis-yellow);
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .court-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1rem;
        }
        @media (max-width: 1200px) { .court-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .court-grid { grid-template-columns: repeat(2, 1fr); } }

        .court-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .court-card.active {
            border-color: var(--tennis-green);
            background: linear-gradient(135deg, rgba(0, 78, 50, 0.4) 0%, rgba(0,0,0,0) 100%);
        }
        .court-card.empty {
            opacity: 0.5;
        }
        
        .court-header {
            font-size: 0.8rem;
            color: #aaa;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
        }
        
        .court-match-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .court-team {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.95rem;
        }
        .team-name { color: white; font-weight: 500; }
        .team-score { 
            font-weight: bold; 
            font-size: 1.1rem; 
            color: var(--tennis-yellow);
            background: rgba(0,0,0,0.3);
            padding: 2px 8px;
            border-radius: 4px;
            min-width: 24px;
            text-align: center;
        }
        
        @media (max-width: 480px) {
            .court-grid-section {
                padding: 1rem;
            }
            .section-title {
                font-size: 1.1rem;
                justify-content: center;
                margin-bottom: 1rem;
            }
            .court-card {
                padding: 0.8rem 0.5rem;
            }
            .court-header {
                font-size: 0.75rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            .court-team {
                font-size: 0.8rem;
                flex-direction: column;
                gap: 5px;
            }
            .team-name {
                font-size: 0.85rem;
                text-align: center;
                line-height: 1.2;
            }
            .team-score {
                font-size: 1rem;
                padding: 2px 12px;
            }
        }
        
        .vs-divider {
            text-align: center;
            font-size: 0.7rem;
            color: #666;
            margin: -4px 0;
            display: none; /* Minimalist style */
        }
        
        .match-status-badge {
            margin-top: 0.5rem;
            font-size: 0.72rem;
            text-align: center;
            background: rgba(255,255,255,0.07);
            padding: 3px 6px;
            border-radius: 4px;
            color: #999;
            font-weight: 500;
        }

        /* Court status labels */
        .court-status-live {
            color: var(--tennis-yellow);
            font-weight: 800;
            animation: pulse 1.5s infinite;
        }
        .court-status-done {
            color: #888;
            font-weight: 600;
        }

        /* Winner highlight */
        .team-winner { color: var(--tennis-yellow) !important; font-weight: 700 !important; }
        .score-winner { color: var(--tennis-yellow) !important; }

        /* Tiebreak badges */
        .court-tb-badge {
            font-size: 0.72rem;
            color: #88bbff;
            background: rgba(85,153,255,0.12);
            border: 1px solid rgba(85,153,255,0.3);
            border-radius: 6px;
            padding: 3px 8px;
            text-align: center;
            animation: pulse 1.5s infinite;
        }
        .court-tb-result {
            font-size: 0.72rem;
            color: #88bbff;
            background: rgba(85,153,255,0.1);
            border: 1px solid rgba(85,153,255,0.25);
            border-radius: 6px;
            padding: 3px 8px;
            text-align: center;
        }
        .tb-win-name { color: var(--tennis-yellow); font-weight: 700; }

        /* Live court glow */
        .court-card.live { border-color: var(--tennis-yellow); box-shadow: 0 0 12px rgba(213,255,0,0.15); }
        .court-card.done { border-color: #444; opacity: 0.85; }
        
        .court-empty-state {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            font-style: italic;
        }


        /* --- BRACKET TABS STYLES --- */
        .bracket-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .bracket-tab-btn {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ccc;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .bracket-tab-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
        .bracket-tab-btn.active {
            background: var(--tennis-yellow);
            color: black;
            border-color: var(--tennis-yellow);
            box-shadow: 0 0 10px rgba(213, 255, 0, 0.2);
        }

        /* --- KNOCKOUT GRID --- */
        .knockout-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }

        /* --- EXISTING STYLES --- */
        .bracket-container {
          display: flex;
          gap: 2rem;
          padding-bottom: 2rem;
          overflow-x: auto; /* Allow scrolling if too wide */
        }
        
        .bracket-round {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 280px;
          flex: 1;
        }

        .round-title {
          color: var(--tennis-yellow);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          border-bottom: 2px solid rgba(255,255,255,0.1);
          padding-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
        }
                /* Group Stage Grid */
                .group-stage-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }
                .group-column {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .group-column-title {
                    color: var(--tennis-yellow);
                    margin-top: 0;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                    text-align: center;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
                    padding-bottom: 0.5rem;
                }

        /* Mobile Styles */
        @media (max-width: 1024px) {
          .bracket-container {
            flex-direction: column;
          }
          .bracket-round {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
        </div>
    );
};

export default BracketFixed;
