import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixBracket() {
    const colSnap = await getDocs(collection(db, "tennis_matches"));
    let matches = [];
    colSnap.forEach(doc => {
        matches.push(doc.data());
    });
    
    let changed = 0;

    // Helper to find match
    const getMatch = (id) => matches.find(m => m.id === id);

    // Propagate winners iteratively
    let keepingProcessing = true;
    while(keepingProcessing) {
        keepingProcessing = false;
        
        for (const m of matches) {
            if (m.status === 'COMPLETED' && m.winner_id && m.next_match_id) {
                const nextMatch = getMatch(m.next_match_id);
                if (nextMatch) {
                    if (m.is_team_a_next) {
                        if (nextMatch.team_a_id !== m.winner_id) {
                            nextMatch.team_a_id = m.winner_id;
                            keepingProcessing = true;
                            changed++;
                            console.log(`Updated ${nextMatch.id} team_a_id to ${m.winner_id} (from ${m.id})`);
                        }
                    } else {
                        if (nextMatch.team_b_id !== m.winner_id) {
                            nextMatch.team_b_id = m.winner_id;
                            keepingProcessing = true;
                            changed++;
                            console.log(`Updated ${nextMatch.id} team_b_id to ${m.winner_id} (from ${m.id})`);
                        }
                    }
                }
            }
        }
    }

    // Now save changed ones to DB?
    // Let's just update all knockout matches where team_a_id or team_b_id differs from what's in DB right now
    const oldColSnap = await getDocs(collection(db, "tennis_matches"));
    const oldMatches = oldColSnap.docs.map(d => d.data());

    for (const m of matches) {
        const oldM = oldMatches.find(o => o.id === m.id);
        if (oldM && (m.team_a_id !== oldM.team_a_id || m.team_b_id !== oldM.team_b_id)) {
            console.log(`Saving ${m.id} to firebase...`);
            await setDoc(doc(db, "tennis_matches", m.id), {
                team_a_id: m.team_a_id,
                team_b_id: m.team_b_id
            }, { merge: true });
        }
    }

    console.log(`Done! Propagated ${changed} slot changes.`);
    process.exit(0);
}

fixBracket();
