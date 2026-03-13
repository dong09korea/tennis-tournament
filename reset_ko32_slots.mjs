/**
 * 🧹 32강 대진표 슬롯 클린업 스크립트 (강제 리셋)
 * 
 * 목적: PENDING 상태인 32강 경기의 팀 ID를 모두 TBD로 초기화하여 
 *      App.jsx의 자동 채우기 로직이 올바른 레이아웃으로 다시 채우게 함.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
    console.log("🚀 32강 대진 슬롯 클린업 시작...");
    
    // 1. 모든 경기 데이터 로드
    const matchesSnap = await getDocs(collection(db, 'tennis_matches'));
    const ko32 = matchesSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(m => m.group_id === '본선 32강');

    const pendingMatches = ko32.filter(m => m.status === 'PENDING');
    
    console.log(`📋 PENDING 상태 32강 경기: ${pendingMatches.length}개`);

    const promises = pendingMatches.map(m => {
        console.log(`  🧹 리셋 중: ${m.id}`);
        return updateDoc(doc(db, 'tennis_matches', m.id), {
            team_a_id: 'TBD',
            team_b_id: 'TBD'
        });
    });

    if (promises.length > 0) {
        await Promise.all(promises);
        console.log("✅ 완료! 이제 브라우저를 새로고침하면 App.jsx가 올바른 대진으로 채워줄 것입니다.");
    } else {
        console.log("⚠️ 리셋할 PENDING 경기가 없습니다.");
    }
    
    process.exit(0);
}

main().catch(console.error);
