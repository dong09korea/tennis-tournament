import fs from 'fs';
import { generateGroups, generateSchedule, calculateStandings } from './src/utils/tournamentLogic.js';

// Mock Teams
const mockTeams = Array.from({ length: 48 }, (_, i) => ({
    id: `t${i + 1}`,
    name: `Player1_${i + 1}/Player2_${i + 1}`,
    drawOrder: i + 1, // Simulated seed order (1 to 48)
}));

// Simulate adding them to groups
// Assuming AdminDashboardNew logic: 1st drawOrder goes to 1조, 2nd to 2조, etc. 
// Or let generateGroups distribute them based on drawOrder alone
console.log(">> 1. Generating Groups...");
const groups = generateGroups(mockTeams, 12);

console.log("\n>> 2. First Group Composition (Should be drawOrder 1, 13, 25, 37 if evenly distributed, but with simple fallback it might be 1, 2, 3, 4)");
const group1TeamIds = groups[0].team_ids;
const group1Teams = group1TeamIds.map(id => mockTeams.find(t => t.id === id));
console.log("Group 1 Teams:");
group1Teams.forEach((t, index) => {
    console.log(`  Team ${index + 1}: ${t.name} (drawOrder: ${t.drawOrder})`);
});

console.log("\n>> 3. Generating Schedule...");
const matches = generateSchedule(groups);

const group1Matches = matches.filter(m => m.group_id === groups[0].id);

console.log("\n>> 4. Group 1 Matches (Checking if Match 1 is Team 1 vs Team 2):");
group1Matches.forEach(m => {
    const tA = mockTeams.find(t => t.id === m.team_a_id);
    const tB = mockTeams.find(t => t.id === m.team_b_id);
    console.log(`  Match ${m.match_in_group} (Round ${m.round}): ${tA.name} [do:${tA.drawOrder}] vs ${tB.name} [do:${tB.drawOrder}]`);
});

console.log("\n>> 5. Checking Standings sorting directly (0 games played)");
const standings = calculateStandings(mockTeams, matches);
const group1Standings = standings['1조'];
console.log("Group 1 Standings (Should match Group 1 Teams exactly):");
group1Standings?.forEach((t, index) => {
    console.log(`  Rank ${index + 1}: ${t.name} (drawOrder: ${t.drawOrder})`);
});

console.log("\n>> 6. ALL Group First Matches");
const allFirstMatches = matches.filter(m => m.match_in_group === 1);
allFirstMatches.forEach(m => {
    const tA = mockTeams.find(t => t.id === m.team_a_id);
    const tB = mockTeams.find(t => t.id === m.team_b_id);
    console.log(`  Group ${m.group_id} Match 1: ${tA.name} [do:${tA.drawOrder}] vs ${tB.name} [do:${tB.drawOrder}] (Round: ${m.round})`);
});
