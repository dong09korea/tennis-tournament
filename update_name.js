import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateName() {
    const colRef = collection(db, "tennis_teams");
    const snap = await getDocs(colRef);
    
    let found = 0;
    for (const d of snap.docs) {
        const team = d.data();
        let changed = false;
        let newName = team.name;
        
        if (team.name && team.name.includes("배서연")) {
            newName = team.name.replace("배서연", "강예원");
            changed = true;
        }
        
        if (changed) {
            console.log(`Updating team ${d.id}: ${team.name} -> ${newName}`);
            await updateDoc(doc(db, "tennis_teams", d.id), {
                name: newName
            });
            found++;
        }
    }
    
    console.log(`Finished. Updated ${found} teams.`);
    process.exit(0);
}

updateName();
