import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, doc, setDoc, writeBatch, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    databaseURL: "https://donghyeon-match-default-rtdb.firebaseio.com",
    projectId: "donghyeon-match",
    storageBucket: "donghyeon-match.firebasestorage.app",
    messagingSenderId: "576708595535",
    appId: "1:576708595535:web:3deacb1e1b0986b78fbf3a",
    measurementId: "G-8SBR5KKRV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use specific collection names to avoid overwriting other apps
const COLLECTIONS = {
    MATCHES: "tennis_matches",
    TEAMS: "tennis_teams",
    GROUPS: "tennis_groups",
    COURTS: "tennis_courts"
};

export const subscribeToData = (onDataUpdate) => {
    const unsubscribeMatches = onSnapshot(collection(db, COLLECTIONS.MATCHES), (snapshot) => {
        const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (matches.length > 0) {
            onDataUpdate(prev => ({ ...prev, matches }));
        } else {
            // Handle empty case: if logic deletes all docs, we should update state to empty
            onDataUpdate(prev => ({ ...prev, matches: [] }));
        }
    });

    const unsubscribeTeams = onSnapshot(collection(db, COLLECTIONS.TEAMS), (snapshot) => {
        const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (teams.length > 0) {
            onDataUpdate(prev => ({ ...prev, teams }));
        } else {
            onDataUpdate(prev => ({ ...prev, teams: [] }));
        }
    });

    // Groups logic if needed
    const unsubscribeGroups = onSnapshot(collection(db, COLLECTIONS.GROUPS), (snapshot) => {
        const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (groups.length > 0) {
            onDataUpdate(prev => ({ ...prev, groups }));
        } else {
            onDataUpdate(prev => ({ ...prev, groups: [] }));
        }
    });

    const unsubscribeCourts = onSnapshot(collection(db, COLLECTIONS.COURTS), (snapshot) => {
        const courts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sortedCourts = courts.sort((a, b) => Number(a.id) - Number(b.id));
        if (courts.length > 0) {
            onDataUpdate(prev => ({ ...prev, courts: sortedCourts }));
        } else {
            onDataUpdate(prev => ({ ...prev, courts: [] }));
        }
    });

    return () => {
        unsubscribeMatches();
        unsubscribeTeams();
        unsubscribeGroups();
        unsubscribeCourts();
    };
};

export const uploadData = async (data) => {
    try {
        console.log("Starting upload...");
        const cleanData = JSON.parse(JSON.stringify(data));
        
        const allOps = [];
        cleanData.teams.forEach(team => {
            allOps.push({ ref: doc(db, COLLECTIONS.TEAMS, team.id), data: team });
        });
        cleanData.groups.forEach(group => {
            allOps.push({ ref: doc(db, COLLECTIONS.GROUPS, String(group.id)), data: group });
        });
        cleanData.matches.forEach(match => {
            allOps.push({ ref: doc(db, COLLECTIONS.MATCHES, match.id), data: match });
        });
        if (cleanData.courts) {
            cleanData.courts.forEach(court => {
                allOps.push({ ref: doc(db, COLLECTIONS.COURTS, String(court.id)), data: court });
            });
        }

        const totalOps = allOps.length;
        if (totalOps === 0) {
            console.log("No data to upload.");
            return;
        }

        const BATCH_SIZE = 400;
        const totalBatches = Math.ceil(totalOps / BATCH_SIZE);
        console.log(`Uploading ${totalOps} operations in ${totalBatches} batches...`);
        
        for (let i = 0; i < totalBatches; i++) {
            const batch = writeBatch(db);
            const start = i * BATCH_SIZE;
            const end = Math.min(start + BATCH_SIZE, totalOps);
            
            for (let j = start; j < end; j++) {
                batch.set(allOps[j].ref, allOps[j].data);
            }

            let timerId;
            const timeout = new Promise((_, reject) => {
                timerId = setTimeout(() => reject(new Error(`🔥 서버 저장속도가 너무 느립니다 (60초 초과).`)), 60000);
            });

            await Promise.race([batch.commit(), timeout]);
            clearTimeout(timerId);
            console.log(`[Firebase] Batch ${i + 1}/${totalBatches} complete.`);
        }

        console.log("Full upload successful!");
    } catch (error) {
        console.error("Error uploading data: ", error);
        throw error;
    }
};

export const updateMatch = async (matchId, updates) => {
    try {
        const matchRef = doc(db, COLLECTIONS.MATCHES, matchId);
        await setDoc(matchRef, updates, { merge: true });
    } catch (error) {
        console.error("Error updating match: ", error);
        throw error;
    }
};

export const updateCourt = async (courtId, updates) => {
    try {
        const courtRef = doc(db, COLLECTIONS.COURTS, String(courtId));
        await setDoc(courtRef, updates, { merge: true });
    } catch (error) {
        console.error("Error updating court: ", error);
        throw error;
    }
};

export const updateTeam = async (teamId, updates) => {
    try {
        const teamRef = doc(db, COLLECTIONS.TEAMS, teamId);
        await setDoc(teamRef, updates, { merge: true });
    } catch (error) {
        console.error("Error updating team: ", error);
        throw error;
    }
};

export const resetTournamentData = async () => {
    try {
        console.log("Starting full reset...");
        localStorage.removeItem('notifiedMatchesList');

        const collectionsToClear = [
            COLLECTIONS.MATCHES,
            COLLECTIONS.TEAMS,
            COLLECTIONS.GROUPS,
            COLLECTIONS.COURTS
        ];

        // Parallelize clearing across different collections
        const clearPromises = collectionsToClear.map(async (colName) => {
            const snapshot = await getDocs(collection(db, colName));
            const docs = snapshot.docs;
            
            const BATCH_SIZE = 400;
            for (let i = 0; i < docs.length; i += BATCH_SIZE) {
                const batch = writeBatch(db);
                const chunk = docs.slice(i, i + BATCH_SIZE);
                chunk.forEach(d => batch.delete(d.ref));

                let timerId;
                const timeout = new Promise((_, reject) => {
                    timerId = setTimeout(() => reject(new Error(`🧨 서버 초기화 지연 (60초 초과) [${colName}]`)), 60000);
                });

                await Promise.race([batch.commit(), timeout]);
                clearTimeout(timerId);
            }
        });

        await Promise.all(clearPromises);
        console.log("All data reset successfully!");
    } catch (error) {
        console.error("Error resetting data: ", error);
        throw error;
    }
};

export { db };
