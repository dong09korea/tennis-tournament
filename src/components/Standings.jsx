import React from 'react';

const Standings = ({ teams, groups }) => {
  // --- Rankings View (Only) ---
  return (
    <div className="standings-container">
      <div className="card-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--tennis-yellow)', fontSize: '1.5rem' }}>📊 조별 순위</h3>
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
        .standings-container {
             /* Wrapper */
             max-width: 1200px;
             margin: 0 auto;
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
