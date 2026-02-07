import React from 'react';
import MatchCard from './MatchCard';

const Bracket = ({ matches, teams, isAdmin }) => {
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

  return (
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
  );
};

export default Bracket;
