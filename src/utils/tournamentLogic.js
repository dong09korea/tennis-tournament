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



// Utility to identify if a match is a group-stage match
export const isGroupMatch = (m) => {
    const g = m.group_id;
    return typeof g === 'number' || (typeof g === 'string' && g.includes('조')) || /^\d+$/.test(String(g));
};

// Strict Court Schedule for Group Stages (from user image)
const FIXED_COURT_SCHEDULE = {
    "1": [ { g: 11, m: 1 }, { g: 1, m: 1 }, { g: 12, m: 2 }, { g: 1, m: 2 }, { g: 11, m: 5 }, { g: 12, m: 5 }, { g: 1, m: 3 } ],
    "2": [ { g: 2, m: 1 }, { g: 11, m: 2 }, { g: 2, m: 2 }, { g: 2, m: 3 }, { g: 2, m: 4 }, { g: 2, m: 5 }, { g: 2, m: 6 } ],
    "3": [ { g: 3, m: 1 }, { g: 3, m: 2 }, { g: 11, m: 3 }, { g: 3, m: 3 }, { g: 3, m: 4 }, { g: 3, m: 5 }, { g: 3, m: 6 } ],
    "4": [ { g: 4, m: 1 }, { g: 4, m: 2 }, { g: 4, m: 3 }, { g: 11, m: 4 }, { g: 4, m: 4 }, { g: 4, m: 5 }, { g: 4, m: 6 } ],
    "5": [ { g: 5, m: 1 }, { g: 5, m: 2 }, { g: 5, m: 3 }, { g: 5, m: 4 }, { g: 5, m: 5 }, { g: 5, m: 6 }, { g: 12, m: 6 } ],
    "6": [ { g: 6, m: 1 }, { g: 6, m: 2 }, { g: 6, m: 3 }, { g: 6, m: 4 }, { g: 6, m: 5 }, { g: 11, m: 6 }, { g: 6, m: 6 } ],
    "7": [ { g: 7, m: 1 }, { g: 7, m: 2 }, { g: 7, m: 3 }, { g: 7, m: 4 }, { g: 12, m: 4 }, { g: 7, m: 5 }, { g: 7, m: 6 } ],
    "8": [ { g: 8, m: 1 }, { g: 8, m: 2 }, { g: 8, m: 3 }, { g: 12, m: 3 }, { g: 8, m: 4 }, { g: 8, m: 5 }, { g: 8, m: 6 } ],
    "9": [ { g: 9, m: 1 }, { g: 9, m: 2 }, { g: 9, m: 3 }, { g: 9, m: 4 }, { g: 9, m: 5 }, { g: 9, m: 6 } ],
    "10": [ { g: 10, m: 1 }, { g: 12, m: 1 }, { g: 10, m: 2 }, { g: 10, m: 3 }, { g: 10, m: 4 }, { g: 10, m: 5 }, { g: 10, m: 6 } ]
};

// Assign Matches to Courts
// Returns updated { matches, courts }
export const assignMatchesToCourts = (matches, courts) => {
    // Deep copy to avoid mutation issues during calculation
    let nextMatches = JSON.parse(JSON.stringify(matches));
    let nextCourts = JSON.parse(JSON.stringify(courts));

    const getGroupNum = (gStr) => parseInt(String(gStr).replace(/[^0-9]/g, ''), 10);

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

    // 3. Keep a dynamic fallback queue ONLY for matches that are not in the fixed schedule (e.g., knockouts)
    // -> DISABLED: Users requested MANUAL assignment for 32강 and beyond.
    let pendingKnockoutMatches = [];

    // Sort by round ascending so earlier matches get priority
    pendingKnockoutMatches.sort((a, b) => a.round - b.round);

    // 4. Assign Courts
    for (const court of emptyCourts) {
        let courtAssigned = false;
        const courtStrId = String(court.id);
        const fixedQueue = FIXED_COURT_SCHEDULE[courtStrId];

        // 4.1. Try to assign from strict group schedule
        if (fixedQueue) {
            for (const item of fixedQueue) {
                const scheduledMatch = nextMatches.find(m =>
                    isGroupMatch(m) &&
                    getGroupNum(m.group_id) === item.g &&
                    m.match_in_group === item.m
                );

                if (scheduledMatch) {
                    if (scheduledMatch.status !== 'COMPLETED') {
                        // Priority 1: If ready, assign immediately and move to next court
                        if (scheduledMatch.status === 'PENDING' &&
                            !scheduledMatch.court_id &&
                            !busyTeams.has(scheduledMatch.team_a_id) &&
                            !busyTeams.has(scheduledMatch.team_b_id) &&
                            scheduledMatch.team_a_id !== 'TBD' && scheduledMatch.team_a_id !== 'BYE' &&
                            scheduledMatch.team_b_id !== 'TBD' && scheduledMatch.team_b_id !== 'BYE') 
                        {
                            scheduledMatch.status = 'LIVE';
                            scheduledMatch.court_id = court.id;
                            court.match_id = scheduledMatch.id;

                            busyTeams.add(scheduledMatch.team_a_id);
                            busyTeams.add(scheduledMatch.team_b_id);
                            courtAssigned = true;
                            break; // Court assigned, stop search for this court
                        } 
                        
                        // Priority 2: If already playing here, mark as assigned and stop
                        if (scheduledMatch.status === 'LIVE' && scheduledMatch.court_id === court.id) {
                            courtAssigned = true;
                            break;
                        }

                        // Priority 3: If PENDING but NOT READY (busy teams), DO NOT block.
                        // Instead, continue searching the rest of the fixed queue for this court.
                        // This avoids idle time if the intended match is waiting for a team.
                    }
                }
            }
        }

        // 4.2. Fallback to Dynamic Queue (Knockouts OR fully finished containers)
        if (!courtAssigned) {
            // Find any match that is ready to play (not blocked by fixed schedule/busy teams)
            // User said: "If court 1 is finished, fill matches automatically"
            const candidateIndex = nextMatches.findIndex(m =>
                m.status === 'PENDING' &&
                !m.court_id &&
                m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
                m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE' &&
                !busyTeams.has(m.team_a_id) && !busyTeams.has(m.team_b_id)
            );

            if (candidateIndex !== -1) {
                const match = nextMatches[candidateIndex];

                match.status = 'LIVE';
                match.court_id = court.id;
                
                court.match_id = match.id;

                busyTeams.add(match.team_a_id);
                busyTeams.add(match.team_b_id);
                courtAssigned = true;
            }
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

            const scoreA = parseInt(m.score_a, 10) || 0;
            const scoreB = parseInt(m.score_b, 10) || 0;

            teamA.pointsFor += scoreA;
            teamA.pointsAgainst += scoreB;
            teamB.pointsFor += scoreB;
            teamB.pointsAgainst += scoreA;

            // Track total games won (individual game/set points)
            teamA.gamesWon += scoreA;
            teamB.gamesWon += scoreB;

            // Tennis scoring: Group stage ties are draws.
            // Explicit winner_id takes precedence, otherwise compare scores.
            const isDraw = (scoreA === scoreB);
            
            if (m.winner_id === teamA.id || (!isDraw && scoreA > scoreB)) {
                teamA.wins += 1;
                teamB.losses += 1;
            } else if (m.winner_id === teamB.id || (!isDraw && scoreB > scoreA)) {
                teamB.wins += 1;
                teamA.losses += 1;
            } else if (isDraw) {
                // If it's a tie, nobody has an explicit winner_id
                teamA.draws += 1;
                teamB.draws += 1;
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
        // Safe parsing of numbers from "1조" or 1
        const getGroupNum = (team) => {
            let groupStr = team.initial_group || team.group_id || team.group || team.originalGroup || "";
            return parseInt(String(groupStr).replace(/[^0-9]/g, ''), 10);
        };

        // Special handling for 1조3등 (Group 1 third placer)
        const group1Third = thirdPlacers.find(t => getGroupNum(t) === 1);
        const otherThirdPlacers = thirdPlacers.filter(t => getGroupNum(t) !== 1);

        const wildcardSlots = needed;
        const otherWildcardCount = group1Third ? wildcardSlots - 1 : wildcardSlots;

        const selectedOtherThirds = otherThirdPlacers.slice(0, otherWildcardCount);

        if (group1Third) {
            group1Third.wildcardRank = '1조3등';
            top32.push(group1Third); // 1조 3위 무조건 포함
        }

        selectedOtherThirds.forEach((t, i) => {
            t.wildcardRank = i + 1; // 1 to 7
        });

        top32 = [...top32, ...selectedOtherThirds];
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
const assignWildcards = (wildcardTeams, exactBracketSlots) => {
    // exactBracketSlots: array of objects { idx, opponent, expectedW }
    const assignedSlots = new Array(8).fill(null);
    const usedWildcards = new Set();

    const getGroupNum = (team) => {
        if (!team) return null;
        let groupStr = team.initial_group || team.group_id || team.group || "";
        return parseInt(String(groupStr).replace(/[^0-9]/g, ''), 10);
    };

    // The sequential order of wildcards for the "shift to next rank" logic
    const wRanks = [1, 2, 3, 4, 5, 6, 7, '1조3등'];
    
    // Create a map for quick lookup
    const wMap = {};
    wildcardTeams.forEach(t => {
        wMap[t.wildcardRank] = t;
    });

    const backtrack = (slotIdx) => {
        if (slotIdx === 8) return true; // All 8 wildcards assigned successfully

        const slot = exactBracketSlots[slotIdx];
        const opponentGroup = getGroupNum(slot.opponent);

        // Find where the slot's expected 'w' is in the sequence
        const startIdx = wRanks.indexOf(slot.expectedW);
        
        // Generate preference order: expectedW -> next -> next ... wrap around
        const preferredRanks = [];
        if (startIdx !== -1) {
            for (let i = 0; i < 8; i++) {
                preferredRanks.push(wRanks[(startIdx + i) % 8]);
            }
        } else {
            // Fallback just in case
            preferredRanks.push(...wRanks);
        }

        for (const wRank of preferredRanks) {
            const wTeam = wMap[wRank];
            if (!wTeam) continue; // Should not happen if exactly 8 valid teams

            if (usedWildcards.has(wTeam.id)) continue;

            const wGroup = getGroupNum(wTeam);

            // Constraint: Wildcard team cannot face a team from the same group
            if (opponentGroup !== wGroup) {
                // Try assigning
                assignedSlots[slotIdx] = wTeam;
                usedWildcards.add(wTeam.id);

                if (backtrack(slotIdx + 1)) return true;

                // Undo
                assignedSlots[slotIdx] = null;
                usedWildcards.delete(wTeam.id);
            }
        }
        return false;
    };

    if (!backtrack(0)) {
        console.warn("Could not find a perfect wildcard assignment constraint. Falling back.");
        return wildcardTeams; // Just return them sequentially
    }

    return assignedSlots;
};

// ─── Shared fixed bracket layout ────────────────────────────────────────────
// Describes which group rank fills each of the 16 first-round match slots.
// 'W' = wildcard (조 3위). Used by both shell init and progressive filling.
export const FIXED_BRACKET_LAYOUT = [
    { a: { rank: 1, g: 1 }, b: { rank: 2, g: 5 } },                           // M1: 1조1위 vs 5조2위
    { a: { rank: 1, g: 2 }, b: { rank: 3, g: 'W', w: 4 } },                   // M2: 2조1위 vs 3위 4등
    { a: { rank: 1, g: 3 }, b: { rank: 2, g: 7 } },                           // M3: 3조1위 vs 7조2위
    { a: { rank: 1, g: 4 }, b: { rank: 3, g: 'W', w: 5 } },                   // M4: 4조1위 vs 3위 5등
    { a: { rank: 1, g: 5 }, b: { rank: 3, g: 'W', w: 6 } },                   // M5: 5조1위 vs 3위 6등
    { a: { rank: 1, g: 6 }, b: { rank: 2, g: 10 } },                          // M6: 6조1위 vs 10조2위
    { a: { rank: 1, g: 7 }, b: { rank: 3, g: 'W', w: 7 } },                   // M7: 7조1위 vs 3위 7등
    { a: { rank: 1, g: 8 }, b: { rank: 2, g: 12 } },                          // M8: 8조1위 vs 12조2위
    
    { a: { rank: 1, g: 9 }, b: { rank: 3, g: 'W', w: '1조3등' } },            // M9: 9조1위 vs 1조 3등
    { a: { rank: 1, g: 10 }, b: { rank: 2, g: 6 } },                          // M10: 10조1위 vs 6조2위
    { a: { rank: 1, g: 11 }, b: { rank: 3, g: 'W', w: 3 } },                  // M11: 11조1위 vs 3위 3등
    { a: { rank: 1, g: 12 }, b: { rank: 2, g: 8 } },                          // M12: 12조1위 vs 8조2위
    { a: { rank: 2, g: 4 }, b: { rank: 2, g: 9 } },                           // M13: 4조2위 vs 9조2위
    { a: { rank: 2, g: 3 }, b: { rank: 3, g: 'W', w: 2 } },                   // M14: 3조2위 vs 3위 2등
    { a: { rank: 2, g: 2 }, b: { rank: 2, g: 11 } },                          // M15: 2조2위 vs 11조2위
    { a: { rank: 2, g: 1 }, b: { rank: 3, g: 'W', w: 1 } }                    // M16: 1조2위 vs 3위 1등
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
        ...generateEmptyRound(8, 'ko16', '본선 16강', 2000, 'ko8'),
        ...generateEmptyRound(4, 'ko8', '본선 8강', 3000, 'ko4'),
        ...generateEmptyRound(2, 'ko4', '본선 4강', 4000, 'final'),
        ...generateEmptyRound(1, 'final', '본선 결승', 5000, null)
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

    // 2. We use the global FIXED_BRACKET_LAYOUT for exact mappings.

    // Helper to fetch the actual team object
    const getTeam = (slot) => {
        if (slot.g === 'W') return null; // Resolved later
        return slot.rank === 1 ? map1st[slot.g] : map2nd[slot.g];
    };

    // 3. Setup Wildcard assignment constraints
    const wildcardSlots = []; // { indexInMatch, opponentTeam, expectedW }
    FIXED_BRACKET_LAYOUT.forEach((matchDef, idx) => {
        if (matchDef.a.g === 'W') wildcardSlots.push({ idx, opponent: getTeam(matchDef.b), expectedW: matchDef.a.w });
        if (matchDef.b.g === 'W') wildcardSlots.push({ idx, opponent: getTeam(matchDef.a), expectedW: matchDef.b.w });
    });

    // Run backtracking to safely place wildcards
    let assignedWildcards = [];
    if (wildcards.length === 8) {
        assignedWildcards = assignWildcards(wildcards, wildcardSlots);
    } else if (wildcards.length > 0) {
        assignedWildcards = wildcards; // fallback if not exactly 8
    }

    // We map back to the wildcardSlots
    const assignedWildcardMap = {}; // matchIdx -> Assigned Wildcard Team
    wildcardSlots.forEach((slot, wIdx) => {
        assignedWildcardMap[slot.idx] = assignedWildcards[wIdx] || { id: 'BYE', name: 'BYE', player1: 'BYE' };
    });

    // 4. Construct matches in order
    const matches = [];
    FIXED_BRACKET_LAYOUT.forEach((matchDef, idx) => {
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

    const matches16 = generateEmptyRound(16, "ko16", "본선 16강", 2000, "ko8");
    const matches8 = generateEmptyRound(8, "ko8", "본선 8강", 3000, "ko4");
    const matches4 = generateEmptyRound(4, "ko4", "본선 4강", 4000, "final");
    const matchesFinal = generateEmptyRound(2, "final", "본선 결승", 5000, null);

    return [...matches, ...matches16, ...matches8, ...matches4, ...matchesFinal];
};

// Auto-advance winners in the knockout stage
export const updateTournamentProgression = (matches, completedMatchId, winnerId) => {
    const newMatches = JSON.parse(JSON.stringify(matches));
    const completedMatch = newMatches.find(m => m.id === completedMatchId);
    
    // If no match or no next match, nothing to do
    if (!completedMatch || !completedMatch.next_match_id) return newMatches;

    const nextMatch = newMatches.find(m => m.id === completedMatch.next_match_id);
    if (!nextMatch) return newMatches;

    // Source of truth for the slot is the winnerId (or TBD if blank)
    const val = winnerId || 'TBD';

    if (completedMatch.is_team_a_next) {
        nextMatch.team_a_id = val;
    } else {
        nextMatch.team_b_id = val;
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
