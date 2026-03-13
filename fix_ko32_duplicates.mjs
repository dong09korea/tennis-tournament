/**
 * 🔧 32강 대진 중복 팀 진단 및 수정 스크립트
 * 
 * 문제: 동일 팀이 여러 32강 경기 슬롯에 중복 배치됨
 * → 자동 코트 배정이 busyTeams 체크에 걸려 빈 코트 발생
 * 
 * 사용법: node fix_ko32_duplicates.mjs [--fix]
 *   --fix 없으면 진단만, --fix 있으면 실제 수정
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

const FIX_MODE = process.argv.includes('--fix');

console.log(`\n🔧 32강 대진 중복 진단 ${FIX_MODE ? '+ 수정' : '(진단 전용)'}\n`);

async function main() {
    // 1. 모든 데이터 로드
    const matchesSnap = await getDocs(collection(db, 'tennis_matches'));
    const teamsSnap = await getDocs(collection(db, 'tennis_teams'));

    const allMatches = matchesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const allTeams = teamsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const teamMap = {};
    allTeams.forEach(t => { teamMap[t.id] = t; });

    // 2. 32강 경기만 추출
    const ko32 = allMatches.filter(m => m.group_id === '본선 32강');
    ko32.sort((a, b) => (a.round || 0) - (b.round || 0));

    console.log(`📋 32강 총 ${ko32.length}경기 확인\n`);

    // 3. 각 경기의 팀 배치 출력
    const teamToMatches = {}; // teamId -> [matchId, ...]

    ko32.forEach((m, idx) => {
        const tA = teamMap[m.team_a_id];
        const tB = teamMap[m.team_b_id];
        const nameA = tA?.name || m.team_a_id;
        const nameB = tB?.name || m.team_b_id;
        const status = m.status === 'COMPLETED' ? '✅종료' : m.status === 'LIVE' ? '🔴진행' : '⏳대기';
        
        console.log(`  ${idx+1}. [${m.id}] ${status} | ${nameA} vs ${nameB}`);

        // 중복 추적
        if (m.team_a_id && m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE') {
            if (!teamToMatches[m.team_a_id]) teamToMatches[m.team_a_id] = [];
            teamToMatches[m.team_a_id].push({ matchId: m.id, slot: 'A', status: m.status, name: nameA });
        }
        if (m.team_b_id && m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE') {
            if (!teamToMatches[m.team_b_id]) teamToMatches[m.team_b_id] = [];
            teamToMatches[m.team_b_id].push({ matchId: m.id, slot: 'B', status: m.status, name: nameB });
        }
    });

    // 4. 중복 팀 찾기
    console.log('\n\n🔍 중복 배치 팀 탐지:\n');
    let dupCount = 0;
    const fixPromises = [];

    for (const [teamId, entries] of Object.entries(teamToMatches)) {
        if (entries.length > 1) {
            dupCount++;
            const teamName = entries[0].name;
            console.log(`  ⚠️  ${teamName} (${teamId}) → ${entries.length}개 경기에 등장:`);
            entries.forEach(e => {
                console.log(`       - ${e.matchId} [${e.slot}슬롯] 상태: ${e.status}`);
            });

            if (FIX_MODE) {
                // 완료된 경기와 진행중 경기를 유지하고, 나머지 대기중 경기의 슬롯을 TBD로 변경
                const completedOrLive = entries.filter(e => e.status === 'COMPLETED' || e.status === 'LIVE');
                const pending = entries.filter(e => e.status === 'PENDING');

                pending.forEach(e => {
                    // 이 슬롯을 TBD로 되돌림
                    const updates = e.slot === 'A' 
                        ? { team_a_id: 'TBD' } 
                        : { team_b_id: 'TBD' };
                    console.log(`  🔨 수정: ${e.matchId} ${e.slot}슬롯 → TBD`);
                    fixPromises.push(
                        updateDoc(doc(db, 'tennis_matches', e.matchId), updates)
                    );
                });
            }
        }
    }

    if (dupCount === 0) {
        console.log('  ✅ 중복 없음! 대진표 데이터 정상.\n');
    } else {
        console.log(`\n  총 ${dupCount}팀 중복 발견.\n`);
    }

    // 5. 빈 코트 (2번) 원인 분석
    const liveSets = new Set();
    allMatches.filter(m => m.status === 'LIVE').forEach(m => {
        liveSets.add(m.team_a_id);
        liveSets.add(m.team_b_id);
    });

    const blockedPending = ko32.filter(m => 
        m.status === 'PENDING' &&
        !m.court_id &&
        m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
        m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE' &&
        (liveSets.has(m.team_a_id) || liveSets.has(m.team_b_id))
    );

    if (blockedPending.length > 0) {
        console.log('🚫 현재 코트 배정 불가 (진행중 팀 충돌) 경기:');
        blockedPending.forEach(m => {
            const nameA = teamMap[m.team_a_id]?.name || m.team_a_id;
            const nameB = teamMap[m.team_b_id]?.name || m.team_b_id;
            const blockA = liveSets.has(m.team_a_id) ? '🔴' : '  ';
            const blockB = liveSets.has(m.team_b_id) ? '🔴' : '  ';
            console.log(`  ${m.id}: ${blockA}${nameA} vs ${blockB}${nameB}`);
        });
    }

    const readyPending = ko32.filter(m => 
        m.status === 'PENDING' &&
        !m.court_id &&
        m.team_a_id !== 'TBD' && m.team_a_id !== 'BYE' &&
        m.team_b_id !== 'TBD' && m.team_b_id !== 'BYE' &&
        !liveSets.has(m.team_a_id) && !liveSets.has(m.team_b_id)
    );

    if (readyPending.length > 0) {
        console.log('\n✅ 즉시 코트 배정 가능한 32강 경기:');
        readyPending.forEach(m => {
            const nameA = teamMap[m.team_a_id]?.name || m.team_a_id;
            const nameB = teamMap[m.team_b_id]?.name || m.team_b_id;
            console.log(`  ${m.id}: ${nameA} vs ${nameB}`);
        });
    } else {
        console.log('\n⚠️  즉시 배정 가능한 32강 경기 없음 (모든 팀이 현재 진행중이거나 TBD)');
    }

    if (FIX_MODE && fixPromises.length > 0) {
        console.log('\n🔨 수정 실행 중...');
        await Promise.all(fixPromises);
        console.log('✅ 수정 완료! 앱을 새로고침하세요.');
    }

    if (!FIX_MODE && dupCount > 0) {
        console.log('\n💡 수정하려면: node fix_ko32_duplicates.mjs --fix');
    }

    process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
