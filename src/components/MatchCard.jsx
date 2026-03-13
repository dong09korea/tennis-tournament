import React, { useState } from 'react';
import { updateMatch, updateCourt, uploadData } from '../services/firebase';
import { updateTournamentProgression, FIXED_BRACKET_LAYOUT } from '../utils/tournamentLogic';

const isManualRound = (groupId) =>
    typeof groupId === 'string' &&
    !groupId.includes('조') &&
    !/^\d+$/.test(groupId); // 본선 토너먼트는 모두 수동 배정

const MatchCard = ({ match, teamA, teamB, isAdmin, allMatches, courts }) => {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editScoreA, setEditScoreA] = useState('');
  const [editScoreB, setEditScoreB] = useState('');
  const [saving, setSaving] = useState(false);
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
             const originGroup = team.initial_group ? String(team.initial_group).replace(/조/g, '') : (team.group_id ? String(team.group_id).replace(/조/g, '') : '');
             const originRank = team.groupRank || '3';
             return `${originGroup}조 ${originRank}위`;
          }
          
          // Otherwise show the fixed definition from FIXED_BRACKET_LAYOUT
          if (def.g === 'W') {
              return '조 3위';
          }
          return `${def.g}조 ${def.rank}위`;
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
    const scoreA = team === 'A' ? Math.max(0, (match.score_a || 0) + delta) : (match.score_a || 0);
    const scoreB = team === 'B' ? Math.max(0, (match.score_b || 0) + delta) : (match.score_b || 0);

    let updates = { [field]: team === 'A' ? scoreA : scoreB };
    let newWinnerId = null;

    if (isCompleted) {
        if (scoreA > scoreB) newWinnerId = match.team_a_id;
        else if (scoreB > scoreA) newWinnerId = match.team_b_id;
        updates.winner_id = newWinnerId;
    }

    await updateMatch(match.id, updates);

    // If completed, trigger immediate progression update for better UX (Self-healing in App.jsx will also catch this)
    if (isCompleted && allMatches) {
        const nextMatchObj = allMatches.find(m => m.id === match.next_match_id);
        if (nextMatchObj) {
            const val = newWinnerId || 'TBD';
            await updateMatch(nextMatchObj.id, {
                [match.is_team_a_next ? 'team_a_id' : 'team_b_id']: val
            });
        }
    }
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
      if ((newStatus === 'PENDING' || newStatus === 'SCHEDULED') && match.court_id) {
          updates.court_id = null;
          try { await updateCourt(parseInt(match.court_id), { match_id: null }); } catch (e) { console.error('Error freeing court:', e); }
      }
    }

    await updateMatch(match.id, updates);

    // If status changed, handle progression
    if (allMatches && match.next_match_id) {
        const nextMatchObj = allMatches.find(nm => nm.id === match.next_match_id);
        if (nextMatchObj) {
            const val = newWinnerId || 'TBD';
            await updateMatch(nextMatchObj.id, {
                [match.is_team_a_next ? 'team_a_id' : 'team_b_id']: val
            });
        }
    }
  };

  // ── 되돌리기: COMPLETED → PENDING, 다음 라운드 슬롯도 TBD로 ──────────────
  const handleRevert = async () => {
    const label = `[${teamA.name}] vs [${teamB.name}]`;
    if (!confirm(`${match.group_id} 경기 결과를 되돌리시겠습니까?\n${label}\n\n점수와 승자가 초기화되고, 다음 라운드 슬롯도 TBD로 돌아갑니다.`)) return;
    setSaving(true);
    try {
      await updateMatch(match.id, {
        status: 'PENDING',
        score_a: null, score_b: null,
        tb_score_a: null, tb_score_b: null,
        winner_id: null, court_id: null
      });
      if (match.court_id) {
        try { await updateCourt(parseInt(match.court_id), { match_id: null }); } catch (_) {}
      }
      if (allMatches && match.next_match_id) {
        const nextM = allMatches.find(m => m.id === match.next_match_id);
        if (nextM) {
          await updateMatch(nextM.id, {
            [match.is_team_a_next ? 'team_a_id' : 'team_b_id']: 'TBD'
          });
        }
      }
    } catch (e) { alert('오류: ' + e.message); }
    finally { setSaving(false); }
  };

  // ── 결과 수정: 점수 재입력 후 저장 ──────────────────────────────────────────
  const handleEditOpen = () => {
    setEditScoreA(match.score_a != null ? String(match.score_a) : '');
    setEditScoreB(match.score_b != null ? String(match.score_b) : '');
    setEditMode(true);
  };

  const handleEditSave = async () => {
    const sa = parseInt(editScoreA);
    const sb = parseInt(editScoreB);
    if (isNaN(sa) || isNaN(sb)) { alert('점수를 올바르게 입력해주세요.'); return; }
    if (isKnockout && sa === sb) { alert('본선 경기는 동점이 없습니다. 승자를 명확히 입력해주세요.'); return; }

    const prevWinnerId = match.winner_id;
    const newWinnerId = sa > sb ? match.team_a_id : (sb > sa ? match.team_b_id : null);

    if (!confirm(`[${teamA.name}] ${sa} : ${sb} [${teamB.name}]\n\n이 결과로 수정하시겠습니까?`)) return;
    setSaving(true);
    try {
      await updateMatch(match.id, { score_a: sa, score_b: sb, winner_id: newWinnerId });
      if (allMatches && match.next_match_id && newWinnerId !== prevWinnerId) {
        const nextM = allMatches.find(m => m.id === match.next_match_id);
        if (nextM) {
          await updateMatch(nextM.id, {
            [match.is_team_a_next ? 'team_a_id' : 'team_b_id']: newWinnerId || 'TBD'
          });
        }
      }
      setEditMode(false);
    } catch (e) { alert('오류: ' + e.message); }
    finally { setSaving(false); }
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

  const handleCourtAssign = async () => {
    if (!selectedCourt) { alert('코트 번호를 선택해주세요.'); return; }
    const courtNum = parseInt(selectedCourt);
    if (!confirm(`${match.group_id} 경기를 ${courtNum}번 코트에 배정하고 시작하시겠습니까?`)) return;
    setAssigning(true);
    try {
      // Free the old court if any
      if (match.court_id && match.court_id !== courtNum) {
        await updateCourt(parseInt(match.court_id), { match_id: null });
      }
      await updateMatch(match.id, { status: 'LIVE', court_id: courtNum });
      await updateCourt(courtNum, { match_id: match.id });
      setSelectedCourt('');
    } catch (e) {
      alert('오류: ' + e.message);
    } finally {
      setAssigning(false);
    }
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

      {/* 수동 코트 배정 UI: 16강 이후 PENDING + 관리자 모드 */}
      {isAdmin && isPending && !isLive && isManualRound(match.group_id) &&
        teamA.id !== 'TBD' && teamA.id !== 'BYE' &&
        teamB.id !== 'TBD' && teamB.id !== 'BYE' && (
        <div style={{
          marginTop: '10px',
          padding: '10px 12px',
          background: 'rgba(29,233,182,0.07)',
          border: '1px solid rgba(29,233,182,0.25)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: '#1de9b6', fontSize: '0.8rem', fontWeight: 700 }}>🎾 코트 배정</span>
          <select
            value={selectedCourt}
            onChange={e => setSelectedCourt(e.target.value)}
            style={{
              background: '#1a2a22',
              color: '#1de9b6',
              border: '1px solid rgba(29,233,182,0.4)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <option value=''>코트 선택</option>
            {(courts || []).map(c => {
              const isFree = !c.match_id;
              return (
                <option key={c.id} value={c.id}>
                  {c.id}번 코트 {isFree ? '✅ 빔' : '🔴 사용중'}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleCourtAssign}
            disabled={assigning || !selectedCourt}
            style={{
              background: selectedCourt ? 'linear-gradient(135deg,#1de9b6,#00bfa5)' : '#444',
              color: selectedCourt ? '#000' : '#777',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 14px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: selectedCourt ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            {assigning ? '배정 중...' : '▶ 시작'}
          </button>
        </div>
      )}

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

      {/* ── 관리자 되돌리기 / 결과 수정 (COMPLETED 경기 전용) ── */}
      {isAdmin && isCompleted && (
        <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '10px' }}>
          {!editMode ? (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {/* 되돌리기 버튼 */}
              <button
                onClick={handleRevert}
                disabled={saving}
                style={{
                  flex: 1, minWidth: '100px',
                  padding: '6px 10px',
                  fontSize: '0.78rem', fontWeight: 700,
                  background: 'rgba(255,120,50,0.15)',
                  color: '#ff9966',
                  border: '1px solid rgba(255,120,50,0.4)',
                  borderRadius: '6px', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {saving ? '처리 중...' : '↩ 결과 되돌리기'}
              </button>
              {/* 결과 수정 버튼 */}
              <button
                onClick={handleEditOpen}
                disabled={saving}
                style={{
                  flex: 1, minWidth: '100px',
                  padding: '6px 10px',
                  fontSize: '0.78rem', fontWeight: 700,
                  background: 'rgba(100,160,255,0.15)',
                  color: '#88aaff',
                  border: '1px solid rgba(100,160,255,0.4)',
                  borderRadius: '6px', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ✏️ 결과 수정
              </button>
            </div>
          ) : (
            /* 인라인 점수 수정 모드 */
            <div style={{ background: 'rgba(100,160,255,0.07)', border: '1px solid rgba(100,160,255,0.3)', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: '#88aaff', fontWeight: 700, marginBottom: '8px' }}>✏️ 점수 수정</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', color: '#aaa', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{teamA.name}</span>
                  <input type="number" min="0" max="10" value={editScoreA}
                    onChange={e => setEditScoreA(e.target.value)}
                    style={{ width: '56px', height: '48px', fontSize: '1.6rem', textAlign: 'center', fontWeight: 700, background: '#111', color: 'var(--tennis-yellow)', border: '1px solid #555', borderRadius: '8px' }}
                  />
                </div>
                <span style={{ color: '#555', fontWeight: 900, fontSize: '1.2rem' }}>:</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', color: '#aaa', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{teamB.name}</span>
                  <input type="number" min="0" max="10" value={editScoreB}
                    onChange={e => setEditScoreB(e.target.value)}
                    style={{ width: '56px', height: '48px', fontSize: '1.6rem', textAlign: 'center', fontWeight: 700, background: '#111', color: 'var(--tennis-yellow)', border: '1px solid #555', borderRadius: '8px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button onClick={handleEditSave} disabled={saving}
                  style={{ flex: 1, padding: '7px', fontSize: '0.82rem', fontWeight: 700, background: 'linear-gradient(135deg,#1565c0,#0d47a1)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  {saving ? '저장 중...' : '💾 저장'}
                </button>
                <button onClick={() => setEditMode(false)} disabled={saving}
                  style={{ padding: '7px 12px', fontSize: '0.82rem', background: '#333', color: '#aaa', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  취소
                </button>
              </div>
            </div>
          )}
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
