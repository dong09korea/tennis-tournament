import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    const matchesSnap = await getDocs(collection(db, 'tennis_matches'));
    const ko32 = matchesSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(m => m.group_id === '본선 32강');
    
    const teamCounts = {};
    ko32.forEach(m => {
        [m.team_a_id, m.team_b_id].forEach(tid => {
            if (tid && tid !== 'TBD' && tid !== 'BYE') {
                teamCounts[tid] = (teamCounts[tid] || 0) + 1;
            }
        });
    });

    console.log("--- 중복 팀 목록 ---");
    for (const [tid, count] of Object.entries(teamCounts)) {
        if (count > 1) {
            const matches = ko32.filter(m => m.team_a_id === tid || m.team_b_id === tid).map(m => m.id);
            console.log(`Team ${tid}: ${count} matches (${matches.join(', ')})`);
        }
    }
    process.exit(0);
}

check();
