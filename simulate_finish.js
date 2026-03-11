import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = { projectId: "donghyeon-match" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    console.log("Emptying Court 2...");
    
    // First figure out what match is on Court 2
    const courtDoc = await getDoc(doc(db, "tennis_courts", "2"));
    const matchId = courtDoc.data().match_id;
    
    if (matchId) {
        // Complete the match
        await updateDoc(doc(db, "tennis_matches", matchId), { 
            status: "COMPLETED", 
            score_a: 6, score_b: 0, 
            court_id: null 
        });
        console.log(`Set match ${matchId} to COMPLETED and removed from court`);
    }
    
    // Free the court
    await updateDoc(doc(db, "tennis_courts", "2"), { match_id: null });
    console.log("Freed Court 2.");
    
    // Wait briefly
    await new Promise(r => setTimeout(r, 3000));
    
    // Check if auto-assign worked (either by my script or their browser)
    const afterCourt = await getDoc(doc(db, "tennis_courts", "2"));
    console.log(`3 seconds later, Court 2 match_id is: ${afterCourt.data().match_id}`);
    
    process.exit(0);
}

run().catch(console.error);
