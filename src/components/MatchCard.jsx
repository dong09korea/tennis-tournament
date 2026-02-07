import React from 'react';
import { updateMatch } from '../services/firebase';

const MatchCard = ({ match, teamA, teamB, isAdmin }) => {
  const isCompleted = match.status === 'COMPLETED';
  const isLive = match.status === 'LIVE';

  const getScoreStyle = (isWinner) => ({
    color: isWinner ? 'var(--tennis-yellow)' : '#fff',
    fontSize: isWinner ? '1.5rem' : '1.2rem',
    fontWeight: '800',
    opacity: isWinner ? 1 : 0.7
  });

  const winnerId = match.winner_id;

  const handleScore = async (team, delta) => {
    const field = team === 'A' ? 'score_a' : 'score_b';
    const newScore = Math.max(0, (match[field] || 0) + delta);
    await updateMatch(match.id, { [field]: newScore });
  };

  const handleStatus = async (newStatus) => {
    let updates = { status: newStatus };
    if (newStatus === 'COMPLETED') {
      // Simple logic: higher score wins
      const scoreA = match.score_a || 0;
      const scoreB = match.score_b || 0;
      if (scoreA > scoreB) updates.winner_id = match.team_a_id;
      else if (scoreB > scoreA) updates.winner_id = match.team_b_id;
    } else {
      updates.winner_id = null; // Reset winner if not completed
    }
    await updateMatch(match.id, updates);
  };

  const adminBtnStyle = {
    background: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className={`match-card ${isLive ? 'live' : ''} ${isCompleted ? 'completed' : ''}`}>
      <div className="card-header">
        <span className="match-info">{match.group_id} - R{match.round}</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {isLive && <span className="live-badge">● LIVE</span>}
          {isCompleted && <span className="completed-badge">종료</span>}
          {isAdmin && (
            <select
              value={match.status}
              onChange={(e) => handleStatus(e.target.value)}
              style={{ background: '#333', color: 'white', border: '1px solid #555', fontSize: '0.7rem', padding: '2px' }}
            >
              <option value="SCHEDULED">대기</option>
              <option value="LIVE">진행</option>
              <option value="COMPLETED">종료</option>
            </select>
          )}
        </div>
      </div>

      <div className="team-row">
        <div className="team-info">
          <span className={`team-name ${winnerId === teamA.id ? 'winner' : ''}`}>
            {teamA.name}
          </span>
          <span className="team-players">
            {teamA.player1}, {teamA.player2}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {isAdmin && <button onClick={() => handleScore('A', -1)} style={adminBtnStyle}>-</button>}
          <div className="score" style={getScoreStyle(winnerId === teamA.id)}>
            {match.score_a}
          </div>
          {isAdmin && <button onClick={() => handleScore('A', 1)} style={adminBtnStyle}>+</button>}
        </div>
      </div>

      <div className="divider"></div>

      <div className="team-row">
        <div className="team-info">
          <span className={`team-name ${winnerId === teamB.id ? 'winner' : ''}`}>
            {teamB.name}
          </span>
          <span className="team-players">
            {teamB.player1}, {teamB.player2}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {isAdmin && <button onClick={() => handleScore('B', -1)} style={adminBtnStyle}>-</button>}
          <div className="score" style={getScoreStyle(winnerId === teamB.id)}>
            {match.score_b}
          </div>
          {isAdmin && <button onClick={() => handleScore('B', 1)} style={adminBtnStyle}>+</button>}
        </div>
      </div>

      <style>{`
        .match-card {
          background: linear-gradient(145deg, #1a3c26 0%, #0d2615 100%);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 5px solid #444;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }
        .match-card.live {
          border-left-color: var(--tennis-yellow);
          box-shadow: 0 0 15px rgba(213,255,0,0.1);
        }
        .match-card.completed {
          border-left-color: var(--wimbledon-green); /* Completed matches subtle */
          opacity: 0.9;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          font-size: 0.8rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .live-badge {
          color: var(--tennis-yellow);
          font-weight: bold;
          animation: pulse 2s infinite;
        }
        .completed-badge {
          color: #888;
        }
        .team-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }
        .team-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
        }
        .team-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: #ddd;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .team-name.winner {
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }
        .team-players {
          font-size: 0.75rem;
          color: #666;
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 0.5rem 0;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MatchCard;
