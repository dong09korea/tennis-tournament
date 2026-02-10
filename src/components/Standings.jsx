import React, { useState } from 'react';

const Standings = ({ teams, groups }) => {
  const [viewMode, setViewMode] = useState('rankings'); // 'rankings' | 'roster'

  // --- Roster View ---
  if (viewMode === 'roster') {
    return (
      <div className="standings-container">
        <div className="view-toggle">
          <button onClick={() => setViewMode('rankings')} className="toggle-btn">📊 조별 순위</button>
          <button onClick={() => setViewMode('roster')} className="toggle-btn active">📋 참가자 명단</button>
        </div>

        <div className="glass-card full-width">
          <div className="table-responsive">
            <table className="roster-table">
              <thead>
                <tr>
                  <th>클럽</th>
                  <th>이름(1)</th>
                  <th>성별</th>
                  <th>점수</th>
                  <th>이름(2)</th>
                  <th>성별</th>
                  <th>점수</th>
                  <th>합계</th>
                  <th>조</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.id}>
                    <td>{team.club || '-'}</td>
                    <td>{team.player1}</td>
                    <td>{team.p1_gender || '-'}</td>
                    <td>{team.p1_score || '-'}</td>
                    <td>{team.player2}</td>
                    <td>{team.p2_gender || '-'}</td>
                    <td>{team.p2_score || '-'}</td>
                    <td className="highlight">{team.total_score || '-'}</td>
                    <td>
                      {/* Find Group Name */}
                      {groups.find(g => g.team_ids.includes(team.id))?.name || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <style>{`
            .standings-container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .view-toggle {
                display: flex;
                gap: 10px;
                margin-bottom: 1.5rem;
                justify-content: center;
            }
            .toggle-btn {
                padding: 0.8rem 1.5rem;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: #aaa;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .toggle-btn.active {
                background: var(--tennis-yellow);
                color: black;
                font-weight: bold;
                border-color: var(--tennis-yellow);
            }
            
            .glass-card {
                background: rgba(30,30,30,0.6);
                backdrop-filter: blur(10px);
                border-radius: 12px;
                padding: 1rem;
                border: 1px solid rgba(255,255,255,0.05);
            }

            .table-responsive {
                overflow-x: auto;
            }

            .roster-table {
                width: 100%;
                border-collapse: collapse;
                min-width: 800px; /* Force scroll on mobile */
                font-size: 0.9rem;
            }
            .roster-table th {
                background: rgba(0,0,0,0.3);
                padding: 1rem;
                text-align: center;
                color: var(--tennis-yellow);
                border-bottom: 2px solid rgba(255,255,255,0.1);
                white-space: nowrap;
            }
            .roster-table td {
                padding: 0.8rem;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                color: #ddd;
            }
            .roster-table tr:hover {
                background: rgba(255,255,255,0.05);
            }
            .highlight {
                color: var(--tennis-yellow);
                font-weight: bold;
            }
        `}</style>
      </div>
    );
  }

  // --- Rankings View (Original) ---
  return (
    <div className="standings-container">
      <div className="view-toggle">
        <button onClick={() => setViewMode('rankings')} className="toggle-btn active">📊 조별 순위</button>
        <button onClick={() => setViewMode('roster')} className="toggle-btn">📋 참가자 명단</button>
      </div>

      <div className="rankings-grid">
        {groups.map(group => {
          const groupTeams = group.team_ids.map(tid => teams.find(t => t.id === tid)).filter(Boolean);
          // Sort by points (desc), then goal diff if needed.
          // Assuming 'points' is already calculated in the data for now.
          // Or we could recalculate. For viewer, use data as is.
          const sortedTeams = [...groupTeams].sort((a, b) => b.points - a.points || b.games_won - a.games_won);

          return (
            <div key={group.id} className="group-card">
              <h3 className="group-title">{group.name}</h3>
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
                    <tr key={team.id}>
                      <td>{index + 1}</td>
                      <td className="team-cell">
                        <div className="t-name">{team.name}</div>
                      </td>
                      <td>{team.wins + team.losses + team.draws}</td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td className="points">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <style>{`
        /* Shared Toggle Styles */
        .view-toggle {
            display: flex;
            gap: 10px;
            margin-bottom: 1.5rem;
            justify-content: center;
        }
        .toggle-btn {
            padding: 0.8rem 1.5rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: #aaa;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .toggle-btn.active {
            background: var(--tennis-yellow);
            color: black;
            font-weight: bold;
            border-color: var(--tennis-yellow);
        }

        .standings-container {
             /* Wrapper */
        }

        .rankings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .group-card {
          background-color: var(--card-bg);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          height: fit-content;
        }
        .group-title {
          margin-top: 0;
          border-left: 4px solid var(--tennis-yellow);
          padding-left: 10px;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #fff;
        }
        .standings-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .standings-table th {
          text-align: center;
          color: #888;
          font-weight: 600;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .standings-table td {
          text-align: center;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #ddd;
        }
        .standings-table .team-cell {
          text-align: left;
          width: 40%;
        }
        .t-name {
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }
        .points {
          color: var(--tennis-yellow);
          font-weight: bold;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .rankings-grid {
            grid-template-columns: 1fr;
          }
          .t-name {
            max-width: 140px; /* More space on mobile list */
          }
        }
      `}</style>
    </div>
  );
};

export default Standings;
