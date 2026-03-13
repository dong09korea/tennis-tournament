/**
 * 🎾 Tournament Full Simulation Script
 * 색상/ANSI 코드 없는 버전 (Windows 호환)
 * 사용법: node simulate_plain.mjs [--verbose]
 */

const VERBOSE = process.argv.includes('--verbose');
let rngState = Date.now() & 0x7fffffff;

function rand() {
    rngState ^= rngState << 13;
    rngState ^= rngState >> 17;
    rngState ^= rngState << 5;
    return Math.abs(rngState) / 0x7fffffff;
}
function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }

const ISSUES = [];
const issue = (msg) => { ISSUES.push(msg); console.log(`  [문제] ${msg}`); };
const ok = (msg) => console.log(`  [OK] ${msg}`);
const info = (msg) => console.log(`  [정보] ${msg}`);
const step = (msg) => console.log(`\n>> ${msg}`);
const log = (msg) => { if (VERBOSE) console.log(`     ${msg}`); };
const sep = () => console.log('='.repeat(60));

const FIXED_BRACKET_LAYOUT = [
    { a: { rank: 1, g: 1 },  b: { rank: 2, g: 5 } },
    { a: { rank: 1, g: 2 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 3 },  b: { rank: 2, g: 7 } },
    { a: { rank: 1, g: 4 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 5 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 6 },  b: { rank: 2, g: 10 } },
    { a: { rank: 1, g: 7 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 8 },  b: { rank: 2, g: 12 } },
    { a: { rank: 1, g: 9 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 10 }, b: { rank: 2, g: 6 } },
    { a: { rank: 1, g: 11 }, b: { rank: 3, g: 'W' } },
    { a: { rank: 1, g: 12 }, b: { rank: 2, g: 8 } },
    { a: { rank: 2, g: 4 },  b: { rank: 2, g: 9 } },
    { a: { rank: 2, g: 3 },  b: { rank: 3, g: 'W' } },
    { a: { rank: 2, g: 2 },  b: { rank: 2, g: 11 } },
    { a: { rank: 2, g: 1 },  b: { rank: 3, g: 'W' } },
];

function createTeams() {
    const teams = [];
    for (let g = 1; g <= 12; g++) {
        for (let t = 1; t <= 4; t++) {
            teams.push({
                id: `t${g}_${t}`,
                name: `${g}조팀${t}`,
                initial_group: String(g),
                tiebreakAge: randInt(60, 160),
                groupRank: null,
            });
        }
    }
    return teams;
}

function generateGroupMatches(teams) {
    const matches = [];
    for (let g = 1; g <= 12; g++) {
        const gt = teams.filter(t => t.initial_group === String(g));
        for (let i = 0; i < gt.length; i++)
            for (let j = i + 1; j < gt.length; j++)
                matches.push({ id: `g${g}_m${matches.length}`, group_id: String(g), team_a_id: gt[i].id, team_b_id: gt[j].id, score_a: 0, score_b: 0, status: 'PENDING', winner_id: null });
    }
    return matches;
}

function simulateMatch(m) {
    if (m.team_a_id === 'BYE') return { ...m, score_a: 0, score_b: 6, winner_id: m.team_b_id, status: 'COMPLETED' };
    if (m.team_b_id === 'BYE') return { ...m, score_a: 6, score_b: 0, winner_id: m.team_a_id, status: 'COMPLETED' };
    let sa = randInt(0, 6), sb = randInt(0, 6);
    while (sa === sb) sb = randInt(0, 6);
    return { ...m, score_a: sa, score_b: sb, winner_id: sa > sb ? m.team_a_id : m.team_b_id, status: 'COMPLETED' };
}

function calculateStandings(teams, matches) {
    const grouped = {};
    teams.forEach(t => {
        const g = t.initial_group;
        if (!grouped[g]) grouped[g] = [];
        grouped[g].push({ ...t, pts: 0, wins: 0, draws: 0, losses: 0, played: 0, goalDiff: 0, pointsFor: 0 });
    });
    matches.filter(m => m.status === 'COMPLETED').forEach(m => {
        const gTeams = grouped[m.group_id];
        if (!gTeams) return;
        const ta = gTeams.find(t => t.id === m.team_a_id);
        const tb = gTeams.find(t => t.id === m.team_b_id);
        if (!ta || !tb) return;
        ta.played++; tb.played++;
        ta.goalDiff += m.score_a - m.score_b; tb.goalDiff += m.score_b - m.score_a;
        ta.pointsFor += m.score_a; tb.pointsFor += m.score_b;
        if (m.score_a > m.score_b) { ta.pts += 3; ta.wins++; tb.losses++; }
        else if (m.score_b > m.score_a) { tb.pts += 3; tb.wins++; ta.losses++; }
        else { ta.pts++; ta.draws++; tb.pts++; tb.draws++; }
    });
    Object.keys(grouped).forEach(gName => {
        grouped[gName].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.wins !== a.wins) return b.wins - a.wins;
            if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
            return (parseInt(b.tiebreakAge)||0) - (parseInt(a.tiebreakAge)||0);
        });
        grouped[gName].forEach((t, i) => t.groupRank = i + 1);
    });
    return grouped;
}

function selectWildcards(standings) {
    const third = [];
    Object.values(standings).forEach(g => { if (g.length >= 3) third.push(g[2]); });
    third.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        return (parseInt(b.tiebreakAge)||0) - (parseInt(a.tiebreakAge)||0);
    });
    // 경계선 동점 체크
    const key = t => `${t.pts}_${t.wins}_${t.goalDiff}`;
    if (third[7] && third[8] && key(third[7]) === key(third[8])) {
        const a = third[7], b = third[8];
        if ((parseInt(a.tiebreakAge)||0) === (parseInt(b.tiebreakAge)||0))
            issue(`와일드카드 8위/9위 완전 동점 해소 불가! ${a.name}(${a.initial_group}조) vs ${b.name}(${b.initial_group}조)`);
        else
            info(`와일드카드 8위/9위 동점 → 나이 기준 해소: ${a.name}(${a.tiebreakAge}) vs ${b.name}(${b.tiebreakAge})`);
    }
    return third.slice(0, 8);
}

function buildBracket32(standings, wildcards) {
    const rankMap = {};
    Object.entries(standings).forEach(([gName, gTeams]) => {
        const gNum = parseInt(gName);
        rankMap[gNum] = {};
        gTeams.forEach((t, i) => rankMap[gNum][i + 1] = t);
    });
    let wq = [...wildcards];
    const matches = [];
    for (let i = 0; i < 16; i++) {
        const def = FIXED_BRACKET_LAYOUT[i];
        const getTeam = (side) => {
            if (side.g === 'W') {
                const wc = wq.shift();
                if (!wc) { issue(`32강 M${i+1}: 와일드카드 팀 부족!`); return { id: 'TBD', name: 'TBD' }; }
                return wc;
            }
            const t = rankMap[side.g]?.[side.rank];
            if (!t) { issue(`32강 M${i+1}: ${side.g}조 ${side.rank}위 팀 없음!`); return { id: 'TBD', name: 'TBD' }; }
            return t;
        };
        const ta = getTeam(def.a);
        const tb = getTeam(def.b);
        if (ta.id !== 'TBD' && tb.id !== 'TBD' && ta.initial_group === tb.initial_group)
            issue(`32강 M${i+1}: 같은 조(${ta.initial_group}조) 충돌! ${ta.name} vs ${tb.name}`);
        matches.push({ id: `ko32_m${i+1}`, team_a: ta, team_b: tb });
    }
    return matches;
}

function runKnockoutRound(matches, label) {
    step(`${label} (${matches.length}경기)`);
    const winners = [];
    matches.forEach(m => {
        const sim = simulateMatch({ ...m, team_a_id: m.team_a?.id, team_b_id: m.team_b?.id });
        const winner = sim.winner_id === m.team_a?.id ? m.team_a : m.team_b;
        log(`${m.id}: ${m.team_a?.name} ${sim.score_a}:${sim.score_b} ${m.team_b?.name} → 승: ${winner?.name}`);
        winners.push(winner);
    });
    const next = [];
    for (let i = 0; i < winners.length; i += 2)
        next.push({ id: `${label}_m${Math.floor(i/2)+1}`, team_a: winners[i], team_b: winners[i+1] ?? { id:'BYE', name:'BYE' } });
    ok(`${label} 완료 — 진출 ${winners.length}팀`);
    return { winners, next };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
sep();
console.log('  라켓업 혼복 대회 전체 시뮬레이션');
console.log(`  RNG Seed: ${rngState}  (--verbose 로 상세 출력)`);
sep();

const teams = createTeams();
info(`${teams.length}팀 생성 완료`);

sep(); console.log('1단계: 예선 조별리그');
let gMatches = generateGroupMatches(teams);
info(`예선 총 ${gMatches.length}경기`);
gMatches = gMatches.map(m => simulateMatch(m));
ok('예선 완료');

sep(); console.log('2단계: 조별 순위');
const standings = calculateStandings(teams, gMatches);
let tieN = 0;
Object.entries(standings).forEach(([g, ts]) => {
    const row = ts.map((t,i) => `${i+1}위:${t.name}(${t.pts}P)`).join(' | ');
    console.log(`  ${g}조: ${row}`);
    for (let i=0; i < ts.length-1; i++) {
        const a=ts[i], b=ts[i+1];
        if (a.pts===b.pts && a.wins===b.wins && a.goalDiff===b.goalDiff) {
            const ageA=parseInt(a.tiebreakAge)||0, ageB=parseInt(b.tiebreakAge)||0;
            if (ageA===ageB) issue(`${g}조 ${i+1}위/${i+2}위 완전 동점 해소 불가 (${a.name} vs ${b.name})`);
            else { info(`${g}조 동점 → 나이: ${a.name}(${ageA}) vs ${b.name}(${ageB})`); tieN++; }
        }
    }
});
ok(`순위 확정 (동점 나이해소 ${tieN}건)`);

sep(); console.log('3단계: 와일드카드 선정');
const wildcards = selectWildcards(standings);
wildcards.forEach((t,i) => info(`WC ${i+1}: ${t.name} (${t.initial_group}조 | ${t.pts}P ${t.wins}승 득실${t.goalDiff})`));

sep(); console.log('4단계: 32강 대진 배치');
const bracket32 = buildBracket32(standings, wildcards);
bracket32.forEach(m => log(`${m.id}: ${m.team_a?.name} vs ${m.team_b?.name}`));
const ids = new Set();
bracket32.forEach(m => {
    [m.team_a, m.team_b].forEach(t => {
        if (t?.id && t.id!=='TBD'&&t.id!=='BYE') {
            if (ids.has(t.id)) issue(`중복배치: ${t.name}`);
            ids.add(t.id);
        }
    });
});
const tbds = bracket32.filter(m => m.team_a?.id==='TBD'||m.team_b?.id==='TBD');
if (tbds.length) issue(`TBD 슬롯 ${tbds.length}개: ${tbds.map(m=>m.id).join(',')}`);
else ok('32강 슬롯 전부 채워짐');

sep(); console.log('5단계: 본선 토너먼트');
const r32 = runKnockoutRound(bracket32, '32강');
const r16 = runKnockoutRound(r32.next, '16강');
const r8  = runKnockoutRound(r16.next, '8강');
const r4  = runKnockoutRound(r8.next, '4강');
const fin = runKnockoutRound(r4.next, '결승');

sep(); console.log('최종 결과');
const champ = fin.winners[0];
console.log(`  우승: ${champ?.name} (${champ?.initial_group}조)`);
r4.winners.slice(2).forEach(t => console.log(`  3/4위: ${t?.name}`));

sep(); console.log('시뮬레이션 결과 요약');
if (ISSUES.length === 0) ok('발견된 문제 없음! 로직 정상 동작. 🎉');
else { console.log(`  발견된 문제 ${ISSUES.length}건:`); ISSUES.forEach((iss,i) => console.log(`  ${i+1}. ${iss}`)); }
console.log(`\n  재현: node simulate_plain.mjs --seed=???`);
sep();
