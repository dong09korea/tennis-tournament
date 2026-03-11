import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { assignMatchesToCourts } from './src/utils/tournamentLogic.js';

const firebaseConfig = {
    projectId: "donghyeon-match"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let data = { matches: [], courts: [] };
let initMatches = false;
let initCourts = false;

console.log("Starting listener...");

const checkAutoAssign = () => {
    if (!initMatches || !initCourts) return;

    const hasEmptyCourts = data.courts.some(c => {
        if (c.match_id === null) return true;
        const linkedMatch = data.matches.find(m => m.id === c.match_id);
        return !linkedMatch || linkedMatch.status !== 'LIVE';
    });
    const hasPendingMatches = data.matches.some(m => m.status === 'PENDING' && !m.court_id);

    console.log(`\n[TICK] EmptyCourts: ${hasEmptyCourts}, PendingMatches: ${hasPendingMatches}`);
    
    if (hasEmptyCourts && hasPendingMatches) {
        console.log("--> Trigger condition met! Simulating assignment...");
        const snapshotStr = JSON.stringify(data);
        const snapshotData = JSON.parse(snapshotStr);
        const { matches: nextMatches, courts: nextCourts } = assignMatchesToCourts(snapshotData.matches, snapshotData.courts);
        
        const changedCourts = nextCourts.filter(c => c.match_id !== snapshotData.courts.find(oc => oc.id === c.id)?.match_id);
        const changedMatches = nextMatches.filter(m => {
            const oldM = snapshotData.matches.find(om => om.id === m.id);
            return oldM && (m.status !== oldM.status || m.court_id !== oldM.court_id);
        });

        console.log(`--> Assignment Result: ${changedCourts.length} courts changed, ${changedMatches.length} matches changed.`);
        if (changedCourts.length > 0) {
            console.log("Courts assigned:", changedCourts.map(c => `Court ${c.id}=${c.match_id}`));
        } else {
            console.log("WARNING: Algorithm returned 0 changed courts despite conditions being met.");
            const emptyCourtsList = data.courts.filter(c => c.match_id === null).map(c => c.id);
            console.log("Actual empty courts according to data:", emptyCourtsList);
            const pendingList = data.matches.filter(m => m.status === 'PENDING' && !m.court_id).map(m => m.id);
            console.log("Actual pending matches according to data:", pendingList.slice(0, 5));
        }
    }
};

onSnapshot(collection(db, 'tennis_matches'), (snap) => {
    data.matches = snap.docs.map(d => ({id: d.id, ...d.data()}));
    initMatches = true;
    console.log(`[FIREBASE] Received ${data.matches.length} matches`);
    checkAutoAssign();
});

onSnapshot(collection(db, 'tennis_courts'), (snap) => {
    data.courts = snap.docs.map(d => ({id: d.id, ...d.data()}));
    initCourts = true;
    console.log(`[FIREBASE] Received ${data.courts.length} courts`);
    checkAutoAssign();
});

// Keep alive
setTimeout(() => { console.log("Exiting test after 15 seconds..."); process.exit(0); }, 15000);
