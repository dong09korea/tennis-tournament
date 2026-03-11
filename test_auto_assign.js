import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    projectId: "donghyeon-match"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    console.log("Fetching live data...");
    
    // Dynamic import to support ES modules locally
    const { assignMatchesToCourts } = await import("file://" + process.cwd().replace(/\\/g, '/') + "/src/utils/tournamentLogic.js");

    const matchesSnap = await getDocs(collection(db, "tennis_matches"));
    const matches = matchesSnap.docs.map(d => ({id: d.id, ...d.data()}));
    
    const courtsSnap = await getDocs(collection(db, "tennis_courts"));
    const courts = courtsSnap.docs.map(d => ({id: d.id, ...d.data()}));

    const emptyCourts = courts.filter(c => c.match_id === null || !matches.find(m => m.id === c.match_id && m.status === 'LIVE'));
    console.log("Empty courts:", emptyCourts.map(c => c.id));
    console.log("Current court assignments:");
    courts.forEach(c => console.log(`- Court ${c.id}: ${c.match_id}`));

    let pendingMatches = matches.filter(m =>
        m.status === 'PENDING' &&
        !m.court_id &&
        m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
        m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE'
    );
    console.log("Pending matches count:", pendingMatches.length);

    pendingMatches.sort((a, b) => a.round - b.round);

    const busyTeams = new Set();
    matches.filter(m => m.status === 'LIVE').forEach(m => {
        busyTeams.add(m.team_a_id);
        busyTeams.add(m.team_b_id);
    });
    console.log("Busy teams count:", [...busyTeams].length);

    console.log("First 5 PendingMatches:");
    pendingMatches.slice(0, 5).forEach(m => {
        const canPlay = !busyTeams.has(m.team_a_id) && !busyTeams.has(m.team_b_id);
        console.log(`- Match ${m.id} [${m.group_id} R${m.round}] (${m.team_a_id} vs ${m.team_b_id}): Can play? ${canPlay}`);
    });

    const nextState = assignMatchesToCourts(matches, courts);
    const changedCourts = nextState.courts.filter((c, i) => c.match_id !== courts.find(oc => oc.id === c.id)?.match_id);
    console.log("\nAuto-assign changed courts:");
    if (changedCourts.length === 0) console.log("None.");
    changedCourts.forEach(c => console.log(`Court ${c.id} -> newly assigned match ${c.match_id}`));
}

check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
