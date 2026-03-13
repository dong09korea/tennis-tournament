import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function heal() {
    const teamsSnap = await getDocs(collection(db, "tennis_teams"));
    const teams = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const matchesSnap = await getDocs(collection(db, "tennis_matches"));
    const matches = matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const isAbsent = (t) => t?.club === '불참' || t?.name?.includes('불참') || t?.name === '1조 1번팀';

    const matchesToHeal = matches.filter(m => {
        if (m.status === 'COMPLETED') return false;
        const tA = teams.find(t => t.id === m.team_a_id);
        const tB = teams.find(t => t.id === m.team_b_id);
        return isAbsent(tA) || isAbsent(tB);
    });

    console.log(`Found ${matchesToHeal.length} matches to heal.`);

    for (const m of matchesToHeal) {
        const tA = teams.find(t => t.id === m.team_a_id);
        const tB = teams.find(t => t.id === m.team_b_id);
        const isAbsentA = isAbsent(tA);
        
        let updates = { status: 'COMPLETED' };
        if (isAbsentA) {
            updates.score_a = 0; updates.score_b = 6; updates.winner_id = m.team_b_id;
        } else {
            updates.score_a = 6; updates.score_b = 0; updates.winner_id = m.team_a_id;
        }
        await updateDoc(doc(db, "tennis_matches", m.id), updates);
        console.log(`Healed ${m.id}: ${tA?.name} vs ${tB?.name} -> 6:0`);
    }
}

heal();
