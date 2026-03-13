import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { calculateStandings, getTop32Teams } from './src/utils/tournamentLogic.js';

const app = initializeApp({ projectId: 'donghyeon-match' });
const db = getFirestore(app);

async function findMissing() {
    const ms = await getDocs(collection(db, 'tennis_matches'));
    const ts = await getDocs(collection(db, 'tennis_teams'));
    
    const m = ms.docs.map(d => d.data());
    const t = ts.docs.map(d => ({ id: d.id, ...d.data() }));
    
    const st = calculateStandings(t, m);
    const top32 = getTop32Teams(st);
    
    const ko32 = m.filter(x => x.group_id === '본선 32강');
    const ko32Tids = ko32.flatMap(x => [x.team_a_id, x.team_b_id]).filter(x => x !== 'TBD' && x !== 'BYE');
    
    const missing = top32.filter(x => !ko32Tids.includes(x.id) && x.id !== 'BYE');
    
    console.log('--- Missing teams from Top 32 ---');
    missing.forEach(x => {
        console.log(`- ${x.name} (${x.id}) : ${x.groupRank}위 in group ${x.originalGroup}`);
    });

    console.log('\n--- Duplicate teams in ko32 ---');
    const counts = {};
    ko32Tids.forEach(tid => {
        counts[tid] = (counts[tid] || 0) + 1;
    });
    for (const [tid, cnt] of Object.entries(counts)) {
        if (cnt > 1) {
            const team = t.find(x => x.id === tid);
            console.log(`- ${team?.name} (${tid}) appears ${cnt} times`);
        }
    }
}
findMissing();
