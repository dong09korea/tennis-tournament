import React from 'react';
import MatchCard from './MatchCard';

const BracketFixed = ({ matches, teams, courts, isAdmin }) => {
    const rounds = [
        { id: '16강', label: 'Round of 16' },
        { id: '8강', label: 'Quarter Finals' },
        { id: '4강', label: 'Semi Finals' },
        { id: '결승', label: 'Final' }
    ];

    const getTeam = (id) => teams.find(t => t.id === id) || { name: 'TBD', player1: '', player2: '' };

    // Group Matches (1-8) - Filter for numeric or numeric-string group IDs
    const groupMatches = matches.filter(m => !isNaN(parseInt(m.group_id)));

    const hasKnockout = matches.some(m => ['16강', '8강', '4강', '결승'].includes(m.group_id));

    // Determine active match for each court
    const getMatchForCourt = (courtId) => {
        if (!courts) return null;
        const court = courts.find(c => c.id === courtId);
        if (!court || !court.match_id) return null;
        return matches.find(m => m.id === court.match_id);
    };

    return (
        <div className="bracket-wrapper">
            {/* --- LIVE COURT GRID --- */}
            {courts && (
                <div className="court-grid-section">
                    <h3 className="section-title">🎾 실시간 코트 현황 (Live Courts)</h3>
                    <div className="court-grid">
                        {courts.map(court => {
                            const match = getMatchForCourt(court.id);
                            const teamA = match ? getTeam(match.team_a_id) : null;
                            const teamB = match ? getTeam(match.team_b_id) : null;

                            return (
                                <div key={court.id} className={`court-card ${match ? 'active' : 'empty'}`}>
                                    <div className="court-header">Court {court.id}</div>
                                    {match ? (
                                        <div className="court-match-info">
                                            <div className="court-team">
                                                <span className="team-name">{teamA.name}</span>
                                                <span className="team-score">{match.score_a || 0}</span>
                                            </div>
                                            <div className="vs-divider">VS</div>
                                            <div className="court-team">
                                                <span className="team-name">{teamB.name}</span>
                                                <span className="team-score">{match.score_b || 0}</span>
                                            </div>
                                            <div className="match-status-badge">{match.group_id}조</div>
                                        </div>
                                    ) : (
                                        <div className="court-empty-state">빈 코트</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="bracket-container">
                {!hasKnockout && groupMatches.length > 0 && (
                    <div className="bracket-round">
                        <h3 className="round-title">예선 조별리그 (Group Stage)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {groupMatches.slice(0, 10).map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    teamA={getTeam(match.team_a_id)}
                                    teamB={getTeam(match.team_b_id)}
                                    isAdmin={isAdmin}
                                />
                            ))}
                            {groupMatches.length > 10 && <div style={{ textAlign: 'center', color: '#888' }}>... + {groupMatches.length - 10} more matches</div>}
                        </div>
                    </div>
                )}
                {rounds.map(round => {
                    const roundMatches = matches.filter(m => m.group_id === round.id);
                    if (roundMatches.length === 0) return null;

                    return (
                        <div key={round.id} className="bracket-round">
                            <h3 className="round-title">{round.label}</h3>
                            {roundMatches.map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    teamA={getTeam(match.team_a_id)}
                                    teamB={getTeam(match.team_b_id)}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>
                    );
                })}

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
        
        .vs-divider {
            text-align: center;
            font-size: 0.7rem;
            color: #666;
            margin: -4px 0;
            display: none; /* Minimalist style */
        }
        
        .match-status-badge {
            margin-top: 0.5rem;
            font-size: 0.75rem;
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 2px 0;
            border-radius: 4px;
            color: #ccc;
        }
        
        .court-empty-state {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            font-style: italic;
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
        </div>
    );
};

export default BracketFixed;
