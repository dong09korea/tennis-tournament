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

    console.log(`Listing 10 teams:`);
    teams.slice(0, 10).forEach(t => {
        console.log(`ID: ${t.id}, Name: ${t.name}, Club: ${t.club}, Group: ${t.initial_group || t.group_id}`);
    });
}

check();
