import React, { useMemo, useState, useCallback } from 'react';
import { calculateStandings } from '../utils/tournamentLogic';

// Sort teams within a group using standard rules + tiebreaker age
const sortGroupTeams = (teams, tiebreakAges) => {
  return [...teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;

    // Age tiebreaker: only apply if BOTH teams have an age entered
    const hasA = tiebreakAges[a.id] !== undefined;
    const hasB = tiebreakAges[b.id] !== undefined;
    if (hasA && hasB) {
      const ageA = Number(tiebreakAges[a.id]);
      const ageB = Number(tiebreakAges[b.id]);
      if (!isNaN(ageA) && !isNaN(ageB) && ageA !== ageB) return ageB - ageA; // higher age wins
    }

    // Fallback: draw order from lottery
    return (a.drawOrder ?? 9999) - (b.drawOrder ?? 9999);
  });
};

// Check if a team is in a tie (same pts, wins, goalDiff as any adjacent team in sorted list)
const getTiedTeamIds = (sortedTeams) => {
  const tied = new Set();
  for (let i = 0; i < sortedTeams.length; i++) {
    for (let j = i + 1; j < sortedTeams.length; j++) {
      const a = sortedTeams[i];
      const b = sortedTeams[j];
      if (a.pts === b.pts && a.wins === b.wins && a.goalDiff === b.goalDiff && a.played > 0) {
        tied.add(a.id);
        tied.add(b.id);
      }
    }
  }
  return tied;
};

const getWildcardIds = (allSortedGroups, tiebreakAges) => {
  const thirdPlacers = [];
  Object.values(allSortedGroups).forEach(groupTeams => {
    if (groupTeams.length >= 3) thirdPlacers.push(groupTeams[2]);
  });
  thirdPlacers.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    const ageA = parseInt(tiebreakAges[a.id]);
    const ageB = parseInt(tiebreakAges[b.id]);
    if (!isNaN(ageA) && !isNaN(ageB) && ageB !== ageA) return ageB - ageA;
    const doA = a.drawOrder ?? 9999;
    const doB = b.drawOrder ?? 9999;
    return doA - doB;
  });
  return new Set(thirdPlacers.slice(0, 8).map(t => t.id));
};

const Standings = ({ teams, groups, matches, isAdmin, onAdminAction, onConfirmTiebreaker }) => {
  // Helper to generate consistent colors based on club string
  const getClubColor = (clubName) => {
    if (!clubName) return '#888';
    let hash = 0;
    for (let i = 0; i < clubName.length; i++) {
      hash = clubName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 75%)`;
  };

  const rawStandingsData = useMemo(() => {
    if (!teams || !matches || teams.length === 0) return {};
    return calculateStandings(teams, matches);
  }, [teams, matches]);

  // tiebreakAges: { [team_id]: ageNumber }
  const [tiebreakAges, setTiebreakAges] = useState({});

  const handleAgeChange = useCallback((teamId, val) => {
    setTiebreakAges(prev => ({ ...prev, [teamId]: val }));
  }, []);

  // Save tiebreakAge via callback so App.jsx handles full data object
  const [confirming, setConfirming] = useState(false);
  const confirmTiebreaker = useCallback(async (tiedIds, onConfirmTiebreaker) => {
    const allEntered = [...tiedIds].every(id => tiebreakAges[id] !== undefined);
    if (!allEntered) { alert('동점인 모든 팀의 나이를 입력해주세요.'); return; }
    if (!onConfirmTiebreaker) { alert('저장 기능을 사용할 수 없습니다.'); return; }
    setConfirming(true);
    try {
      await onConfirmTiebreaker(tiebreakAges);
    } catch (e) { alert('저장 오류: ' + e.message); }
    finally { setConfirming(false); }
  }, [tiebreakAges]);


  // Re-sort each group using tiebreakAges
  const standingsData = useMemo(() => {
    const result = {};
    Object.entries(rawStandingsData).forEach(([gName, gTeams]) => {
      result[gName] = sortGroupTeams(gTeams, tiebreakAges);
    });
    return result;
  }, [rawStandingsData, tiebreakAges]);

  const wildcardIds = useMemo(() => getWildcardIds(standingsData, tiebreakAges), [standingsData, tiebreakAges]);

  const groupNames = useMemo(() => {
    return Object.keys(standingsData)
      .filter(g => g !== 'Unknown')
      .sort((a, b) => {
        const numA = parseInt(String(a).replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(String(b).replace(/[^0-9]/g, ''), 10) || 0;
        return numA - numB;
      });
  }, [standingsData]);

  const [viewMode, setViewMode] = useState('group');

  const overallStandings = useMemo(() => {
    let allTeams = [];
    Object.values(standingsData).forEach(groupTeams => {
      groupTeams.forEach((t, index) => {
        allTeams.push({ ...t, groupRank: index + 1 });
      });
    });
    allTeams.sort((a, b) => {
      if (a.groupRank !== b.groupRank) return a.groupRank - b.groupRank;
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      const ageA = parseInt(tiebreakAges[a.id]);
      const ageB = parseInt(tiebreakAges[b.id]);
      if (!isNaN(ageA) && !isNaN(ageB) && ageB !== ageA) return ageB - ageA;
      const doA = a.drawOrder ?? 9999;
      const doB = b.drawOrder ?? 9999;
      return doA - doB;
    });
    return allTeams;
  }, [standingsData, tiebreakAges]);

  return (
    <div className="standings-wrap">
      {/* View Toggle Tabs */}
      <div className="standings-tabs">
        <button className={`st-tab ${viewMode === 'group' ? 'active' : ''}`} onClick={() => setViewMode('group')}>
          조별 순위
        </button>
        <button className={`st-tab ${viewMode === 'wildcard' ? 'active' : ''}`} onClick={() => setViewMode('wildcard')}>
          와일드카드 순위
        </button>
      </div>

      {/* Legend */}
      <div className="standings-legend">
        <span className="legend-dot direct" />본선 직행 (조 1·2위)
        <span className="legend-dot wild" />와일드카드 (조 3위 상위 8팀)
      </div>

      {groupNames.length === 0 && (
        <div className="standings-empty">
          아직 경기 결과가 없습니다. 예선 경기가 완료되면 순위가 표시됩니다.
        </div>
      )}

      {viewMode === 'group' ? (
        <div className="standings-grid">
          {groupNames.map(groupName => {
            const groupTeams = standingsData[groupName] || [];
            const tiedIds = getTiedTeamIds(groupTeams);
            // ALL matches in this group must be COMPLETED before showing the tie UI
            const groupMatches = (matches || []).filter(m => {
              const g = String(m.group_id);
              const gn = String(groupName);
              return g === gn || g === gn.replace(/조$/, '') || g.replace(/조$/, '') === gn.replace(/조$/, '');
            });
            const allGroupMatchesDone = groupMatches.length > 0 && groupMatches.every(m => m.status === 'COMPLETED');
            const allTiedAgesEntered = tiedIds.size > 0 && [...tiedIds].every(id => tiebreakAges[id] !== undefined);
            // Check if tiebreak is already confirmed (saved to Firebase)
            const tieAlreadyConfirmed = tiedIds.size > 0 && [...tiedIds].every(id => {
              const t = groupTeams.find(t => t.id === id);
              return t?.tiebreakAge !== undefined;
            });

            return (
              <div key={groupName} className="standings-card">
                {/* Card Header */}
                <div className="sc-header">
                  <span className="sc-title">
                    {String(groupName).endsWith('조') ? groupName : `${groupName}조`}
                  </span>
                  <div className="sc-cols">
                    <span>경기</span>
                    <span className="col-pts">승점</span>
                    <span>승</span>
                    <span>무</span>
                    <span>패</span>
                    <span className="col-gd">득실차</span>
                  </div>
                </div>

                {/* Rows */}
                {groupTeams.map((team, index) => {
                  const wins = team.wins || 0;
                  const draws = team.draws || 0;
                  const losses = team.losses || 0;
                  const played = team.played || 0;
                  const pts = team.pts || 0;
                  const goalDiff = team.goalDiff || 0;

                  const isDirect = index < 2 && played > 0;
                  const isWild = wildcardIds.has(team.id) && allGroupMatchesDone;
                  const rowMod = isDirect ? 'row-direct' : isWild ? 'row-wild' : '';
                  const isTied = tiedIds.has(team.id);

                  const parts = team.name ? team.name.split('/') : [team.name];
                  const p1 = parts[0] || '';
                  const p2 = parts[1] || '';

                  return (
                    <div key={team.id} className={`sc-row ${rowMod}`}>
                      <div className="sc-rank">{index + 1}</div>
                      <div className="sc-team">
                        <div className="sc-name">{p1}</div>
                        {p2 && <div className="sc-name2">{p2}</div>}
                        {team.club && <div className="sc-club" style={{ color: getClubColor(team.club) }}>{team.club}</div>}
                        {/* Admin tiebreaker age input — shown only when ALL group matches are completed AND there is a tie */}
                        {isAdmin && isTied && allGroupMatchesDone && (() => {
                          const ageEntered = tiebreakAges[team.id] !== undefined;
                          return (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
                              <span style={{
                                fontSize: '0.68rem',
                                color: ageEntered ? '#4caf50' : '#ff9b55',
                                fontWeight: 700,
                                whiteSpace: 'nowrap'
                              }}>
                                {ageEntered ? '✅ 나이순위 적용' : '🔥 동점 — 합산나이'}
                              </span>
                              <input
                                type="number"
                                placeholder="예: 140"
                                value={tiebreakAges[team.id] ?? ''}
                                onChange={e => handleAgeChange(team.id, e.target.value === '' ? undefined : Number(e.target.value))}
                                style={{
                                  width: '72px',
                                  padding: '2px 6px',
                                  fontSize: '0.8rem',
                                  borderRadius: '4px',
                                  border: `1px solid ${ageEntered ? '#4caf50' : '#ff9b55'}`,
                                  background: ageEntered ? 'rgba(76,175,80,0.15)' : 'rgba(255,155,85,0.12)',
                                  color: '#fff',
                                  outline: 'none',
                                  transition: 'border 0.2s, background 0.2s'
                                }}
                              />
                            </div>
                          );
                        })()}

                      </div>
                      <div className="sc-stat">{played}</div>
                      <div className="sc-stat col-pts" style={{ color: '#d5ff00', fontWeight: 700 }}>{pts}</div>
                      <div className="sc-stat" style={{ color: wins > 0 ? '#a8e063' : '#666' }}>{wins}</div>
                      <div className="sc-stat" style={{ color: draws > 0 ? '#88aaff' : '#666' }}>{draws}</div>
                      <div className="sc-stat" style={{ color: losses > 0 ? '#ff7070' : '#666' }}>{losses}</div>
                      <div className="sc-stat col-gd" style={{ color: goalDiff > 0 ? '#ff9b55' : (goalDiff < 0 ? '#ff5555' : '#888') }}>
                        {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                      </div>
                    </div>
                  );
                })}

                {/* Confirm tiebreaker button */}
                {isAdmin && allGroupMatchesDone && tiedIds.size > 0 && !tieAlreadyConfirmed && (
                  <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,155,85,0.3)' }}>
                    <button
                      onClick={() => confirmTiebreaker(tiedIds, onConfirmTiebreaker)}
                      disabled={confirming || !allTiedAgesEntered}
                      style={{
                        width: '100%', padding: '10px', fontSize: '0.85rem', fontWeight: 700,
                        background: allTiedAgesEntered ? 'linear-gradient(135deg,#4caf50,#2e7d32)' : '#555',
                        color: allTiedAgesEntered ? '#fff' : '#aaa',
                        border: 'none', borderRadius: '6px',
                        cursor: confirming ? 'wait' : (!allTiedAgesEntered ? 'not-allowed' : 'pointer'),
                        transition: 'all 0.2s'
                      }}
                    >
                      {confirming ? '저장 중...' : (!allTiedAgesEntered ? '⚠️ 동점팀의 합산나이를 모두 입력해주세요' : '✅ 나이 순위 확정 (브라켓 자동 배치)')}
                    </button>
                  </div>
                )}
                {isAdmin && allGroupMatchesDone && tieAlreadyConfirmed && (
                  <div style={{ padding: '6px 12px', fontSize: '0.72rem', color: '#4caf50', textAlign: 'center' }}>
                    ✅ 나이 순위 확정 완료 — 브라켓 슬롯이 자동 업데이트됩니다
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overall-standings-card standings-card">
          <div className="sc-header">
            <span className="sc-title" style={{ width: 60 }}>순위</span>
            <span className="sc-title" style={{ width: 60, marginLeft: 10 }}>소속 조</span>
            <div className="sc-cols">
              <span>경기</span>
              <span className="col-pts">승점</span>
              <span>승</span>
              <span>무</span>
              <span>패</span>
              <span className="col-gd">득실차</span>
            </div>
          </div>
          {(() => {
            // Extract all 3rd place teams from overallStandings
            const thirdPlacers = overallStandings.filter(t => t.groupRank === 3);
            
            // Sort strictly by Wildcard tiebreakers: 1. Points, 2. Wins, 3. GoalDiff, 4. TiebreakAge/Age
            thirdPlacers.sort((a, b) => {
              if (b.pts !== a.pts) return b.pts - a.pts;
              if (b.wins !== a.wins) return b.wins - a.wins;
              if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;

              const ageA = parseInt(a.tiebreakAge) || parseInt(a.age) || 0;
              const ageB = parseInt(b.tiebreakAge) || parseInt(b.age) || 0;
              if (ageB !== ageA) return ageB - ageA;

              return (a.name || '').localeCompare(b.name || '');
            });

            if (thirdPlacers.length === 0 && groupNames.length > 0) {
              return <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>예선 경기가 진행되면 3위 팀들의 와일드카드 순위가 표시됩니다.</div>;
            }

            const tiedIds = getTiedTeamIds(thirdPlacers);
            const allGroupMatchesDone = (matches || []).length > 0 && (matches || []).filter(m => m.group_id && String(m.group_id).includes('조')).every(m => m.status === 'COMPLETED');

            return (
              <>
                {thirdPlacers.map((team, index) => {
                  const wins = team.wins || 0;
                  const draws = team.draws || 0;
              const losses = team.losses || 0;
              const played = team.played || 0;
              const pts = team.pts || 0;
              const goalDiff = team.goalDiff || 0;

              // Top 8 teams in this list are wildcard eligible
              const isWild = index < 8 && played > 0;
              const rowMod = isWild ? 'row-wild' : '';

              const parts = team.name ? team.name.split('/') : [team.name];
              const p1 = parts[0] || '';
              const p2 = parts[1] || '';

              return (
                <div key={team.id} className={`sc-row ${rowMod}`}>
                  <div className="sc-rank" style={{ width: 44, textAlign: 'center' }}>
                    {index + 1}
                  </div>
                  <div className="sc-rank" style={{ width: 50, color: '#aaa' }}>
                    {String(team.group_id || team.initial_group || '').replace('조', '')}조
                  </div>
                  <div className="sc-team">
                    <div className="sc-name">{p1}</div>
                    {p2 && <div className="sc-name2">{p2}</div>}
                    {team.club && <div className="sc-club" style={{ color: getClubColor(team.club) }}>{team.club}</div>}
                    
                    {/* Admin tiebreaker age input for Wildcards */}
                    {isAdmin && tiedIds.has(team.id) && allGroupMatchesDone && (() => {
                      const ageEntered = tiebreakAges[team.id] !== undefined;
                      return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
                          <span style={{
                            fontSize: '0.68rem',
                            color: ageEntered ? '#4caf50' : '#ff9b55',
                            fontWeight: 700,
                            whiteSpace: 'nowrap'
                          }}>
                            {ageEntered ? '✅ 나이순위 적용' : '🔥 동점 — 합산나이'}
                          </span>
                          <input
                            type="number"
                            placeholder="예: 140"
                            value={tiebreakAges[team.id] ?? ''}
                            onChange={e => handleAgeChange(team.id, e.target.value === '' ? undefined : Number(e.target.value))}
                            style={{
                              width: '72px',
                              padding: '2px 6px',
                              fontSize: '0.8rem',
                              borderRadius: '4px',
                              border: `1px solid ${ageEntered ? '#4caf50' : '#ff9b55'}`,
                              background: ageEntered ? 'rgba(76,175,80,0.15)' : 'rgba(255,155,85,0.12)',
                              color: '#fff',
                              outline: 'none',
                              transition: 'border 0.2s, background 0.2s'
                            }}
                          />
                        </div>
                      );
                    })()}
                  </div>
                  <div className="sc-stat">{played}</div>
                  <div className="sc-stat col-pts" style={{ color: '#d5ff00', fontWeight: 700 }}>{pts}</div>
                  <div className="sc-stat" style={{ color: wins > 0 ? '#a8e063' : '#666' }}>{wins}</div>
                  <div className="sc-stat" style={{ color: draws > 0 ? '#88aaff' : '#666' }}>{draws}</div>
                  <div className="sc-stat" style={{ color: losses > 0 ? '#ff7070' : '#666' }}>{losses}</div>
                  <div className="sc-stat col-gd" style={{ color: goalDiff > 0 ? '#ff9b55' : (goalDiff < 0 ? '#ff5555' : '#888') }}>
                    {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                  </div>
                </div>
              );
            })}
                
            {/* Confirm tiebreaker button for Wildcards */}
            {isAdmin && allGroupMatchesDone && tiedIds.size > 0 && (() => {
              const allTiedAgesEntered = [...tiedIds].every(id => tiebreakAges[id] !== undefined);
              const tieAlreadyConfirmed = [...tiedIds].every(id => {
                const t = thirdPlacers.find(t => t.id === id);
                return t?.tiebreakAge !== undefined;
              });

              if (tieAlreadyConfirmed) {
                return (
                  <div style={{ padding: '12px', fontSize: '0.8rem', color: '#4caf50', textAlign: 'center', fontWeight: 'bold' }}>
                    ✅ 와일드카드 나이 순위 확정 완료
                  </div>
                );
              }

              return (
                <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,155,85,0.3)' }}>
                  <button
                    onClick={() => confirmTiebreaker(tiedIds, onConfirmTiebreaker)}
                    disabled={confirming || !allTiedAgesEntered}
                    style={{
                      width: '100%', padding: '10px', fontSize: '0.85rem', fontWeight: 700,
                      background: allTiedAgesEntered ? 'linear-gradient(135deg,#4caf50,#2e7d32)' : '#555',
                      color: allTiedAgesEntered ? '#fff' : '#aaa',
                      border: 'none', borderRadius: '6px',
                      cursor: confirming ? 'wait' : (!allTiedAgesEntered ? 'not-allowed' : 'pointer'),
                      transition: 'all 0.2s'
                    }}
                  >
                    {confirming ? '저장 중...' : (!allTiedAgesEntered ? '⚠️ 동점팀의 합산나이를 모두 입력해주세요' : '✅ 와일드카드 나이 순위 확정')}
                  </button>
                </div>
              );
            })()}
            </>
          );
        })()}
        </div>
      )}

      <style>{`
        .standings-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 1rem 2rem;
          color: white;
        }
        .standings-legend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: #aaa;
          margin-bottom: 1.5rem;
          justify-content: flex-end;
        }
        .legend-dot {
          display: inline-block;
          width: 10px; height: 10px;
          border-radius: 50%;
          margin-left: 12px;
        }
        .legend-dot.direct { background: #d5ff00; }
        .legend-dot.wild   { background: #5599ff; }
        .standings-empty {
          text-align: center;
          color: #666;
          padding: 4rem;
          font-size: 0.95rem;
        }

        .standings-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .st-tab {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #aaa;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .st-tab:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
        .st-tab.active {
          background: #d5ff00;
          color: #111;
          box-shadow: 0 0 10px rgba(213, 255, 0, 0.3);
          border-color: #d5ff00;
        }

        .overall-standings-card {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .standings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.2rem;
        }
        @media (max-width: 600px) {
          .standings-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card */
        .standings-card {
          background: linear-gradient(160deg, #152a1a 0%, #0e1e12 100%);
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        /* Card header (column labels row) */
        .sc-header {
          display: flex;
          align-items: center;
          padding: 0.6rem 0.9rem;
          background: rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          gap: 0;
        }
        .sc-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--tennis-yellow, #d5ff00);
          min-width: 44px;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .sc-cols {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          gap: 0;
        }
        .sc-cols span {
          font-size: 0.7rem;
          color: #777;
          text-align: center;
          width: 34px;
          flex-shrink: 0;
          font-weight: 600;
        }
        .sc-cols .col-pts { width: 34px; color: #999; }
        .sc-cols .col-gd  { width: 44px; color: #999; }

        /* Row */
        .sc-row {
          display: flex;
          align-items: center;
          padding: 0.6rem 0.9rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          gap: 0;
          min-height: 48px;
        }
        .sc-row:last-child { border-bottom: none; }
        .sc-row:hover { background: rgba(255,255,255,0.03); }

        /* Highlights */
        .sc-row.row-direct {
          background: rgba(213, 255, 0, 0.06);
          border-left: 3px solid #d5ff00;
        }
        .sc-row.row-wild {
          background: rgba(85, 153, 255, 0.06);
          border-left: 3px solid #5599ff;
        }
        .sc-row:not(.row-direct):not(.row-wild) {
          border-left: 3px solid transparent;
        }

        /* Rank badge */
        .sc-rank {
          width: 22px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #666;
          flex-shrink: 0;
          text-align: center;
        }
        .row-direct .sc-rank { color: #d5ff00; }
        .row-wild   .sc-rank { color: #5599ff; }

        /* Team name area */
        .sc-team {
          flex: 1;
          min-width: 0;
          padding: 0 0.4rem 0 0.5rem;
          line-height: 1.2;
        }
        .sc-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: #efefef;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sc-name2 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #d8d8d8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sc-club {
          font-size: 0.75rem;
          margin-top: 3px;
          font-weight: 600;
          letter-spacing: -0.02em;
          background: rgba(255, 255, 255, 0.05);
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .row-direct .sc-name  { color: #d5ff00; }
        .row-direct .sc-name2 { color: #b8d500; }
        .row-wild   .sc-name  { color: #88bbff; }
        .row-wild   .sc-name2 { color: #6699dd; }

        /* Stat cells */
        .sc-stat {
          width: 34px;
          flex-shrink: 0;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
          color: #888;
        }
        .sc-stat.col-pts { width: 34px; }
        .sc-stat.col-gd  { width: 44px; font-size: 0.88rem; }
      `}</style>
    </div>
  );
};


export default Standings;
