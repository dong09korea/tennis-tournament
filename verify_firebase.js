import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verify() {
    console.log("Starting Firestore permission check...");
    console.log(`Target Project: ${firebaseConfig.projectId}`);

    const testDoc = doc(db, "tennis_matches", "permission_test_delete_me");

    try {
        console.log("Attempting write...");
        await setDoc(testDoc, {
            test: true,
            timestamp: new Date().toISOString()
        });
        console.log("✅ Write test: SUCCESS");

        await deleteDoc(testDoc);
        console.log("✅ Delete test: SUCCESS");

        console.log("\n[Conclusion] Firestore rules ARE correctly set. If you still see errors, check if your IP address is blocked or if there are specific cellular/network restrictions.");
    } catch (error) {
        console.error("❌ Firestore Error:", error.message);
        console.error("Error Code:", error.code);

        if (error.code === 'permission-denied') {
            console.log("\n[Conclusion] PERMISSION DENIED. Even if 30 days haven't passed, the rules might be set to 'Lock Mode' (deny all) or there's a specific constraint in the rules.");
            console.log("Please check your rules at: https://console.firebase.google.com/project/" + firebaseConfig.projectId + "/firestore/rules");
        } else {
            console.log("\n[Conclusion] Unexpected error. Please check your network connection.");
        }
    }
}

verify();
