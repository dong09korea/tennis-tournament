import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    const teamsSnap = await getDocs(collection(db, "tennis_teams"));
    const teams = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const matchesSnap = await getDocs(collection(db, "tennis_matches"));
    const matches = matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const group3Teams = teams.filter(t => 
        String(t.initial_group).includes('3') || String(t.group_id).includes('3')
    );

    console.log("--- Group 3 Teams ---");
    group3Teams.forEach(t => {
        console.log(`ID: ${t.id}, Name: ${t.name}, Club: '${t.club}', Group: ${t.initial_group || t.group_id}`);
    });

    const group3Matches = matches.filter(m => String(m.group_id).includes('3조') || String(m.group_id) === '3');
    
    console.log("\n--- Group 3 Matches ---");
    group3Matches.forEach(m => {
        const tA = teams.find(t => t.id === m.team_a_id);
        const tB = teams.find(t => t.id === m.team_b_id);
        console.log(`Match ${m.id}: ${tA?.name} vs ${tB?.name}, Status: ${m.status}, Score: ${m.score_a}:${m.score_b}`);
    });
}

check();
