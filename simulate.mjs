/**
 * 🎾 Tournament Full Simulation Script
 * 예선 → 32강 → 16강 → 8강 → 4강 → 결승 완전 시뮬레이션
 * Firebase에 영향 없이 로컬에서만 동작합니다.
 * 
 * 사용법: node simulate.mjs [--seed=42] [--verbose]
 */

// ─── 설정 ─────────────────────────────────────────────────────────────────────
const VERBOSE = process.argv.includes('--verbose');
const SEED_ARG = process.argv.find(a => a.startsWith('--seed='));
let rngState = SEED_ARG ? parseInt(SEED_ARG.split('=')[1]) : Date.now();

// ─── 유사 랜덤 (재현 가능) ────────────────────────────────────────────────────
function rand() {
    rngState ^= rngState << 13;
    rngState ^= rngState >> 17;
    rngState ^= rngState << 5;
    return Math.abs(rngState) / 0x7fffffff;
}
function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }

// ─── 콘솔 색상 ────────────────────────────────────────────────────────────────
const C = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m',
    blue: '\x1b[34m',
};
const header = (txt) => console.log(`\n${C.bold}${C.yellow}${'━'.repeat(60)}${C.reset}\n${C.bold}${C.yellow}  ${txt}${C.reset}\n${C.bold}${C.yellow}${'━'.repeat(60)}${C.reset}`);
const ok = (txt) => console.log(`  ${C.green}✅ ${txt}${C.reset}`);
const warn = (txt) => console.log(`  ${C.red}⚠️  ${txt}${C.reset}`);
const info = (txt) => console.log(`  ${C.cyan}ℹ️  ${txt}${C.reset}`);
const step = (txt) => console.log(`\n${C.bold}${C.blue}▶ ${txt}${C.reset}`);
const log = (txt) => { if (VERBOSE) console.log(`  ${C.gray}${txt}${C.reset}`); };

// ─── 문제 추적 ────────────────────────────────────────────────────────────────
const ISSUES = [];
const issue = (msg) => { ISSUES.push(msg); warn(msg); };

// ─── 고정 대진표 (FIXED_BRACKET_LAYOUT) ──────────────────────────────────────
const FIXED_BRACKET_LAYOUT = [
    { a: { rank: 1, g: 1 },  b: { rank: 2, g: 5 } },   // M1: 1조1위 vs 5조2위
    { a: { rank: 1, g: 2 },  b: { rank: 3, g: 'W' } }, // M2: 2조1위 vs 조3위
    { a: { rank: 1, g: 3 },  b: { rank: 2, g: 7 } },   // M3: 3조1위 vs 7조2위
    { a: { rank: 1, g: 4 },  b: { rank: 3, g: 'W' } }, // M4: 4조1위 vs 조3위
    { a: { rank: 1, g: 5 },  b: { rank: 3, g: 'W' } }, // M5: 5조1위 vs 조3위
    { a: { rank: 1, g: 6 },  b: { rank: 2, g: 10 } },  // M6: 6조1위 vs 10조2위
    { a: { rank: 1, g: 7 },  b: { rank: 3, g: 'W' } }, // M7: 7조1위 vs 조3위
    { a: { rank: 1, g: 8 },  b: { rank: 2, g: 12 } },  // M8: 8조1위 vs 12조2위
    { a: { rank: 1, g: 9 },  b: { rank: 3, g: 'W' } }, // M9: 9조1위 vs 조3위
    { a: { rank: 1, g: 10 }, b: { rank: 2, g: 6 } },   // M10: 10조1위 vs 6조2위
    { a: { rank: 1, g: 11 }, b: { rank: 3, g: 'W' } }, // M11: 11조1위 vs 조3위
    { a: { rank: 1, g: 12 }, b: { rank: 2, g: 8 } },   // M12: 12조1위 vs 8조2위
    { a: { rank: 2, g: 4 },  b: { rank: 2, g: 9 } },   // M13: 4조2위 vs 9조2위
    { a: { rank: 2, g: 3 },  b: { rank: 3, g: 'W' } }, // M14: 3조2위 vs 조3위
    { a: { rank: 2, g: 2 },  b: { rank: 2, g: 11 } },  // M15: 2조2위 vs 11조2위
    { a: { rank: 2, g: 1 },  b: { rank: 3, g: 'W' } }, // M16: 1조2위 vs 조3위
];

// ─── 48팀 가상 데이터 생성 ────────────────────────────────────────────────────
function createTeams() {
    const teams = [];
    // 12조, 각 조 4팀
    for (let g = 1; g <= 12; g++) {
        for (let t = 1; t <= 4; t++) {
            const id = `t${g}_${t}`;
            teams.push({
                id,
                name: `${g}조팀${t}`,
                initial_group: `${g}`,
                group_id: `${g}`,
                drawOrder: (g - 1) * 4 + t,
                // 랜덤 나이 (동점 시 사용)
                tiebreakAge: randInt(60, 160),
                groupRank: null,
            });
        }
    }
    return teams;
}

// ─── 조별 리그 경기 생성 (round-robin) ────────────────────────────────────────
function generateGroupMatches(teams) {
    const matches = [];
    for (let g = 1; g <= 12; g++) {
        const groupTeams = teams.filter(t => t.initial_group === String(g));
        // 4팀 round-robin: C(4,2) = 6경기
        for (let i = 0; i < groupTeams.length; i++) {
            for (let j = i + 1; j < groupTeams.length; j++) {
                matches.push({
                    id: `g${g}_m${matches.length}`,
                    group_id: g,
                    team_a_id: groupTeams[i].id,
                    team_b_id: groupTeams[j].id,
                    score_a: 0, score_b: 0,
                    status: 'PENDING',
                    winner_id: null,
                });
            }
        }
    }
    return matches;
}

// ─── 경기 결과 랜덤 시뮬레이션 ────────────────────────────────────────────────
function simulateMatch(match) {
    // 부전승 처리
    if (match.team_a_id === 'BYE') {
        return { ...match, score_a: 0, score_b: 6, winner_id: match.team_b_id, status: 'COMPLETED' };
    }
    if (match.team_b_id === 'BYE') {
        return { ...match, score_a: 6, score_b: 0, winner_id: match.team_a_id, status: 'COMPLETED' };
    }
    // 랜덤 스코어 (0~6 게임)
    let sa = randInt(0, 6);
    let sb = randInt(0, 6);
    // 무승부 방지
    while (sa === sb) { sb = randInt(0, 6); }
    const winner_id = sa > sb ? match.team_a_id : match.team_b_id;
    return { ...match, score_a: sa, score_b: sb, winner_id, status: 'COMPLETED' };
}

// ─── 순위 계산 ────────────────────────────────────────────────────────────────
function calculateStandings(teams, matches) {
    const grouped = {};
    teams.forEach(t => {
        const g = String(t.initial_group);
        if (!grouped[g]) grouped[g] = [];
        grouped[g].push({
            ...t,
            pts: 0, wins: 0, draws: 0, losses: 0,
            played: 0, goalDiff: 0, pointsFor: 0,
        });
    });

    matches.filter(m => m.status === 'COMPLETED').forEach(m => {
        const gStr = String(m.group_id);
        const gTeams = grouped[gStr];
        if (!gTeams) return;

        const ta = gTeams.find(t => t.id === m.team_a_id);
        const tb = gTeams.find(t => t.id === m.team_b_id);
        if (!ta || !tb) return;

        ta.played++; tb.played++;
        ta.goalDiff += m.score_a - m.score_b;
        tb.goalDiff += m.score_b - m.score_a;
        ta.pointsFor += m.score_a;
        tb.pointsFor += m.score_b;

        if (m.score_a > m.score_b) {
            ta.pts += 3; ta.wins++;
            tb.losses++;
        } else if (m.score_b > m.score_a) {
            tb.pts += 3; tb.wins++;
            ta.losses++;
        } else {
            ta.pts += 1; ta.draws++;
            tb.pts += 1; tb.draws++;
        }
    });

    Object.keys(grouped).forEach(gName => {
        grouped[gName].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.wins !== a.wins) return b.wins - a.wins;
            if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
            const ageA = parseInt(a.tiebreakAge) || 0;
            const ageB = parseInt(b.tiebreakAge) || 0;
            return ageB - ageA; // 나이 높은 팀이 우선
        });
        grouped[gName].forEach((t, i) => t.groupRank = i + 1);
    });

    return grouped;
}

// ─── 와일드카드 선정 ──────────────────────────────────────────────────────────
function selectWildcards(standings) {
    const thirdPlacers = [];
    Object.values(standings).forEach(gTeams => {
        if (gTeams.length >= 3) thirdPlacers.push(gTeams[2]);
    });

    // 동점자 감지
    const statKey = t => `${t.pts}_${t.wins}_${t.goalDiff}`;
    const keyCounts = {};
    thirdPlacers.forEach(t => {
        const k = statKey(t);
        keyCounts[k] = (keyCounts[k] || 0) + 1;
    });

    thirdPlacers.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        const ageA = parseInt(a.tiebreakAge) || 0;
        const ageB = parseInt(b.tiebreakAge) || 0;
        if (ageB !== ageA) return ageB - ageA;
        return 0;
    });

    // 동점 감지
    const top8 = thirdPlacers.slice(0, 8);
    const cutLine = thirdPlacers[7];
    const cutLine_next = thirdPlacers[8];
    if (cutLine && cutLine_next) {
        if (statKey(cutLine) === statKey(cutLine_next)) {
            issue(`[와일드카드 선정] 8th/9th 경계선 동점 발생! ${cutLine.name}(${cutLine.initial_group}조) vs ${cutLine_next.name}(${cutLine_next.initial_group}조) — 나이 기준: ${cutLine.tiebreakAge} vs ${cutLine_next.tiebreakAge}`);
        }
    }

    return top8;
}

// ─── 32강 대진 배치 ───────────────────────────────────────────────────────────
function buildBracket32(standings, wildcards) {
    const rankMap = {}; // { groupNum: { 1: team, 2: team, 3: team } }
    Object.entries(standings).forEach(([gName, gTeams]) => {
        const gNum = parseInt(gName);
        rankMap[gNum] = {};
        gTeams.forEach((t, i) => { rankMap[gNum][i + 1] = t; });
    });

    let wildcardQueue = [...wildcards];

    const matches = [];
    for (let i = 0; i < 16; i++) {
        const def = FIXED_BRACKET_LAYOUT[i];
        const getTeam = (side) => {
            if (side.g === 'W') {
                const wc = wildcardQueue.shift();
                if (!wc) { issue(`[32강 M${i+1}] 와일드카드 팀이 부족합니다!`); return null; }
                return wc;
            }
            const t = rankMap[side.g]?.[side.rank];
            if (!t) { issue(`[32강 M${i+1}] ${side.g}조 ${side.rank}위 팀을 찾을 수 없습니다!`); return null; }
            return t;
        };

        const teamA = getTeam(def.a);
        const teamB = getTeam(def.b);

        // ⚠️ 같은 조 충돌 검사
        if (teamA && teamB && teamA.initial_group === teamB.initial_group) {
            issue(`[32강 M${i+1}] 같은 조(${teamA.initial_group}조) 팀끼리 맞붙음! ${teamA.name} vs ${teamB.name}`);
        }

        matches.push({
            id: `ko32_m${i + 1}`,
            round: 'R32',
            team_a: teamA || { id: 'TBD', name: 'TBD' },
            team_b: teamB || { id: 'TBD', name: 'TBD' },
        });
    }
    return matches;
}

// ─── 녹아웃 토너먼트 진행 ────────────────────────────────────────────────────
function runKnockoutRound(matches, roundName) {
    step(`${roundName} 진행`);
    const results = [];
    const winners = [];

    for (const m of matches) {
        const simResult = simulateMatch({
            ...m,
            team_a_id: m.team_a?.id ?? m.team_a,
            team_b_id: m.team_b?.id ?? m.team_b,
        });
        const winnerTeam = simResult.winner_id === (m.team_a?.id ?? m.team_a)
            ? m.team_a
            : m.team_b;

        log(`  ${m.id}: ${m.team_a?.name ?? m.team_a} ${simResult.score_a} : ${simResult.score_b} ${m.team_b?.name ?? m.team_b} → 승자: ${winnerTeam?.name ?? winnerTeam}`);
        results.push({ ...m, score_a: simResult.score_a, score_b: simResult.score_b, winner: winnerTeam });
        winners.push(winnerTeam);
    }

    // 다음 라운드 매치 생성
    const nextMatches = [];
    for (let i = 0; i < winners.length; i += 2) {
        nextMatches.push({
            id: `${roundName}_m${Math.floor(i / 2) + 1}`,
            round: roundName,
            team_a: winners[i],
            team_b: winners[i + 1] ?? { id: 'BYE', name: 'BYE' },
        });
    }

    ok(`${roundName} 완료 — 진출팀 ${winners.length}팀`);
    return { results, nextMatches, winners };
}

// ─── 예선 순위 요약 출력 ──────────────────────────────────────────────────────
function printStandings(standings) {
    console.log('');
    for (let g = 1; g <= 12; g++) {
        const gTeams = standings[String(g)] || [];
        const row = gTeams.map((t, i) => `${i + 1}위:${t.name}(${t.pts}점)`).join(' | ');
        console.log(`  ${C.gray}${g}조: ${row}${C.reset}`);
    }
}

// ────────────────────────────────────────────────────────────────────────────
//  MAIN SIMULATION
// ────────────────────────────────────────────────────────────────────────────
console.log(`\n${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}`);
console.log(`${C.bold}${C.magenta}  🎾 라켓업 혼복 대회 전체 시뮬레이션${C.reset}`);
console.log(`${C.bold}${C.magenta}  RNG Seed: ${rngState}  (--verbose 옵션으로 상세 보기)${C.reset}`);
console.log(`${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}\n`);

// ① 팀 생성
const teams = createTeams();
info(`총 ${teams.length}팀 생성 완료 (12조 × 4팀)`);

// ② 예선 경기 생성 및 시뮬레이션
header('1단계: 예선 조별리그');
let groupMatches = generateGroupMatches(teams);
info(`예선 총 ${groupMatches.length}경기 생성`);

groupMatches = groupMatches.map(m => simulateMatch(m));
ok('모든 예선 경기 완료');

// ③ 순위 계산
header('2단계: 조별 순위 확정');
const standings = calculateStandings(teams, groupMatches);

// 동점자 체크
let tieCount = 0;
Object.entries(standings).forEach(([gName, gTeams]) => {
    for (let i = 0; i < gTeams.length - 1; i++) {
        const a = gTeams[i], b = gTeams[i + 1];
        if (a.pts === b.pts && a.wins === b.wins && a.goalDiff === b.goalDiff) {
            const ageA = parseInt(a.tiebreakAge) || 0;
            const ageB = parseInt(b.tiebreakAge) || 0;
            if (ageA === ageB) {
                issue(`[${gName}조] ${i+1}위/${i+2}위 완전 동점! ${a.name}(나이:${ageA}) vs ${b.name}(나이:${ageB}) — 동점 해소 불가!`);
            } else {
                info(`[${gName}조] ${i+1}위/${i+2}위 동점 → 나이 기준 해소: ${a.name}(${ageA}) > ${b.name}(${ageB})`);
                tieCount++;
            }
        }
    }
});
ok(`순위 확정 (나이 타이브레이커 ${tieCount}건 처리)`);
if (VERBOSE) printStandings(standings);

// ④ 와일드카드 선정
header('3단계: 와일드카드 선정 (조 3위 상위 8팀)');
const wildcards = selectWildcards(standings);
wildcards.forEach((t, i) => {
    info(`와일드카드 ${i + 1}위: ${t.name} (${t.initial_group}조 3위 | ${t.pts}점 ${t.wins}승 득실${t.goalDiff})`);
});

// ⑤ 32강 대진 배치
header('4단계: 32강 대진 배치');
const bracket32 = buildBracket32(standings, wildcards);
bracket32.forEach(m => {
    const aName = m.team_a?.name ?? 'TBD';
    const bName = m.team_b?.name ?? 'TBD';
    log(`${m.id}: ${aName} vs ${bName}`);
});
ok(`32강 대진 배치 완료 (${bracket32.length}경기)`);

// 배치 검증
const rosterIds = new Set();
let dupCount = 0;
bracket32.forEach(m => {
    [m.team_a, m.team_b].forEach(t => {
        if (t?.id && t.id !== 'TBD' && t.id !== 'BYE') {
            if (rosterIds.has(t.id)) { issue(`[32강] 중복 배치! 팀 ${t.name} 두 경기에 등장`); dupCount++; }
            rosterIds.add(t.id);
        }
    });
});
if (dupCount === 0) ok('32강 중복 배치 없음 ✓');

const missingFromBracket = bracket32.filter(m => m.team_a?.id === 'TBD' || m.team_b?.id === 'TBD');
if (missingFromBracket.length > 0) {
    issue(`TBD 슬롯 ${missingFromBracket.length}개 존재: ${missingFromBracket.map(m=>m.id).join(', ')}`);
} else {
    ok('모든 32강 슬롯이 채워짐 ✓');
}

// ⑥ 32강 → 결승
header('5단계: 본선 토너먼트');

const r32 = runKnockoutRound(bracket32, '32강');
if (r32.winners.length !== 16) {
    issue(`32강 후 진출자 수 이상: ${r32.winners.length}명 (예상: 16명)`);
}

const r16Input = r32.nextMatches;
const r16 = runKnockoutRound(r16Input, '16강');

const r8Input = r16.nextMatches;
const r8 = runKnockoutRound(r8Input, '8강');

const r4Input = r8.nextMatches;
const r4 = runKnockoutRound(r4Input, '4강');

const finalInput = r4.nextMatches;
if (finalInput.length !== 1) {
    issue(`결승 매치 수 이상: ${finalInput.length}개 (예상: 1개)`);
}
const final = runKnockoutRound(finalInput, '결승');

// ⑦ 최종 결과
header('🏆 최종 결과');
const champion = final.winners[0];
const runnerUp = final.results[0]?.winner?.id === final.winners[0]?.id
    ? (final.results[0]?.team_a?.id === champion?.id ? final.results[0]?.team_b : final.results[0]?.team_a)
    : final.winners[0];

console.log(`\n  ${C.bold}${C.yellow}🥇 우승: ${champion?.name ?? '?'} (${champion?.initial_group}조)${C.reset}`);

// 4강 패자 (3위, 4위)
const semis = r4.results;
semis.forEach((m, i) => {
    const loser = m.winner?.id === m.team_a?.id ? m.team_b : m.team_a;
    console.log(`  ${C.gray}🥉 3/4위: ${loser?.name} (${loser?.initial_group}조)${C.reset}`);
});

// ⑧ 문제 요약
header('📋 시뮬레이션 결과 요약');
if (ISSUES.length === 0) {
    ok('발견된 문제 없음! 로직이 정상 동작합니다. 🎉');
} else {
    console.log(`\n  ${C.bold}${C.red}발견된 문제 ${ISSUES.length}건:${C.reset}`);
    ISSUES.forEach((iss, i) => {
        console.log(`  ${C.red}${i + 1}. ${iss}${C.reset}`);
    });
}

console.log(`\n${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}`);
console.log(`${C.gray}  재현하려면: node simulate.mjs --seed=${rngState}${C.reset}`);
console.log(`${C.gray}  상세 로그:  node simulate.mjs --verbose${C.reset}`);
console.log(`${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}\n`);
