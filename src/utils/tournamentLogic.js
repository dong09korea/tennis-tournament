/**
 * Tournament Logic Module
 * Ported from legacy_streamlit/utils/logic.py
 */

// Generate groups from a list of teams
export const generateGroups = (teams, numGroups = 8) => {
    const groups = Array.from({ length: numGroups }, (_, i) => ({
        id: i + 1,
        name: `${i + 1}조`,
        team_ids: []
    }));

    // Distribute teams
    // First, let's make sure the input teams are sorted by drawOrder
    const sortedTeams = [...teams].sort((a, b) => (a.drawOrder ?? 9999) - (b.drawOrder ?? 9999));

    sortedTeams.forEach((team, index) => {
        let targetGroupIndex = -1;

        if (team.initial_group) {
            const gId = parseInt(team.initial_group);
            if (!isNaN(gId) && gId >= 1 && gId <= numGroups) {
                targetGroupIndex = gId - 1;
            }
        }

        if (targetGroupIndex === -1) {
            // Find the group with the least members
            let minCount = Infinity;
            groups.forEach((g, idx) => {
                if (g.team_ids.length < minCount) {
                    minCount = g.team_ids.length;
                    targetGroupIndex = idx;
                }
            });
        }

        if (groups[targetGroupIndex]) {
            groups[targetGroupIndex].team_ids.push(team.id);
        }
    });

    return groups;
};

// Generate Matches (Round Robin within groups)
export const generateSchedule = (groups) => {
    let allMatches = [];
    let globalMatchId = 1;

    groups.forEach(group => {
        const teamIds = group.team_ids;
        const n = teamIds.length;
        if (n < 2) return;

        let matchesForGroup = [];

        if (n === 4) {
            const schedule4 = [
                { i: 0, j: 1, r: 1 }, // 1v2 (Match 1)
                { i: 2, j: 3, r: 1 }, // 3v4 (Match 2)
                { i: 0, j: 2, r: 2 }, // 1v3 (Match 3)
                { i: 1, j: 3, r: 2 }, // 2v4 (Match 4)
                { i: 1, j: 2, r: 3 }, // 2v3 (Match 5)
                { i: 0, j: 3, r: 3 }  // 1v4 (Match 6)
            ];

            schedule4.forEach((match, idx) => {
                matchesForGroup.push({
                    id: `g${group.id}_m${idx + 1}`,
                    group_id: group.id,
                    match_in_group: idx + 1, // e.g., 1st match of the group, 2nd match...
                    team_a_id: teamIds[match.i],
                    team_b_id: teamIds[match.j],
                    score_a: 0,
                    score_b: 0,
                    status: "PENDING",
                    court_id: null,
                    winner_id: null
                });
            });
        } else {
            // General Round Robin permutation for non-4 groups
            let matchIdx = 1;
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    matchesForGroup.push({
                        id: `g${group.id}_m${matchIdx}`,
                        group_id: group.id,
                        match_in_group: matchIdx,
                        team_a_id: teamIds[i],
                        team_b_id: teamIds[j],
                        score_a: 0,
                        score_b: 0,
                        status: "PENDING",
                        court_id: null,
                        winner_id: null
                    });
                    matchIdx++;
                }
            }
        }
        allMatches.push(matchesForGroup);
    });

    // Interleave matches across all groups
    // The user wants: "각조 1경기 12조까지 하고 각조 2경기 12조까지 하고 이렇게 6경기까지 돌아가게"
    // This means we group by `match_in_group` (the relative round within the group), 
    // and then sort by `group_id` within that round.
    
    // First, let's flatten the array
    let allMatchesFlattened = [];
    allMatches.forEach(groupMatches => {
        allMatchesFlattened.push(...groupMatches);
    });

    // Sort: primarily by match_in_group, secondarily by the numeric part of group_id
    allMatchesFlattened.sort((a, b) => {
        if (a.match_in_group !== b.match_in_group) {
            return a.match_in_group - b.match_in_group;
        }
        
        // Extract numeric group IDs for sorting (e.g., if group.id is just a number)
        const gidA = parseInt(String(a.group_id).replace(/[^0-9]/g, ''), 10) || a.group_id;
        const gidB = parseInt(String(b.group_id).replace(/[^0-9]/g, ''), 10) || b.group_id;
        
        if (gidA !== gidB) {
            return gidA - gidB;
        }
        return 0;
    });

    // Finalize match objects with absolute round number
    const finalMatches = allMatchesFlattened.map((m, idx) => {
        return {
            ...m,
            round: idx + 1 // Use 'round' as the absolute sequence number for the whole UI
        };
    });

    return finalMatches;
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

    // 2. Identify Empty Courts & Auto-heal stuck courts
    const emptyCourts = nextCourts.filter(c => {
        if (c.match_id === null) return true;
        // If court points to a match that is NOT LIVE (e.g., COMPLETED or PENDING due to regeneration), it's effectively empty (auto-heal)
        const linkedMatch = nextMatches.find(m => m.id === c.match_id);
        if (!linkedMatch || linkedMatch.status !== 'LIVE') {
            c.match_id = null; // Auto-heal the court inside nextCourts
            return true;
        }
        return false;
    });

    if (emptyCourts.length === 0) return { matches: nextMatches, courts: nextCourts };

    // 3. Get Pending Matches
    // Skip matches where either team is TBD or BYE.
    // A 32강 match enters the queue only when BOTH teams are confirmed.
    // Wildcard slots in 32강 stay TBD until all groups finish (handled in App.jsx),
    // so those naturally stay out of court assignment until the right moment.
    let pendingMatches = nextMatches.filter(m =>
        m.status === 'PENDING' &&
        !m.court_id &&
        m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
        m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE'
    );

    // Sort by round ascending so earlier matches get priority
    pendingMatches.sort((a, b) => a.round - b.round);

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

// Calculate Group Standings
// Rules: 
// 1. Wins (1 point per win)
// 2. Goal Difference (score_a - score_b)
// 3. Points For (total score earned)
export const calculateStandings = (teams, matches) => {
    // Initialize stats for each team
    const stats = {};
    teams.forEach(t => {
        stats[t.id] = {
            ...t,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            pts: 0,          // Win=2pts, Draw=1pt
            gamesWon: 0,     // Total game/set points won across all matches
            pointsFor: 0,
            pointsAgainst: 0,
            goalDiff: 0
        };
    });

    // Aggregate match results
    matches.forEach(m => {
        // Is this a group stage match?
        const isGroupStage = typeof m.group_id === 'number' || (typeof m.group_id === 'string' && m.group_id.includes("조"));

        if (isGroupStage) {
            if (stats[m.team_a_id]) stats[m.team_a_id].group_id = m.group_id;
            if (stats[m.team_b_id]) stats[m.team_b_id].group_id = m.group_id;
        }

        if (m.status === 'COMPLETED') {
            const teamA = stats[m.team_a_id];
            const teamB = stats[m.team_b_id];

            if (!teamA || !teamB) return;

            teamA.played += 1;
            teamB.played += 1;

            const scoreA = m.score_a || 0;
            const scoreB = m.score_b || 0;

            teamA.pointsFor += scoreA;
            teamA.pointsAgainst += scoreB;
            teamB.pointsFor += scoreB;
            teamB.pointsAgainst += scoreA;

            // Track total games won (individual game/set points)
            teamA.gamesWon += scoreA;
            teamB.gamesWon += scoreB;

            // Tennis scoring: 5:5 = draw (무승부), otherwise higher score wins
            // Also fall back to winner_id if explicitly set
            const isDraw = (scoreA === 5 && scoreB === 5);
            if (isDraw) {
                teamA.draws += 1;
                teamB.draws += 1;
            } else if (m.winner_id === teamA.id || (!isDraw && scoreA > scoreB)) {
                teamA.wins += 1;
                teamB.losses += 1;
            } else if (m.winner_id === teamB.id || (!isDraw && scoreB > scoreA)) {
                teamB.wins += 1;
                teamA.losses += 1;
            }

            teamA.goalDiff = teamA.pointsFor - teamA.pointsAgainst;
            teamB.goalDiff = teamB.pointsFor - teamB.pointsAgainst;

            // Compute pts: win=3, draw=1 (User Request)
            teamA.pts = teamA.wins * 3 + teamA.draws;
            teamB.pts = teamB.wins * 3 + teamB.draws;
        }
    });

    // Group teams and sort
    const grouped = {};
    Object.values(stats).forEach(team => {
        let rawGName = team.group_id || team.group || team.initial_group || "Unknown";
        // Normalize: if it's a number like 1, or string "1", make it "1조" to prevent split duplicates
        let gName = rawGName;
        if (rawGName !== "Unknown") {
            const numMatch = String(rawGName).match(/\d+/);
            if (numMatch) {
                gName = `${numMatch[0]}조`;
            }
        }

        if (!grouped[gName]) grouped[gName] = [];
        grouped[gName].push(team);
    });

    Object.keys(grouped).forEach(gName => {
        grouped[gName].sort((a, b) => {
            // Priority 0: If no games have been played by both, strictly use drawOrder for initial seeding
            if (a.played === 0 && b.played === 0) {
                const doA = a.drawOrder ?? 9999;
                const doB = b.drawOrder ?? 9999;
                return doA - doB;
            }

            if (b.pts !== a.pts) return b.pts - a.pts; // 1. 승점
            if (b.wins !== a.wins) return b.wins - a.wins; // 2. 승수
            if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff; // 3. 득실차

            // 4. 나이 타이브레이커 (관리자가 동점 시 순위표에서 입력 후 확정)
            const ageA = parseInt(a.tiebreakAge) || 0;
            const ageB = parseInt(b.tiebreakAge) || 0;
            if (ageB !== ageA) return ageB - ageA;

            // 5. 추첨 순서 (drawOrder) - 추첨 시 배정된 순서대로
            const doA = a.drawOrder ?? 9999;
            const doB = b.drawOrder ?? 9999;
            return doA - doB;
        });

        // Assign rank within group
        grouped[gName].forEach((t, i) => t.groupRank = i + 1);
    });

    return grouped; // { "1조": [teamA, teamB..], "2조": [...] }
};

// Select Top 32 Teams (Top 2 from each group + top 8 3rd placers)
export const getTop32Teams = (groupedStandings) => {
    let directQualifiers = []; // Top 2 from each group
    let thirdPlacers = [];     // 3rd place from each group

    Object.values(groupedStandings).forEach(groupTeams => {
        if (groupTeams.length > 0) {
            directQualifiers.push({ ...groupTeams[0], groupRank: 1, originalGroup: groupTeams[0].group_id });
        }
        if (groupTeams.length > 1) {
            directQualifiers.push({ ...groupTeams[1], groupRank: 2, originalGroup: groupTeams[1].group_id });
        }
        if (groupTeams.length > 2) {
            thirdPlacers.push({ ...groupTeams[2], groupRank: 3, originalGroup: groupTeams[2].group_id });
        }
    });

    // Sort 3rd placers to pick the best 'wildcards'
    // Tiebreakers: 1. Points, 2. Wins, 3. GoalDiff, 4. Age
    thirdPlacers.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;

        const ageA = parseInt(a.tiebreakAge) || parseInt(a.age) || 0;
        const ageB = parseInt(b.tiebreakAge) || parseInt(b.age) || 0;
        if (ageB !== ageA) return ageB - ageA;

        return a.name.localeCompare(b.name);
    });

    let top32 = [...directQualifiers];

    // Take top 8 (or however many needed to reach 32)
    const needed = 32 - top32.length;
    if (needed > 0) {
        top32 = [...top32, ...thirdPlacers.slice(0, needed)];
    }

    // Finally sort the 32 teams by overall performance to seed them 1 to 32
    top32.sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        return b.pointsFor - a.pointsFor;
    });

    // Ensure we ALWAYS return exactly 32 elements. Pad with BYE.
    while (top32.length < 32) {
        top32.push({
            id: 'BYE',
            name: 'BYE',
            player1: 'BYE',
            player2: '',
            club: ''
        });
    }

    return top32;
};

// Assign wildcards using backtracking to avoid same-group matchups
const assignWildcards = (wildcardTeams, exactBracketSlots, allTeamsMap) => {
    // exactBracketSlots: array of objects { index: matchIndex, opponent: teamObj }
    const assignedSlots = new Array(8).fill(null);
    const usedWildcards = new Set();

    // Helper to get group number from a team
    const getGroupNum = (team) => {
        if (!team) return null;
        let groupStr = team.initial_group || team.group_id || team.group || "";
        return parseInt(String(groupStr).replace(/[^0-9]/g, ''), 10);
    };

    const backtrack = (slotIdx) => {
        if (slotIdx === 8) return true; // All assigned successfully

        const slot = exactBracketSlots[slotIdx];
        const opponentGroup = getGroupNum(slot.opponent);

        for (let i = 0; i < wildcardTeams.length; i++) {
            if (usedWildcards.has(i)) continue;

            const wTeam = wildcardTeams[i];
            const wGroup = getGroupNum(wTeam);

            // Constraint: Wildcard team cannot face a team from the same group
            if (opponentGroup !== wGroup) {
                // Try assigning
                assignedSlots[slotIdx] = wTeam;
                usedWildcards.add(i);

                if (backtrack(slotIdx + 1)) return true; // Found a valid full assignment

                // Undo
                assignedSlots[slotIdx] = null;
                usedWildcards.delete(i);
            }
        }
        return false;
    };

    // If backtracking fails, just assign them sequentially and cross your fingers (fallback)
    if (!backtrack(0)) {
        console.warn("Could not find a perfect wildcard assignment without group overlap. Falling back to sequential.");
        return wildcardTeams; // Just return them in order
    }

    return assignedSlots;
};

// ─── Shared fixed bracket layout ────────────────────────────────────────────
// Describes which group rank fills each of the 16 first-round match slots.
// 'W' = wildcard (조 3위). Used by both shell init and progressive filling.
export const FIXED_BRACKET_LAYOUT = [
    { a: { rank: 1, g: 1 }, b: { rank: 2, g: 5 } },   // M1  (no wildcard)
    { a: { rank: 1, g: 2 }, b: { rank: 3, g: 'W' } }, // M2
    { a: { rank: 1, g: 3 }, b: { rank: 2, g: 7 } },   // M3  (no wildcard)
    { a: { rank: 1, g: 4 }, b: { rank: 3, g: 'W' } }, // M4
    { a: { rank: 1, g: 5 }, b: { rank: 3, g: 'W' } }, // M5
    { a: { rank: 1, g: 6 }, b: { rank: 2, g: 10 } },  // M6  (no wildcard)
    { a: { rank: 1, g: 7 }, b: { rank: 3, g: 'W' } }, // M7
    { a: { rank: 1, g: 8 }, b: { rank: 2, g: 12 } },  // M8  (no wildcard)
    { a: { rank: 1, g: 9 }, b: { rank: 3, g: 'W' } }, // M9
    { a: { rank: 1, g: 10 }, b: { rank: 2, g: 6 } },  // M10 (no wildcard)
    { a: { rank: 1, g: 11 }, b: { rank: 3, g: 'W' } },// M11
    { a: { rank: 1, g: 12 }, b: { rank: 2, g: 8 } },  // M12 (no wildcard)
    { a: { rank: 2, g: 4 }, b: { rank: 2, g: 9 } },   // M13 (no wildcard)
    { a: { rank: 2, g: 3 }, b: { rank: 3, g: 'W' } }, // M14
    { a: { rank: 2, g: 2 }, b: { rank: 2, g: 11 } },  // M15 (no wildcard)
    { a: { rank: 2, g: 1 }, b: { rank: 3, g: 'W' } }  // M16
];

// Create an empty 32-bracket shell (all slots TBD) to store in Firebase early.
// Should be called once as soon as the group schedule is generated.
export const initBracket32Shell = () => {
    const generateEmptyRound = (count, prefix, name, baseRound, nextPrefix) =>
        Array.from({ length: count }, (_, i) => ({
            id: `${prefix}_m${i + 1}`,
            group_id: name,
            round: baseRound + i,
            team_a_id: 'TBD',
            team_b_id: 'TBD',
            score_a: 0, score_b: 0,
            status: 'PENDING',
            court_id: null, winner_id: null,
            next_match_id: nextPrefix ? `${nextPrefix}_m${Math.floor(i / 2) + 1}` : null,
            is_team_a_next: i % 2 === 0
        }));

    const matches32 = FIXED_BRACKET_LAYOUT.map((def, idx) => ({
        id: `ko32_m${idx + 1}`,
        group_id: '본선 32강',
        round: 1000 + idx, // Make sure knockout matches sort after all group matches (which are ~1-100)
        team_a_id: 'TBD',
        team_b_id: 'TBD',
        score_a: 0, score_b: 0,
        status: 'PENDING',
        court_id: null, winner_id: null,
        next_match_id: `ko16_m${Math.floor(idx / 2) + 1}`,
        is_team_a_next: idx % 2 === 0,
        hasWildcard: def.a.g === 'W' || def.b.g === 'W' // mark wildcard matches
    }));

    return [
        ...matches32,
        ...generateEmptyRound(8, 'ko16', '16강', 2000, 'ko8'),
        ...generateEmptyRound(4, 'ko8', '8강', 3000, 'ko4'),
        ...generateEmptyRound(2, 'ko4', '4강', 4000, 'final'),
        ...generateEmptyRound(1, 'final', '결승', 5000, null)
    ];
};

// Progressively fill 32-bracket slots for newly completed groups.
// Returns a new matches array with slots filled in (and courts freed for newly
// ready matches so the auto-assign loop can pick them up).
// 'standings' = result of calculateStandings. 'wildcardMap' = { matchIdx: teamId }
// for wildcard slots when all groups are done.
export const fillBracket32Slots = (matches, teams, standings, wildcardMap = {}) => {
    const newMatches = JSON.parse(JSON.stringify(matches));

    const getGroupNum = (gStr) => parseInt(String(gStr).replace(/[^0-9]/g, ''), 10);

    // Build lookup: groupNum → { 1: teamId, 2: teamId, 3: teamId }
    const rankMap = {};
    Object.entries(standings).forEach(([gName, groupTeams]) => {
        const gNum = getGroupNum(gName);
        if (!rankMap[gNum]) rankMap[gNum] = {};
        groupTeams.forEach((t, idx) => { rankMap[gNum][idx + 1] = t.id; });
    });

    FIXED_BRACKET_LAYOUT.forEach((def, idx) => {
        const match = newMatches.find(m => m.id === `ko32_m${idx + 1}`);
        if (!match) return;

        // Sync slots for PENDING matches
        if (match.status === 'PENDING') {
            // Side A
            if (def.a.g === 'W') {
                if (wildcardMap[idx] !== undefined) match.team_a_id = wildcardMap[idx];
            } else {
                const tid = rankMap[def.a.g]?.[def.a.rank];
                if (tid) match.team_a_id = tid;
            }

            // Side B
            if (def.b.g === 'W') {
                if (wildcardMap[idx] !== undefined) match.team_b_id = wildcardMap[idx];
            } else {
                const tid = rankMap[def.b.g]?.[def.b.rank];
                if (tid) match.team_b_id = tid;
            }
        }

        // If both sides are now filled (and match hasn't started), mark ready for court assignment
        if (match.team_a_id !== 'TBD' && match.team_b_id !== 'TBD' &&
            match.status === 'PENDING' && !match.court_id) {
            match._readyForCourt = true; // flag for court assignment loop
        }
    });

    return newMatches;
};

// Generate 32-team Knockout Bracket (Fixed Mapping)

export const generateBracket32 = (top32Teams, groupedStandings) => {
    // 1. Separate Top 32 into 1sts, 2nds, and Wildcards (3rds)
    // We can rely on groupRank from top32Teams
    const map1st = {}; // { 1: team, 2: team ... }
    const map2nd = {};
    const wildcards = [];

    // Safe parsing of numbers from "1조"
    const getGroupNum = (team) => {
        let groupStr = team.initial_group || team.group_id || team.group || "";
        return parseInt(String(groupStr).replace(/[^0-9]/g, ''), 10);
    };

    top32Teams.forEach(t => {
        if (t.id === 'BYE') return;
        const gNum = getGroupNum(t);
        if (t.groupRank === 1) map1st[gNum] = t;
        else if (t.groupRank === 2) map2nd[gNum] = t;
        else if (t.groupRank === 3) wildcards.push(t);
    });

    // 2. Define the exact fixed bracket mapping (1-16)
    // "W" implies a wildcard slot (3위)
    const fixedLayout = [
        { a: { rank: 1, g: 1 }, b: { rank: 2, g: 5 } },   // M1
        { a: { rank: 1, g: 2 }, b: { rank: 3, g: 'W' } }, // M2
        { a: { rank: 1, g: 3 }, b: { rank: 2, g: 7 } },   // M3
        { a: { rank: 1, g: 4 }, b: { rank: 3, g: 'W' } }, // M4
        { a: { rank: 1, g: 5 }, b: { rank: 3, g: 'W' } }, // M5
        { a: { rank: 1, g: 6 }, b: { rank: 2, g: 10 } },  // M6
        { a: { rank: 1, g: 7 }, b: { rank: 3, g: 'W' } }, // M7
        { a: { rank: 1, g: 8 }, b: { rank: 2, g: 12 } },  // M8
        // -- Split (우측 화면)
        { a: { rank: 1, g: 9 }, b: { rank: 3, g: 'W' } }, // M9
        { a: { rank: 1, g: 10 }, b: { rank: 2, g: 6 } },   // M10
        { a: { rank: 1, g: 11 }, b: { rank: 3, g: 'W' } }, // M11
        { a: { rank: 1, g: 12 }, b: { rank: 2, g: 8 } },   // M12
        { a: { rank: 2, g: 4 }, b: { rank: 2, g: 9 } },   // M13
        { a: { rank: 2, g: 3 }, b: { rank: 3, g: 'W' } }, // M14
        { a: { rank: 2, g: 2 }, b: { rank: 2, g: 11 } },  // M15
        { a: { rank: 2, g: 1 }, b: { rank: 3, g: 'W' } }  // M16
    ];

    // Helper to fetch the actual team object
    const getTeam = (slot) => {
        if (slot.g === 'W') return null; // Resolved later
        return slot.rank === 1 ? map1st[slot.g] : map2nd[slot.g];
    };

    // 3. Setup Wildcard assignment constraints
    // Find all 'W' slots and mark their opponents
    const wildcardSlots = []; // { indexInMatch, opponentTeam }
    fixedLayout.forEach((matchDef, idx) => {
        if (matchDef.a.g === 'W') wildcardSlots.push({ idx, opponent: getTeam(matchDef.b) });
        if (matchDef.b.g === 'W') wildcardSlots.push({ idx, opponent: getTeam(matchDef.a) });
    });

    // Run backtracking to safely place wildcards
    let assignedWildcards = [];
    if (wildcards.length > 0) {
        assignedWildcards = assignWildcards(wildcards, wildcardSlots, null);
    }

    // We map back to the wildcardSlots
    const assignedWildcardMap = {}; // matchIdx -> Assigned Wildcard Team
    wildcardSlots.forEach((slot, wIdx) => {
        assignedWildcardMap[slot.idx] = assignedWildcards[wIdx] || { id: 'BYE', name: 'BYE', player1: 'BYE' };
    });

    // 4. Construct matches in order
    const matches = [];
    fixedLayout.forEach((matchDef, idx) => {
        let teamA = matchDef.a.g === 'W' ? assignedWildcardMap[idx] : getTeam(matchDef.a);
        let teamB = matchDef.b.g === 'W' ? assignedWildcardMap[idx] : getTeam(matchDef.b);

        // Fallbacks for missing teams
        teamA = teamA || { id: 'BYE', name: 'BYE', player1: 'BYE', player2: '', club: '' };
        teamB = teamB || { id: 'BYE', name: 'BYE', player1: 'BYE', player2: '', club: '' };

        matches.push({
            id: `ko32_m${idx + 1}`,
            group_id: "본선 32강",
            round: 10 + idx, // arbitrary ordering
            team_a_id: teamA.id,
            team_b_id: teamB.id,
            score_a: 0,
            score_b: 0,
            status: "PENDING",
            court_id: null,
            winner_id: null,
            next_match_id: `ko16_m${Math.floor(idx / 2) + 1}`,
            is_team_a_next: idx % 2 === 0
        });
    });

    // 5. Pre-generate matches for 16, 8, 4, Final
    const generateEmptyRound = (prevCount, prefix, name, baseRound, nextPrefix) => {
        const roundMatches = [];
        const count = prevCount / 2;
        for (let i = 0; i < count; i++) {
            let nextMatchId = null;
            let isTeamANext = false;
            if (nextPrefix) {
                nextMatchId = `${nextPrefix}_m${Math.floor(i / 2) + 1}`;
                isTeamANext = i % 2 === 0;
            }
            roundMatches.push({
                id: `${prefix}_m${i + 1}`,
                group_id: name,
                round: baseRound + i,
                team_a_id: "TBD",
                team_b_id: "TBD",
                score_a: 0,
                score_b: 0,
                status: "PENDING",
                court_id: null,
                winner_id: null,
                next_match_id: nextMatchId,
                is_team_a_next: isTeamANext
            });
        }
        return roundMatches;
    };

    const matches16 = generateEmptyRound(16, "ko16", "16강", 30, "ko8");
    const matches8 = generateEmptyRound(8, "ko8", "8강", 40, "ko4");
    const matches4 = generateEmptyRound(4, "ko4", "4강", 50, "final");
    const matchesFinal = generateEmptyRound(2, "final", "결승", 60, null);

    return [...matches, ...matches16, ...matches8, ...matches4, ...matchesFinal];
};

// Auto-advance winners in the knockout stage
export const updateTournamentProgression = (matches, completedMatchId, winnerId) => {
    // Deep copy to avoid mutating state directly
    const newMatches = JSON.parse(JSON.stringify(matches));

    const completedMatch = newMatches.find(m => m.id === completedMatchId);
    if (!completedMatch || !completedMatch.next_match_id || !winnerId) {
        return newMatches; // No advancement needed/possible
    }

    const nextMatch = newMatches.find(m => m.id === completedMatch.next_match_id);
    if (nextMatch) {
        if (completedMatch.is_team_a_next) {
            nextMatch.team_a_id = winnerId;
        } else {
            nextMatch.team_b_id = winnerId;
        }
    }

    return newMatches;
};

// Generate 16-team Random Bracket
// For standard 16 teams remaining, totally random draw
export const generateBracket16Random = (teams) => {
    // Shuffle teams
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const matches = [];
    const numMatches = 8; // Round of 16 has 8 matches

    for (let i = 0; i < numMatches; i++) {
        const teamA = shuffled[i * 2];
        const teamB = shuffled[i * 2 + 1];

        matches.push({
            id: `ko16_m${i + 1}`,
            group_id: "본선 16강 (무작위)",
            round: 30 + i, // Arbitrary round number to sort them after 32-gang
            team_a_id: teamA ? teamA.id : "BYE",
            team_b_id: teamB ? teamB.id : "BYE",
            score_a: 0,
            score_b: 0,
            status: "PENDING",
            court_id: null,
            winner_id: null
        });
    }

    return matches;
};

// Generate Next Knockout Round (16강, 8강, 4강, 결승)
// Pairs winners of prevMatches ordered sequentially
export const generateNextRound = (prevMatches, nextGroupName, nextMatchPrefix, nextRoundIndex) => {
    const matches = [];
    // Number of matches in next round is half of previous round
    const numMatches = Math.floor(prevMatches.length / 2);

    for (let i = 0; i < numMatches; i++) {
        const m1 = prevMatches[i * 2];
        const m2 = prevMatches[i * 2 + 1];

        // If previous match is completed, we have a winner. Otherwise TBD.
        const teamA = m1?.winner_id || "TBD";
        const teamB = m2?.winner_id || "TBD";

        matches.push({
            id: `${nextMatchPrefix}_m${i + 1}`,
            group_id: nextGroupName,
            round: nextRoundIndex,
            team_a_id: teamA,
            team_b_id: teamB,
            score_a: 0,
            score_b: 0,
            status: "PENDING",
            court_id: null,
            winner_id: null
        });
    }

    return matches;
};
