import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkMatches() {
    const colSnap = await getDocs(collection(db, "tennis_matches"));
    const results = [];
    colSnap.forEach(doc => {
        const data = doc.data();
        if (data.id.startsWith("ko")) {
            results.push({
                id: data.id,
                group: data.group_id,
                status: data.status,
                a: data.team_a_id,
                b: data.team_b_id,
                score_a: data.score_a,
                score_b: data.score_b,
                next: data.next_match_id,
                is_a_next: data.is_team_a_next, winner: data.winner_id
            });
        }
    });

    // sort
    results.sort((a,b) => {
        const idA = parseInt(a.id.match(/\d+$/)[0]);
        const idB = parseInt(b.id.match(/\d+$/)[0]);
        if (a.group !== b.group) return a.group.localeCompare(b.group);
        return idA - idB;
    });

    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
}

checkMatches();
