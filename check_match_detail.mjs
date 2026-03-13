import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    const matchDoc = await getDoc(doc(db, "tennis_matches", "g3_m2"));
    if (matchDoc.exists()) {
        console.log("Match g3_m2 data:", JSON.stringify(matchDoc.data(), null, 2));
    } else {
        console.log("Match g3_m2 not found");
    }
}

check();
