import React from 'react';
import { updateMatch, updateCourt, uploadData } from '../services/firebase';
import { updateTournamentProgression, FIXED_BRACKET_LAYOUT } from '../utils/tournamentLogic';

const MatchCard = ({ match, teamA, teamB, isAdmin, allMatches }) => {
  const isCompleted = match.status === 'COMPLETED';
  const isLive = match.status === 'LIVE';
  const isPending = match.status === 'PENDING' || match.status === 'SCHEDULED';

  const getScoreStyle = (isWinner) => ({
    color: isWinner ? 'var(--tennis-yellow)' : '#fff',
    fontSize: isWinner ? '1.5rem' : '1.2rem',
    fontWeight: '800',
    opacity: isWinner ? 1 : 0.7
  });

  const winnerId = match.winner_id;

  const getRankLabel = (team, isTeamA) => {
    // If it's a 32-강 match, we can show the designated seed even if it's still TBD
    if (match.id && match.id.startsWith('ko32_m')) {
      const matchNumMatch = match.id.match(/^ko32_m(\d+)$/);
      if (matchNumMatch) {
        const mIdx = parseInt(matchNumMatch[1], 10) - 1;
        if (FIXED_BRACKET_LAYOUT[mIdx]) {
          const def = isTeamA ? FIXED_BRACKET_LAYOUT[mIdx].a : FIXED_BRACKET_LAYOUT[mIdx].b;
          
          // If we have a real team, check if it's the wildcard slot
          if (team && team.id !== 'TBD' && team.id !== 'BYE' && def.g === 'W') {
             const originGroup = team.initial_group ? String(team.initial_group).replace(/조/g, '') : '?';
             const originRank = team.groupRank || '3';
             return `${originGroup}조 ${originRank}위`;
          }
          
          // Otherwise show the fixed definition (e.g. "1조 1위" or "9조 2위" or "3위(W)")
          const groupLabel = def.g === 'W' ? '3' : def.g;
          const rankLabel = def.g === 'W' ? '위(W)' : `${def.rank}위`;
          return `${groupLabel}조 ${rankLabel}`;
        }
      }
    }

    if (!team || team.id === 'BYE' || team.id === 'TBD') return null;

    if (team.groupRank && team.initial_group) {
      return `${String(team.initial_group).replace(/조/g, '')}조 ${team.groupRank}위`;
    }
    return null;
  };

  const isGroupStageMatch = (m) => typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes('조')) || /^\d+$/.test(String(m.group_id));
  const isKnockout = !isGroupStageMatch(match);

  const handleScore = async (team, delta) => {
    const field = team === 'A' ? 'score_a' : 'score_b';
    const newScore = Math.max(0, (match[field] || 0) + delta);
    await updateMatch(match.id, { [field]: newScore });
  };

  const handleStatus = async (newStatus) => {
    let updates = { status: newStatus };
    let newWinnerId = null;

    if (newStatus === 'COMPLETED') {
        const scoreA = match.score_a || 0;
        const scoreB = match.score_b || 0;

        if (isKnockout && scoreA === scoreB) {
            alert('본선 토너먼트는 무승부가 없습니다. 승패(타이브레이크 결과 등)를 실시간 점수판에서 입력하시거나, 임의로 승자의 점수를 올려주세요.');
            return;
        }

        if (scoreA > scoreB) newWinnerId = match.team_a_id;
        else if (scoreB > scoreA) newWinnerId = match.team_b_id;

        updates.winner_id = newWinnerId;
        updates.court_id = null; // Important: The match must relinquish its grasp on the court ID.

      // Free the court if the match was assigned to one
      if (match.court_id) {
        try { await updateCourt(parseInt(match.court_id), { match_id: null }); } catch (e) { console.error('Error freeing court:', e); }
      }
    } else {
      updates.winner_id = null; // Reset winner if not completed
    }

    await updateMatch(match.id, updates);

    // If completed by admin and we have allMatches passed, trigger auto-advancement
    if (newStatus === 'COMPLETED' && newWinnerId && allMatches) {
      const tempMatches = allMatches.map(m => m.id === match.id ? { ...m, ...updates } : m);
      const nextMatches = updateTournamentProgression(tempMatches, match.id, newWinnerId);
      // Only upload if something actually changed to avoid unnecessary writes
      if (JSON.stringify(tempMatches) !== JSON.stringify(nextMatches)) {
        // We just need to update the entire matches array in FB
        // Rather than a full uploadData, doing it here is fine since uploadData takes { matches }
        // Let's create a minimal payload that won't break uploadData (it needs teams, groups etc normally)
        // Wait, uploadData loops over the provided keys. Let's just update the specific changed matches to be efficient, or just call uploadData with the matches array.
        // Actually, updating just the next match document is much safer here.

        const nextMatch = nextMatches.find(m => m.id === match.next_match_id);
        if (nextMatch) {
          await updateMatch(nextMatch.id, {
            team_a_id: nextMatch.team_a_id,
            team_b_id: nextMatch.team_b_id
          });
        }
      }
    }
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
          {isLive && <span className="live-badge">● 진행중</span>}
          {isCompleted && <span className="completed-badge">✓ 종료</span>}
          {isPending && !isLive && !isCompleted && <span className="pending-badge">대기중</span>}
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
        <div className="team-side" style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {isKnockout && getRankLabel(teamA, true) && (
            <div className="team-rank-box">{getRankLabel(teamA, true)}</div>
          )}
          <div className="team-info">
            <span className={`team-name ${winnerId === teamA.id ? 'winner' : ''}`}>
              {teamA.name}
            </span>
            {teamA.id !== 'TBD' && teamA.id !== 'BYE' && teamA.club && (
              <span className="team-club">
                {teamA.club}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {isAdmin && teamA.id !== 'TBD' && teamA.id !== 'BYE' && <button onClick={() => handleScore('A', -1)} style={adminBtnStyle}>-</button>}
          <div className="score" style={getScoreStyle(winnerId === teamA.id)}>
            {teamA.id === 'TBD' || teamA.id === 'BYE' ? '-' : match.score_a}
          </div>
          {isAdmin && teamA.id !== 'TBD' && teamA.id !== 'BYE' && <button onClick={() => handleScore('A', 1)} style={adminBtnStyle}>+</button>}
        </div>
      </div>

      <div className="divider"></div>

      <div className="team-row">
        <div className="team-side" style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          {isKnockout && getRankLabel(teamB, false) && (
            <div className="team-rank-box">{getRankLabel(teamB, false)}</div>
          )}
          <div className="team-info">
            <span className={`team-name ${winnerId === teamB.id ? 'winner' : ''}`}>
              {teamB.name}
            </span>
            {teamB.id !== 'TBD' && teamB.id !== 'BYE' && teamB.club && (
              <span className="team-club">
                {teamB.club}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {isAdmin && teamB.id !== 'TBD' && teamB.id !== 'BYE' && <button onClick={() => handleScore('B', -1)} style={adminBtnStyle}>-</button>}
          <div className="score" style={getScoreStyle(winnerId === teamB.id)}>
            {teamB.id === 'TBD' || teamB.id === 'BYE' ? '-' : match.score_b}
          </div>
          {isAdmin && teamB.id !== 'TBD' && teamB.id !== 'BYE' && <button onClick={() => handleScore('B', 1)} style={adminBtnStyle}>+</button>}
        </div>
      </div>

      {/* Live Tiebreak Indicator: knockout match LIVE at 5:5 */}
      {isLive && match.score_a === 5 && match.score_b === 5 &&
        typeof match.group_id === 'string' && !/^\d+조$/.test(match.group_id) && (
          <div className="tb-row tb-live">
            <span className="tb-label">🎾 TB</span>
            <span style={{ color: '#88ddff', fontSize: '0.88rem', fontWeight: '700' }}>타이브레이크 진행 중...</span>
          </div>
        )}

      {/* Completed Tiebreak Result */}
      {isCompleted && match.tb_score_a !== undefined && match.tb_score_a !== null &&
        match.tb_score_b !== undefined && match.tb_score_b !== null && (
          <div className="tb-row">
            <span className="tb-label">🎾 TB</span>
            <span className="tb-scores">
              <span style={{ color: winnerId === (match.team_a_id) ? 'var(--tennis-yellow)' : '#aaa', fontWeight: winnerId === match.team_a_id ? '800' : '400' }}>
                {match.tb_score_a}
              </span>
              <span style={{ color: '#555', margin: '0 4px' }}>:</span>
              <span style={{ color: winnerId === (match.team_b_id) ? 'var(--tennis-yellow)' : '#aaa', fontWeight: winnerId === match.team_b_id ? '800' : '400' }}>
                {match.tb_score_b}
              </span>
            </span>
            <span className="tb-winner">
              {winnerId === match.team_a_id ? `${teamA.name} 승 🏆` : winnerId === match.team_b_id ? `${teamB.name} 승 🏆` : ''}
            </span>
          </div>
        )}

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
          background: rgba(213,255,0,0.12);
          padding: 2px 8px;
          border-radius: 50px;
          font-size: 0.78rem;
        }
        .completed-badge {
          color: #1de9b6;
          font-weight: 700;
          font-size: 0.78rem;
          background: rgba(29,233,182,0.13);
          padding: 2px 8px;
          border-radius: 50px;
          letter-spacing: 0.02em;
        }
        .pending-badge {
          color: #888;
          font-size: 0.78rem;
          background: rgba(255,255,255,0.06);
          padding: 2px 8px;
          border-radius: 50px;
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
        .team-club {
          font-size: 0.85rem;
          color: #99aabb;
          margin-top: 1px;
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
        .tb-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 6px 10px;
          background: rgba(85, 153, 255, 0.1);
          border: 1px solid rgba(85, 153, 255, 0.25);
          border-radius: 8px;
          font-size: 0.82rem;
        }
        .tb-label {
          color: #6699cc;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .tb-scores {
          font-size: 0.95rem;
          font-weight: 700;
        }
        .tb-winner {
          color: var(--tennis-yellow);
          font-weight: 700;
          font-size: 0.8rem;
          margin-left: auto;
        }
        .tb-live {
          background: rgba(85, 153, 255, 0.15);
          border-color: rgba(85, 153, 255, 0.4);
          animation: pulse-tb 1.5s infinite;
        }
        @keyframes pulse-tb {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .team-rank-box {
          font-size: 0.72rem;
          color: #111;
          background-color: #f2f2f2;
          padding: 3px 6px;
          border-radius: 4px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.5);
          letter-spacing: -0.2px;
        }
      `}</style>
    </div>
  );
};

export default MatchCard;
