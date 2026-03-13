import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { calculateStandings, getTop32Teams, generateBracket32, FIXED_BRACKET_LAYOUT } from './src/utils/tournamentLogic.js';

const firebaseConfig = {
    apiKey: "AIzaSyDcd71aoujH4yccQpMpGFixfvY15G_gPeA",
    authDomain: "donghyeon-match.firebaseapp.com",
    projectId: "donghyeon-match",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const exactScores = [
    // 1조
    { tA: "김성곤 김태현", scoreA: 5, tB: "오진우 김관희", scoreB: 5 },
    { tA: "김성곤 김태현", scoreA: 6, tB: "박주연 오진주", scoreB: 3 },
    { tA: "오진우 김관희", scoreA: 1, tB: "박주연 오진주", scoreB: 6 },
    // 2조
    { tA: "김대성 이진희", scoreA: 3, tB: "김진영 함아영", scoreB: 6 },
    { tA: "이정환 구향화", scoreA: 6, tB: "조명화 이재은", scoreB: 4 },
    { tA: "김대성 이진희", scoreA: 3, tB: "이정환 구향화", scoreB: 6 },
    { tA: "김진영 함아영", scoreA: 6, tB: "조명화 이재은", scoreB: 2 },
    { tA: "김진영 함아영", scoreA: 5, tB: "이정환 구향화", scoreB: 5 },
    { tA: "김대성 이진희", scoreA: 4, tB: "조명화 이재은", scoreB: 6 },
    // 3조
    { tA: "박종호 이혜연", scoreA: 4, tB: "홍민우 김한나", scoreB: 6 },
    { tA: "김수정 주혜령", scoreA: 4, tB: "김세호 김한나", scoreB: 6 },
    { tA: "박종호 이혜연", scoreA: 5, tB: "김수정 주혜령", scoreB: 5 },
    { tA: "홍민우 김한나", scoreA: 5, tB: "김세호 김한나", scoreB: 5 },
    { tA: "홍민우 김한나", scoreA: 6, tB: "김수정 주혜령", scoreB: 4 },
    { tA: "박종호 이혜연", scoreA: 3, tB: "김세호 김한나", scoreB: 6 },
    // 4조
    { tA: "구본혁 김민선", scoreA: 4, tB: "정태선 이현주", scoreB: 6 },
    { tA: "김석환 미스윤", scoreA: 4, tB: "소병호 이소영", scoreB: 6 },
    { tA: "구본혁 김민선", scoreA: 6, tB: "김석환 미스윤", scoreB: 4 },
    { tA: "정태선 이현주", scoreA: 6, tB: "소병호 이소영", scoreB: 4 },
    { tA: "정태선 이현주", scoreA: 5, tB: "김석환 미스윤", scoreB: 5 },
    { tA: "구본혁 김민선", scoreA: 6, tB: "소병호 이소영", scoreB: 3 },
    // 5조
    { tA: "이성철 이다경", scoreA: 3, tB: "전성빈 안세린", scoreB: 6 },
    { tA: "이정우 박미영", scoreA: 6, tB: "백경일 손명연", scoreB: 2 },
    { tA: "이성철 이다경", scoreA: 3, tB: "이정우 박미영", scoreB: 6 },
    { tA: "전성빈 안세린", scoreA: 6, tB: "백경일 손명연", scoreB: 4 },
    { tA: "전성빈 안세린", scoreA: 4, tB: "이정우 박미영", scoreB: 6 },
    { tA: "이성철 이다경", scoreA: 6, tB: "백경일 손명연", scoreB: 2 },
    // 6조
    { tA: "김병현 조은나", scoreA: 6, tB: "박상혁 유미숙", scoreB: 3 },
    { tA: "곽남기 박선영", scoreA: 6, tB: "이석희 김민지", scoreB: 4 },
    { tA: "김병현 조은나", scoreA: 5, tB: "곽남기 박선영", scoreB: 5 },
    { tA: "박상혁 유미숙", scoreA: 6, tB: "이석희 김민지", scoreB: 4 },
    { tA: "박상혁 유미숙", scoreA: 5, tB: "곽남기 박선영", scoreB: 5 },
    { tA: "김병현 조은나", scoreA: 6, tB: "이석희 김민지", scoreB: 4 },
    // 7조
    { tA: "정대현 김선경", scoreA: 3, tB: "박찬주 박성은", scoreB: 6 },
    { tA: "정규대 김태헌", scoreA: 5, tB: "김명래 손정은", scoreB: 5 },
    { tA: "정대현 김선경", scoreA: 4, tB: "정규대 김태헌", scoreB: 6 },
    { tA: "박찬주 박성은", scoreA: 6, tB: "김명래 손정은", scoreB: 3 },
    { tA: "박찬주 박성은", scoreA: 6, tB: "정규대 김태헌", scoreB: 3 },
    { tA: "정대현 김선경", scoreA: 6, tB: "김명래 손정은", scoreB: 4 },
    // 8조
    { tA: "김상민 서현주", scoreA: 6, tB: "김진 김주예", scoreB: 4 },
    { tA: "구용빈 유진아", scoreA: 6, tB: "오창현 김은하", scoreB: 4 },
    { tA: "김상민 서현주", scoreA: 4, tB: "구용빈 유진아", scoreB: 6 },
    { tA: "김진 김주예", scoreA: 5, tB: "오창현 김은하", scoreB: 5 },
    { tA: "김진 김주예", scoreA: 5, tB: "구용빈 유진아", scoreB: 5 },
    { tA: "김상민 서현주", scoreA: 3, tB: "오창현 김은하", scoreB: 6 },
    // 9조
    { tA: "고용우 배서연", scoreA: 4, tB: "김동호 나츠미", scoreB: 6 },
    { tA: "최종섭 허은", scoreA: 3, tB: "문기우 권주연", scoreB: 6 },
    { tA: "고용우 배서연", scoreA: 4, tB: "최종섭 허은", scoreB: 6 },
    { tA: "김동호 나츠미", scoreA: 4, tB: "문기우 권주연", scoreB: 6 },
    { tA: "김동호 나츠미", scoreA: 4, tB: "최종섭 허은", scoreB: 6 },
    { tA: "고용우 배서연", scoreA: 3, tB: "문기우 권주연", scoreB: 6 },
    // 10조
    { tA: "안성진 유지희", scoreA: 6, tB: "홍진일 이지연", scoreB: 1 },
    { tA: "조병규 홍은주", scoreA: 5, tB: "김종형 김혜지", scoreB: 5 },
    { tA: "안성진 유지희", scoreA: 6, tB: "조병규 홍은주", scoreB: 3 },
    { tA: "홍진일 이지연", scoreA: 4, tB: "김종형 김혜지", scoreB: 6 },
    { tA: "홍진일 이지연", scoreA: 5, tB: "조병규 홍은주", scoreB: 5 },
    { tA: "안성진 유지희", scoreA: 3, tB: "김종형 김혜지", scoreB: 6 },
    // 11조
    { tA: "서동찬 김태희", scoreA: 1, tB: "최정민 오연지", scoreB: 6 },
    { tA: "정석연 송다혜", scoreA: 6, tB: "남경천 우지영", scoreB: 4 },
    { tA: "서동찬 김태희", scoreA: 4, tB: "정석연 송다혜", scoreB: 6 },
    { tA: "최정민 오연지", scoreA: 6, tB: "남경천 우지영", scoreB: 3 },
    { tA: "최정민 오연지", scoreA: 5, tB: "정석연 송다혜", scoreB: 5 },
    { tA: "서동찬 김태희", scoreA: 6, tB: "남경천 우지영", scoreB: 2 },
    // 12조
    { tA: "전재안 정민지", scoreA: 6, tB: "박성환 신지영", scoreB: 3 },
    { tA: "신민규 임소리", scoreA: 6, tB: "김주경 김미영", scoreB: 4 },
    { tA: "전재안 정민지", scoreA: 5, tB: "신민규 임소리", scoreB: 5 },
    { tA: "박성환 신지영", scoreA: 6, tB: "김주경 김미영", scoreB: 4 },
    { tA: "박성환 신지영", scoreA: 3, tB: "신민규 임소리", scoreB: 6 },
    { tA: "전재안 정민지", scoreA: 6, tB: "김주경 김미영", scoreB: 2 },
];

async function runExactSim() {
    console.log("=== Fetching Real Data & Injecting Exact Scores ===");
    
    const teamsSnap = await getDocs(collection(db, "tennis_teams"));
    const teams = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const matchesSnap = await getDocs(collection(db, "tennis_matches"));
    let matches = matchesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const cleanTeamName = (name) => name.replace(/[^가-힣a-zA-Z0-9]/g, '').toLowerCase();

    // Reset and inject scores
    matches = matches.map(m => {
        if (typeof m.group_id === 'number' || String(m.group_id).includes("조")) {
            const tA = teams.find(t => t.id === m.team_a_id);
            const tB = teams.find(t => t.id === m.team_b_id);

            // Match logic based on exactScores array (which uses "name1 name2" format)
            if (tA && tB) {
                const searchA1 = cleanTeamName(tA.name);
                const searchB1 = cleanTeamName(tB.name);

                for(const rule of exactScores) {
                    const ruleA = cleanTeamName(rule.tA);
                    const ruleB = cleanTeamName(rule.tB);

                    if (ruleA === searchA1 && ruleB === searchB1) {
                        return { ...m, status: 'COMPLETED', score_a: rule.scoreA, score_b: rule.scoreB, winner_id: rule.scoreA > rule.scoreB ? m.team_a_id : (rule.scoreB > rule.scoreA ? m.team_b_id : null) };
                    } else if (ruleA === searchB1 && ruleB === searchA1) {
                        return { ...m, status: 'COMPLETED', score_a: rule.scoreB, score_b: rule.scoreA, winner_id: rule.scoreB > rule.scoreA ? m.team_b_id : (rule.scoreA > rule.scoreB ? m.team_a_id : null) };
                    }
                }
            }
        }
        return m; // unchanged
    });

    console.log("== Calculating Standings ==");
    const standings = calculateStandings(teams, matches);

    const report = { wildcards: [], rankings: {}, bracket32: [] };

    // Group rankings
    const allStandings = Object.values(standings).flat();
    console.log(allStandings.map(t => `${t.originalGroup || t.group_id}조 ${t.groupRank}위: ${t.name} (승점:${t.pts}, 득실:${t.goalDiff})`).join("\n"));
    
    const top32 = getTop32Teams(standings);
    top32.forEach(t => {
        if (t.groupRank === 3 && t.id !== 'BYE') {
            report.wildcards.push({ name: t.name, group: t.originalGroup, wildcardRank: t.wildcardRank, pts: t.pts, goalDiff: t.goalDiff });
        }
    });

    const bracket = generateBracket32(top32, standings);
    const b32 = bracket.filter(m => String(m.group_id).includes('32'));

    b32.forEach(m => {
        const teamA = teams.find(t => t.id === m.team_a_id) || { name: m.team_a_id, originalGroup: '' };
        const teamB = teams.find(t => t.id === m.team_b_id) || { name: m.team_b_id, originalGroup: '' };
        
        const curDef = FIXED_BRACKET_LAYOUT.find((_, i) => m.id === `ko32_m${i+1}`);
        let rulesA = curDef ? `${curDef.a.g}조${curDef.a.rank}` : "";
        let rulesB = curDef ? (curDef.b.g === 'W' ? `W${curDef.b.w}` : `${curDef.b.g}조${curDef.b.rank}`) : "";

        report.bracket32.push({
            matchId: m.id,
            teamA: `${teamA.name} (${teamA.originalGroup || ''})`,
            teamB: `${teamB.name} (${teamB.originalGroup || ''})`,
            ruleA: rulesA,
            ruleB: rulesB
        });
    });

    fs.writeFileSync('C:/tmp/exact_sim.json', JSON.stringify(report, null, 2), 'utf8');
    console.log("Written exact test results to C:/tmp/exact_sim.json");
    process.exit(0);
}

runExactSim();
