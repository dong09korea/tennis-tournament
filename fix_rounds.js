import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "dummy",
    authDomain: "tennis-tournament-562a1.firebaseapp.com",
    projectId: "tennis-tournament-562a1",
    storageBucket: "tennis-tournament-562a1.firebasestorage.app",
    messagingSenderId: "145695276332",
    appId: "1:145695276332:web:65e1ebed1d92ee2de84d12",
    measurementId: "G-D1HNY0GB3V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixRounds() {
    console.log("Fetching matches to fix rounds...");
    const matchesRef = collection(db, "tennis_matches");
    const snap = await getDocs(matchesRef);
    
    let count = 0;
    for (const d of snap.docs) {
        const m = d.data();
        if (typeof m.group_id === 'string' && m.group_id.includes('본선 32강')) {
            // Original round was 10, 11, 12...
            // id is ko32_m1, ko32_m2
            const idxMatch = m.id.match(/\d+$/);
            if (idxMatch) {
                const idx = parseInt(idxMatch[0], 10) - 1;
                await updateDoc(doc(db, "tennis_matches", d.id), { round: 1000 + idx });
                count++;
            }
        }
        else if (m.group_id === '16강') {
            const idxMatch = m.id.match(/\d+$/);
            if (idxMatch) {
                const idx = parseInt(idxMatch[0], 10) - 1;
                await updateDoc(doc(db, "tennis_matches", d.id), { round: 2000 + idx });
                count++;
            }
        }
    }
    console.log(`Updated rounds for ${count} knockout matches.`);
    process.exit(0);
}

fixRounds().catch(console.error);
