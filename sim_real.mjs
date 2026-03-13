import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { calculateStandings, getTop32Teams, generateBracket32, fillBracket32Slots, FIXED_BRACKET_LAYOUT } from './src/utils/tournamentLogic.js';

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runRealSim() {
    console.log("=== fetching real data ===");
    
    // Fetch Teams
    const teamsSnap = await getDocs(collection(db, "tennis_teams"));
    const teams = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Loaded ${teams.length} teams.`);

    // Fetch Matches
    const matchesSnap = await getDocs(collection(db, "tennis_matches"));
    let matches = matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`Loaded ${matches.length} matches.`);

    // 1. Force all group matches to be COMPLETED randomly
    console.log("== Simulating incomplete group matches ==");
    let groupMatchesDone = 0;
    matches = matches.map(m => {
        if ((typeof m.group_id === 'number' || String(m.group_id).includes("조")) && m.status !== 'COMPLETED') {
            // Randomly win, lose or draw
            // We use 6:something, or 5:5
            const rand = Math.random();
            let score_a, score_b, winner_id;
            if (rand < 0.2) {
                // draw
                score_a = 5; score_b = 5; winner_id = null;
            } else if (rand < 0.6) {
                // A wins
                score_a = 6; score_b = Math.floor(Math.random() * 5); winner_id = m.team_a_id;
            } else {
                // B wins
                score_a = Math.floor(Math.random() * 5); score_b = 6; winner_id = m.team_b_id;
            }
            groupMatchesDone++;
            return { ...m, status: 'COMPLETED', score_a, score_b, winner_id };
        }
        return m;
    });
    console.log(`Simulated ${groupMatchesDone} group matches.`);

    // 2. Calculate Standings
    const standings = calculateStandings(teams, matches);
    
    // 3. Get Top 32
    console.log("== Getting Top 32 ==");
    const top32 = getTop32Teams(standings);
    console.log(`Top 32 count: ${top32.length}`);

    // Count wildcards
    const wildcards = top32.filter(t => t && t.groupRank === 3 && t.id !== 'BYE');
    console.log(`Wildcards found: ${wildcards.length}`);
    wildcards.forEach(w => console.log(`  - ${w.name} (${w.originalGroup} / rank ${w.wildcardRank})`));

    // 4. Generate Bracket
    console.log("== Generating Bracket 32 ==");
    let bracket = [];
    try {
        bracket = generateBracket32(top32, standings);
    } catch (e) {
        console.error("ERROR IN BRACKET GEN", e);
    }
    
    // Output Bracket mapping
    const b32 = bracket.filter(m => String(m.group_id).includes('32'));
    const finalReport = { wildcards, bracket32: [] };

    b32.forEach(m => {
        const teamA = teams.find(t => t.id === m.team_a_id) || { name: m.team_a_id, originalGroup: '' };
        const teamB = teams.find(t => t.id === m.team_b_id) || { name: m.team_b_id, originalGroup: '' };
        
        const curDef = FIXED_BRACKET_LAYOUT.find((_, i) => m.id === `ko32_m${i+1}`);
        let rulesA = curDef ? `${curDef.a.g}조${curDef.a.rank}` : "";
        let rulesB = curDef ? (curDef.b.g === 'W' ? `W${curDef.b.w}` : `${curDef.b.g}조${curDef.b.rank}`) : "";

        finalReport.bracket32.push({
            matchId: m.id,
            teamA: { id: teamA.id, name: teamA.name, group: teamA.originalGroup },
            teamB: { id: teamB.id, name: teamB.name, group: teamB.originalGroup },
            ruleA: rulesA,
            ruleB: rulesB,
            sameGroupClash: (teamA.originalGroup && teamA.originalGroup === teamB.originalGroup)
        });
    });
    
    fs.writeFileSync('C:/tmp/sim_results.json', JSON.stringify(finalReport, null, 2), 'utf8');

    console.log("JSON written to C:/tmp/sim_results.json");
    process.exit(0);
}

runRealSim();
