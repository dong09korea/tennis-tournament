
import { 
    generateGroups, 
    generateSchedule, 
    assignMatchesToCourts, 
    calculateStandings, 
    updateTournamentProgression,
    initBracket32Shell,
    fillBracket32Slots,
    getTop32Teams,
    generateBracket32,
    FIXED_BRACKET_LAYOUT
} from './src/utils/tournamentLogic.js';

const NUM_TEAMS = 48;
const NUM_GROUPS = 12;
const NUM_COURTS = 10;

async function runSimulation() {
    console.log("=== Tennis Tournament Full Simulation (10 Courts) ===");
    
    const teams = Array.from({ length: NUM_TEAMS }, (_, i) => ({
        id: 't' + (i + 1),
        name: 'Team ' + (i + 1),
        player1: 'P1_' + (i + 1),
        player2: 'P2_' + (i + 1),
        club: 'Test Club',
        drawOrder: i + 1,
        initial_group: (Math.floor(i / (NUM_TEAMS/NUM_GROUPS)) + 1) + 'Group'
    }));

    const groups = generateGroups(teams, NUM_GROUPS);
    const groupMatches = generateSchedule(groups);
    const bracketMatches = initBracket32Shell();
    
    let allMatches = [...groupMatches, ...bracketMatches];
    let courts = Array.from({ length: NUM_COURTS }, (_, i) => ({ id: i + 1, match_id: null }));
    
    let step = 0;
    let completedCount = 0;
    let wildcardPushed = false;

    while (completedCount < allMatches.length) {
        step++;
        
        // 1. Progressively fill bracket with group winners
        const standings = calculateStandings(teams, allMatches);
        allMatches = fillBracket32Slots(allMatches, teams, standings);

        // 2. If all group matches done, push wildcards
        const groupMatchesDone = allMatches.filter(m => m.id.startsWith('g')).every(m => m.status === 'COMPLETED');
        if (groupMatchesDone && !wildcardPushed) {
            console.log(">>> All group matches done. Pushing wildcards...");
            const overallTop32 = getTop32Teams(standings);
            const tempBracket = generateBracket32(overallTop32);
            
            const wMap = {};
            tempBracket.filter(m => String(m.group_id).includes('32')).forEach((m, idx) => {
                wMap[idx] = { a: m.team_a_id, b: m.team_b_id };
            });

            // Update allMatches with wildcard IDs
            allMatches = allMatches.map(m => {
                const gid = String(m.group_id);
                if (!gid.includes('32')) return m;
                const idxNum = parseInt(m.id.replace('ko32_m', ''));
                if (isNaN(idxNum)) return m;
                const idx = idxNum - 1;
                const curDef = FIXED_BRACKET_LAYOUT[idx];
                if (!curDef) return m;

                let newM = { ...m };
                if (curDef.a.g === 'W' && wMap[idx]?.a) newM.team_a_id = wMap[idx].a;
                if (curDef.b.g === 'W' && wMap[idx]?.b) newM.team_b_id = wMap[idx].b;
                return newM;
            });
            wildcardPushed = true;
        }

        // 3. Auto-assign courts
        const assignResult = assignMatchesToCourts(allMatches, courts);
        allMatches = assignResult.matches;
        courts = assignResult.courts;

        // 4. Complete ONE match
        const liveMatches = allMatches.filter(m => m.status === 'LIVE');
        if (liveMatches.length === 0) {
            if (completedCount === allMatches.length) break;
            
            const ready = allMatches.filter(m => m.status === 'PENDING' && m.team_a_id !== 'TBD' && m.team_b_id !== 'TBD');
            if (ready.length === 0) {
                console.log("Blocked at step " + step + ". Total " + completedCount + "/" + allMatches.length + ".");
                break;
            }
            continue;
        }

        const match = liveMatches[0];
        match.status = 'COMPLETED';
        match.score_a = 6;
        match.score_b = Math.floor(Math.random() * 5);
        match.winner_id = match.team_a_id;
        
        const court = courts.find(c => c.id === match.court_id);
        if (court) court.match_id = null;
        match.court_id = null;
        completedCount++;

        // 5. Propagate
        allMatches = updateTournamentProgression(allMatches, match.id, match.winner_id);

        if (step % 50 === 0 || String(match.group_id).includes('final')) {
            console.log("Step " + step + ": " + match.id + " done. [" + completedCount + "/" + allMatches.length + "]");
        }
    }

    const final = allMatches.find(m => m.id === 'final_m1');
    if (final) {
        console.log("\nFinal result: " + final.team_a_id + " " + final.score_a + ":" + final.score_b + " " + final.team_b_id);
        console.log("Winner: " + final.winner_id);
    }
}

runSimulation();
