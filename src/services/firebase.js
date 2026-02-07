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
    GROUPS: "tennis_groups"
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

    return () => {
        unsubscribeMatches();
        unsubscribeTeams();
        unsubscribeGroups();
    };
};

export const uploadData = async (data) => {
    try {
        console.log("Starting upload...");
        const cleanData = JSON.parse(JSON.stringify(data));
        const batch = writeBatch(db);

        cleanData.teams.forEach(team => {
            const ref = doc(db, COLLECTIONS.TEAMS, team.id);
            batch.set(ref, team);
        });

        cleanData.groups.forEach(group => {
            const ref = doc(db, COLLECTIONS.GROUPS, String(group.id));
            batch.set(ref, group);
        });

        cleanData.matches.forEach(match => {
            const ref = doc(db, COLLECTIONS.MATCHES, match.id);
            batch.set(ref, match);
        });

        // Add a timeout to prevent hanging
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out.")), 10000)
        );

        await Promise.race([batch.commit(), timeout]);
        console.log("Data uploaded successfully!");
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

export const resetTournamentData = async () => {
    try {
        console.log("Starting full reset...");
        const batch = writeBatch(db);

        // 1. Get all documents
        const matchesSnapshot = await getDocs(collection(db, COLLECTIONS.MATCHES));
        const teamsSnapshot = await getDocs(collection(db, COLLECTIONS.TEAMS));
        const groupsSnapshot = await getDocs(collection(db, COLLECTIONS.GROUPS));

        // 2. Delete all
        matchesSnapshot.forEach((doc) => { batch.delete(doc.ref); });
        teamsSnapshot.forEach((doc) => { batch.delete(doc.ref); });
        groupsSnapshot.forEach((doc) => { batch.delete(doc.ref); });

        await batch.commit();
        console.log("All data reset successfully!");
    } catch (error) {
        console.error("Error resetting data: ", error);
        throw error;
    }
};

export { db };
