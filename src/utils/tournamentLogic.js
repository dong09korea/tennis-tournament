/**
 * Tournament Logic Module
 * Ported from legacy_streamlit/utils/logic.py
 */

// Generate groups from a list of teams
// Generate groups from a list of teams
export const generateGroups = (teams, numGroups = 8) => {
    // initialize empty groups
    const groups = Array.from({ length: numGroups }, (_, i) => ({
        id: i + 1,
        name: `${i + 1}조`,
        team_ids: []
    }));

    // Distribute teams
    teams.forEach((team, index) => {
        let groupIndex;

        // If team has a pre-assigned group (1-based index or name)
        if (team.initial_group) {
            // Try to match '1', '1조', 'A' (mapped to 1?)
            // Assuming input is number for now
            const gId = parseInt(team.initial_group);
            if (!isNaN(gId) && gId >= 1 && gId <= numGroups) {
                groupIndex = gId - 1;
            } else {
                // Fallback or handle error? For now, Round Robin
                groupIndex = index % numGroups;
            }
        } else {
            // Round Robin
            groupIndex = index % numGroups;
        }

        if (groups[groupIndex]) {
            groups[groupIndex].team_ids.push(team.id);
        }
    });

    return groups;
};

// Generate Matches (Round Robin within groups)
export const generateSchedule = (groups) => {
    const matches = [];

    groups.forEach(group => {
        const teamIds = group.team_ids;
        const n = teamIds.length;
        if (n < 2) return;

        let matchIdx = 1;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const matchId = `g${group.id}_m${matchIdx}`;

                matches.push({
                    id: matchId,
                    group_id: group.id,
                    round: matchIdx, // Priority
                    team_a_id: teamIds[i],
                    team_b_id: teamIds[j],
                    score_a: 0,
                    score_b: 0,
                    status: "PENDING", // PENDING, LIVE, COMPLETED
                    court_id: null,
                    winner_id: null
                });
                matchIdx++;
            }
        }
    });

    return matches;
};

// Assign Matches to Courts
// Returns updated { matches, courts }
export const assignMatchesToCourts = (matches, courts) => {
    // Deep copy to avoid mutation issues during calculation
    let nextMatches = JSON.parse(JSON.stringify(matches));
    let nextCourts = JSON.parse(JSON.stringify(courts));

    // 1. Identify Busy Teams (currently playing)
    const busyTeams = new Set();
    nextMatches.filter(m => m.status === 'LIVE').forEach(m => {
        busyTeams.add(m.team_a_id);
        busyTeams.add(m.team_b_id);
    });

    // 2. Identify Empty Courts
    const emptyCourts = nextCourts.filter(c => c.match_id === null);
    if (emptyCourts.length === 0) return { matches: nextMatches, courts: nextCourts };

    // 3. Get Pending Matches
    // Sort by Group ID (asc), then Round (asc) to distribute fairly?
    // Or Round (asc) to finish early rounds first.
    let pendingMatches = nextMatches.filter(m => m.status === 'PENDING' && !m.court_id);

    // Simplistic sorting: Prioritize lower round numbers (finish round 1 before round 2)
    pendingMatches.sort((a, b) => {
        if (a.round === b.round) {
            return a.group_id - b.group_id;
        }
        return a.round - b.round;
    });

    // 4. Assign
    for (const court of emptyCourts) {
        // Find a playable match
        const candidateIndex = pendingMatches.findIndex(m =>
            !busyTeams.has(m.team_a_id) && !busyTeams.has(m.team_b_id)
        );

        if (candidateIndex !== -1) {
            const match = pendingMatches[candidateIndex];

            // Update Match status
            // We need to update the match in the main list 'nextMatches'
            const matchInMainList = nextMatches.find(m => m.id === match.id);
            matchInMainList.status = 'LIVE';
            matchInMainList.court_id = court.id;

            // Update Court
            court.match_id = match.id;

            // Mark teams as busy
            busyTeams.add(match.team_a_id);
            busyTeams.add(match.team_b_id);

            // Remove from local pending list
            pendingMatches.splice(candidateIndex, 1);
        }
    }

    return { matches: nextMatches, courts: nextCourts };
};
