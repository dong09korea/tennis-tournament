import React, { useState, useCallback, useMemo } from 'react';
import { FIXED_BRACKET_LAYOUT } from '../utils/tournamentLogic';

// ─── 점수 생성 ────────────────────────────────────────────────────────────────
function randomScore(isGroupStage) {
  const r = Math.random();
  if (isGroupStage && r < 0.25) return { a: 5, b: 5 }; // 25% 무승부
  const loser = [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)];
  const winner = 6;
  // 본선: 추가로 타이브레이크 가능 (7:5 또는 7:6)
  let sa = winner, sb = loser;
  if (!isGroupStage && Math.random() < 0.2) {
    sa = 7; sb = loser === 4 ? 5 : (Math.random() < 0.5 ? 5 : 6);
  }
  return Math.random() < 0.5 ? { a: sa, b: sb } : { a: sb, b: sa };
}

// ─── 팀 생성 (48팀 × 12조 × 4팀) ─────────────────────────────────────────────
function initTeams() {
  const teams = [];
    for (let g = 1; g <= 12; g++) {
      for (let t = 1; t <= 4; t++) {
        const id = `t${g}_${t}`;
        const name = `${g}조 ${t}번팀`;
        teams.push({
          id: id, name: name,
          initial_group: String(g), groupRank: null,
          club: id === 't1_1' ? '불참' : '', // 1조 1번팀은 불참 처리
          tiebreakAge: Math.floor(Math.random() * 100) + 60,
          pts: 0, wins: 0, draws: 0, losses: 0, played: 0, goalDiff: 0,
        });
      }
    }
  return teams;
}

// ─── 조별 경기 생성 (4팀 리그: 6경기, 3라운드×2경기) ─────────────────────────
// 각 match_in_round: 1~6
function initGroupMatches(teams) {
  const schedule4 = [
    { i: 0, j: 1, r: 1 }, { i: 2, j: 3, r: 2 }, // round 1
    { i: 0, j: 2, r: 3 }, { i: 1, j: 3, r: 4 }, // round 2
    { i: 1, j: 2, r: 5 }, { i: 0, j: 3, r: 6 }, // round 3
  ];
  const matches = [];
  for (let g = 1; g <= 12; g++) {
    const gt = teams.filter(t => t.initial_group === String(g));
    schedule4.forEach(({ i, j, r }, idx) => {
      const ta = gt[i];
      const tb = gt[j];
      const isAbsentA = ta.club === '불참' || ta.name.includes('불참');
      const isAbsentB = tb.club === '불참' || tb.name.includes('불참');
      
      const match = {
        id: `g${g}_m${idx + 1}`, group_id: String(g),
        round_in_group: r,
        team_a_id: ta.id, team_b_id: tb.id,
        score_a: null, score_b: null, status: 'PENDING', winner_id: null,
      };

      if (isAbsentA || isAbsentB) {
        match.status = 'COMPLETED';
        match.score_a = isAbsentA ? 0 : 6;
        match.score_b = isAbsentB ? 0 : 6;
        match.winner_id = isAbsentA ? tb.id : ta.id;
      }
      
      matches.push(match);
    });
  }
  return matches;
}

// ─── 순위 계산 ────────────────────────────────────────────────────────────────
function calcStandings(teams, matches) {
  const stats = {};
  teams.forEach(t => { stats[t.id] = { ...t, pts: 0, wins: 0, draws: 0, losses: 0, played: 0, goalDiff: 0 }; });
  matches.filter(m => m.status === 'COMPLETED').forEach(m => {
    const ta = stats[m.team_a_id], tb = stats[m.team_b_id];
    if (!ta || !tb) return;
    ta.played++; tb.played++;
    ta.goalDiff += m.score_a - m.score_b; tb.goalDiff += m.score_b - m.score_a;
    if (m.score_a > m.score_b) { ta.pts += 3; ta.wins++; tb.losses++; }
    else if (m.score_b > m.score_a) { tb.pts += 3; tb.wins++; ta.losses++; }
    else { ta.pts++; ta.draws++; tb.pts++; tb.draws++; }
  });
  const grouped = {};
  Object.values(stats).forEach(t => {
    const g = t.initial_group;
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(t);
  });
  Object.keys(grouped).forEach(g => {
    grouped[g].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
      return (b.tiebreakAge || 0) - (a.tiebreakAge || 0);
    });
    grouped[g].forEach((t, i) => { t.groupRank = i + 1; });
  });
  return grouped;
}

// ─── 와일드카드 선정 ──────────────────────────────────────────────────────────
function selectWildcards(standings) {
  const third = [];
  Object.values(standings).forEach(g => { if (g.length >= 3) third.push({ ...g[2] }); });
  third.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    return (b.tiebreakAge || 0) - (a.tiebreakAge || 0);
  });
  return third.slice(0, 8);
}

// ─── 32강 대진 생성 ───────────────────────────────────────────────────────────
function buildBracket32(standings, wildcards) {
  const rankMap = {};
  Object.entries(standings).forEach(([g, ts]) => {
    const gn = parseInt(g);
    rankMap[gn] = {};
    ts.forEach((t, i) => { rankMap[gn][i + 1] = t; });
  });
  let wq = [...wildcards];
  return FIXED_BRACKET_LAYOUT.map((def, i) => {
    const getTeam = (side) => {
      if (side.g === 'W') return wq.shift() || null;
      return rankMap[side.g]?.[side.rank] || null;
    };
    return {
      id: `ko32_m${i + 1}`, round: 'R32',
      team_a: getTeam(def.a), team_b: getTeam(def.b),
      score_a: null, score_b: null, status: 'PENDING', winner_id: null,
    };
  });
}

// ─── 다음 라운드 생성 ─────────────────────────────────────────────────────────
function buildNextRound(prevMatches, prefix) {
  const winners = prevMatches.map(m =>
    m.winner_id === m.team_a?.id ? m.team_a : m.team_b
  );
  return Array.from({ length: winners.length / 2 }, (_, i) => ({
    id: `${prefix}_m${i + 1}`,
    team_a: winners[i * 2], team_b: winners[i * 2 + 1],
    score_a: null, score_b: null, status: 'PENDING', winner_id: null,
  }));
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
const SimulatorTab = ({ realTeams }) => {
  const [teams, setTeams] = useState(() => initTeams());
  const [groupMatches, setGroupMatches] = useState(() => initGroupMatches(initTeams()));

  // Sync real teams into simulator if available
  React.useEffect(() => {
    if (realTeams && realTeams.length > 0 && phase === 'group' && completedRound === 0) {
      // Group by initial_group
      const byGroup = {};
      realTeams.forEach(t => {
        const gn = String(t.initial_group || t.group_id || '').replace('조', '');
        if (!byGroup[gn]) byGroup[gn] = [];
        byGroup[gn].push(t);
      });

      const newTeams = [];
      const hasRealData = Object.keys(byGroup).length > 0;
      
      if (hasRealData) {
        for (let g = 1; g <= 12; g++) {
          const gt = byGroup[String(g)] || [];
          for (let t = 1; t <= 4; t++) {
            const rt = gt[t-1];
            const id = rt?.id || `t${g}_${t}`;
            const name = rt?.name || `${g}조 ${t}번팀`;
            newTeams.push({
              id: id,
              name: name,
              initial_group: String(g),
              groupRank: null,
              club: rt?.club || '', 
              tiebreakAge: rt?.tiebreakAge || Math.floor(Math.random() * 100) + 60,
              pts: 0, wins: 0, draws: 0, losses: 0, played: 0, goalDiff: 0,
            });
          }
        }
        setTeams(newTeams);
        setGroupMatches(initGroupMatches(newTeams));
      }
    }
  }, [realTeams]);

  const [completedRound, setCompletedRound] = useState(0); // 0~6
  const [wildcards, setWildcards] = useState([]);
  const [r32, setR32] = useState([]);
  const [r16, setR16] = useState([]);
  const [r8, setR8]   = useState([]);
  const [r4, setR4]   = useState([]);
  const [fin, setFin] = useState([]);
  const [phase, setPhase] = useState('group'); // group|wildcard|r32|r16|r8|r4|final|done
  const [editingMatch, setEditingMatch] = useState(null); // { matchId, roundKey }
  const [scoreInput, setScoreInput] = useState({ a: '', b: '' });
  const [viewTab, setViewTab] = useState('group'); // group|bracket

  const standings = useMemo(() => calcStandings(teams, groupMatches), [teams, groupMatches]);

  // ── 라운드 자동 시뮬레이션 ─────────────────────────────────────────────────
  const simulateRound = useCallback((roundNum) => {
    setGroupMatches(prev => prev.map(m => {
      if (m.round_in_group !== roundNum || m.status === 'COMPLETED') return m;
      
      const ta = teams.find(t => t.id === m.team_a_id);
      const tb = teams.find(t => t.id === m.team_b_id);
      const isAbsentA = ta?.club === '불참' || ta?.name?.includes('불참');
      const isAbsentB = tb?.club === '불참' || tb?.name?.includes('불참');

      if (isAbsentA || isAbsentB) {
        return {
          ...m,
          score_a: isAbsentA ? 0 : 6,
          score_b: isAbsentB ? 0 : 6,
          winner_id: isAbsentA ? m.team_b_id : m.team_a_id,
          status: 'COMPLETED'
        };
      }

      const s = randomScore(true);
      const winner_id = s.a > s.b ? m.team_a_id : (s.b > s.a ? m.team_b_id : null);
      return { ...m, score_a: s.a, score_b: s.b, winner_id, status: 'COMPLETED' };
    }));
    setCompletedRound(roundNum);
  }, []);

  // ── 와일드카드 선정 ────────────────────────────────────────────────────────
  const doWildcard = useCallback(() => {
    const wc = selectWildcards(standings);
    setWildcards(wc);
    setPhase('r32');
    setViewTab('bracket');
  }, [standings]);

  // ── 와일드카드 후 32강 대진 생성 ──────────────────────────────────────────
  const doBracket32 = useCallback(() => {
    const b32 = buildBracket32(standings, wildcards);
    setR32(b32);
    setPhase('r32_ready');
  }, [standings, wildcards]);

  // ── 녹아웃 라운드 자동 처리 ────────────────────────────────────────────────
  const simulateKnockout = useCallback((matches, setFn, nextSetFn, nextPrefix, nextPhase) => {
    const completed = matches.map(m => {
      const s = randomScore(false);
      const winner = s.a > s.b ? m.team_a : m.team_b;
      return { ...m, score_a: s.a, score_b: s.b, winner_id: winner?.id, status: 'COMPLETED' };
    });
    setFn(completed);
    if (nextSetFn && nextPrefix) {
      nextSetFn(buildNextRound(completed, nextPrefix));
    }
    setPhase(nextPhase);
  }, []);

  // ── 직접 점수 입력 저장 ────────────────────────────────────────────────────
  const saveScore = useCallback(() => {
    const sa = parseInt(scoreInput.a), sb = parseInt(scoreInput.b);
    if (isNaN(sa) || isNaN(sb) || sa < 0 || sb < 0) return alert('올바른 점수를 입력하세요');
    if (sa === sb && sa !== 5) return alert('무승부는 5:5만 허용됩니다 (예선전)');
    const { matchId, roundKey } = editingMatch;

    const applyScore = (matches) => matches.map(m => {
      if (m.id !== matchId) return m;
      const winner_id = sa > sb ? m.team_a?.id ?? m.team_a_id : (sb > sa ? m.team_b?.id ?? m.team_b_id : null);
      return { ...m, score_a: sa, score_b: sb, winner_id, status: 'COMPLETED' };
    });

    if (roundKey === 'group') setGroupMatches(applyScore);
    else if (roundKey === 'r32') setR32(applyScore);
    else if (roundKey === 'r16') setR16(applyScore);
    else if (roundKey === 'r8')  setR8(applyScore);
    else if (roundKey === 'r4')  setR4(applyScore);
    else if (roundKey === 'fin') setFin(applyScore);
    setEditingMatch(null);
    setScoreInput({ a: '', b: '' });
  }, [scoreInput, editingMatch]);

  // ── 리셋 ─────────────────────────────────────────────────────────────────
  const reset = () => {
    const fresh = initTeams();
    setGroupMatches(initGroupMatches(fresh));
    setCompletedRound(0); setWildcards([]); setR32([]); setR16([]); setR8([]); setR4([]); setFin([]);
    setPhase('group'); setViewTab('group'); setEditingMatch(null);
  };

  // ── 유틸 ─────────────────────────────────────────────────────────────────
  const getName = (t) => t?.name ?? t?.id ?? 'TBD';
  const isGroupDone = completedRound >= 6;

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: '1rem', color: '#fff', maxWidth: 1200, margin: '0 auto' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: '#d5ff00', margin: 0 }}>🧪 시뮬레이션 테스트</h2>
        <button onClick={reset} style={btnStyle('#444', '#fff')}>🔄 전체 리셋</button>
      </div>

      {/* 진행 단계 표시 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {['group', 'wildcard', 'r32_ready', 'r16', 'r8', 'r4', 'done'].map((p, i) => (
          <span key={p} style={{
            padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
            background: phase === p || (p === 'group' && phase === 'group') ? '#d5ff00' : 'rgba(255,255,255,0.08)',
            color: phase === p ? '#111' : '#666',
          }}>{['예선', '와일드카드', '32강', '16강', '8강', '4강', '결승'][i]}</span>
        ))}
      </div>

      {/* 뷰 탭 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        {[['group', '조별 현황'], ['bracket', '대진표']].map(([k, l]) => (
          <button key={k} onClick={() => setViewTab(k)}
            style={btnStyle(viewTab === k ? '#d5ff00' : '#222', viewTab === k ? '#111' : '#aaa')}>{l}</button>
        ))}
      </div>

      {/* ── 조별 현황 뷰 ── */}
      {viewTab === 'group' && (
        <div>
          {/* 예선 라운드 버튼 */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[1,2,3,4,5,6].map(r => (
              <button key={r} onClick={() => simulateRound(r)}
                disabled={r > completedRound + 1 || completedRound >= r}
                style={btnStyle(
                  completedRound >= r ? '#2a4a1a' : r === completedRound + 1 ? '#d5ff00' : '#333',
                  completedRound >= r ? '#4caf50' : r === completedRound + 1 ? '#111' : '#666',
                )}>
                {completedRound >= r ? `✅ ${r}라운드` : `▶ ${r}라운드 시뮬`}
              </button>
            ))}
          </div>

          {/* 조별 순위표 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {Array.from({ length: 12 }, (_, gi) => {
              const gName = String(gi + 1);
              const gTeams = standings[gName] || [];
              const gMatches = groupMatches.filter(m => m.group_id === gName);
              return (
                <div key={gName} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ background: 'rgba(213,255,0,0.1)', padding: '6px 12px', fontWeight: 800, color: '#d5ff00', fontSize: '0.9rem' }}>
                    {gName}조
                  </div>
                  {gTeams.map((t, idx) => (
                    <div key={t.id} style={{ display: 'flex', padding: '5px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: idx < 2 ? '#d5ff00' : idx === 2 ? '#5599ff' : '#555', fontWeight: 800, width: 16 }}>{idx + 1}</span>
                      <span style={{ flex: 1 }}>{t.name}</span>
                      <span style={{ color: '#aaa' }}>{t.pts}P</span>
                      <span style={{ color: '#666', fontSize: '0.75rem' }}>{t.wins}승 {t.draws}무 {t.losses}패 ({t.goalDiff > 0 ? '+' : ''}{t.goalDiff})</span>
                    </div>
                  ))}
                  {/* 경기 결과 & 직접입력 */}
                  {gMatches.map(m => {
                    const ta = teams.find(t => t.id === m.team_a_id);
                    const tb = teams.find(t => t.id === m.team_b_id);
                    const isEdit = editingMatch?.matchId === m.id;
                    return (
                      <div key={m.id} style={{ padding: '4px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: '#555', width: 40 }}>R{m.round_in_group}</span>
                        <span style={{ flex: 1, color: '#aaa' }}>{ta?.name ?? m.team_a_id}</span>
                        {m.status === 'COMPLETED' ? (
                          <span style={{ color: '#d5ff00', fontWeight: 700 }}>{m.score_a}:{m.score_b}</span>
                        ) : (
                          <span style={{ color: '#444' }}>vs</span>
                        )}
                        <span style={{ flex: 1, color: '#aaa', textAlign: 'right' }}>{tb?.name ?? m.team_b_id}</span>
                        {isEdit ? (
                          <span style={{ display: 'flex', gap: 4 }}>
                            <input value={scoreInput.a} onChange={e => setScoreInput(p => ({ ...p, a: e.target.value }))} style={inputStyle} placeholder="A" />
                            <input value={scoreInput.b} onChange={e => setScoreInput(p => ({ ...p, b: e.target.value }))} style={inputStyle} placeholder="B" />
                            <button onClick={saveScore} style={btnStyle('#4caf50', '#fff', true)}>✓</button>
                            <button onClick={() => setEditingMatch(null)} style={btnStyle('#555', '#aaa', true)}>✕</button>
                          </span>
                        ) : (
                          <button onClick={() => { setEditingMatch({ matchId: m.id, roundKey: 'group' }); setScoreInput({ a: '', b: '' }); }}
                            style={btnStyle('#333', '#888', true)}>✏️</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* 와일드카드 선정 버튼 */}
          {isGroupDone && phase === 'group' && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button onClick={() => { doWildcard(); setPhase('wildcard'); }}
                style={{ ...btnStyle('#1de9b6', '#000'), padding: '14px 40px', fontSize: '1.1rem', fontWeight: 900 }}>
                🏆 와일드카드 선정 & 32강 대진 생성
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── 대진표 뷰 ── */}
      {viewTab === 'bracket' && (
        <div>
          {/* 와일드카드 목록 */}
          {wildcards.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#5599ff', marginBottom: 8 }}>🃏 와일드카드 (조 3위 상위 8팀)</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {wildcards.map((t, i) => (
                  <div key={t.id} style={{ background: 'rgba(85,153,255,0.15)', border: '1px solid rgba(85,153,255,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#5599ff', fontWeight: 800 }}>WC{i+1}</span>
                    <span style={{ marginLeft: 8, color: '#fff' }}>{t.name}</span>
                    <span style={{ marginLeft: 8, color: '#aaa', fontSize: '0.75rem' }}>{t.pts}P {t.wins}승 득실{t.goalDiff}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 32강 대진 버튼 */}
          {phase === 'wildcard' && wildcards.length === 8 && (
            <button onClick={doBracket32} style={{ ...btnStyle('#d5ff00', '#111'), padding: '12px 32px', fontWeight: 900, fontSize: '1rem', marginBottom: '1.5rem' }}>
              ▶ 32강 대진 확정
            </button>
          )}

          {/* 각 라운드 대진 표시 */}
          {[
            { key: 'r32', label: '32강', matches: r32, setFn: setR32, nextSetFn: setR16, nextPrefix: 'ko16', nextPhase: 'r16', simPhase: 'r32_ready', isGroup: false },
            { key: 'r16', label: '16강', matches: r16, setFn: setR16, nextSetFn: setR8, nextPrefix: 'ko8', nextPhase: 'r8', simPhase: 'r16', isGroup: false },
            { key: 'r8',  label: '8강',  matches: r8,  setFn: setR8,  nextSetFn: setR4, nextPrefix: 'ko4', nextPhase: 'r4', simPhase: 'r8', isGroup: false },
            { key: 'r4',  label: '4강',  matches: r4,  setFn: setR4,  nextSetFn: setFin, nextPrefix: 'final', nextPhase: 'r4done', simPhase: 'r4', isGroup: false },
            { key: 'fin', label: '결승', matches: fin, setFn: setFin, nextSetFn: null, nextPrefix: null, nextPhase: 'done', simPhase: 'r4done', isGroup: false },
          ].map(({ key, label, matches, setFn, nextSetFn, nextPrefix, nextPhase, simPhase }) => {
            if (matches.length === 0) return null;
            const allDone = matches.length > 0 && matches.every(m => m.status === 'COMPLETED');
            return (
              <div key={key} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <h3 style={{ margin: 0, color: '#d5ff00' }}>{label}</h3>
                  {phase === simPhase && !allDone && (
                    <button onClick={() => simulateKnockout(matches, setFn, nextSetFn, nextPrefix, nextPhase)}
                      style={btnStyle('#d5ff00', '#111')}>
                      ▶ {label} 전체 시뮬
                    </button>
                  )}
                  {allDone && nextSetFn && phase === simPhase && (
                    <button onClick={() => setPhase(nextPhase)} style={btnStyle('#1de9b6', '#000')}>
                      → {nextPrefix?.replace('ko', '') || '결승'} 대진 보기
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
                  {matches.map(m => {
                    const isEdit = editingMatch?.matchId === m.id;
                    const teamA = m.team_a, teamB = m.team_b;
                    return (
                      <div key={m.id} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                          <span style={{ flex: 1, fontWeight: 700, color: m.winner_id === teamA?.id ? '#d5ff00' : '#ccc', fontSize: '0.85rem' }}>{getName(teamA)}</span>
                          {m.status === 'COMPLETED'
                            ? <span style={{ color: '#d5ff00', fontWeight: 900, fontSize: '1rem' }}>{m.score_a} : {m.score_b}</span>
                            : <span style={{ color: '#444' }}>vs</span>}
                          <span style={{ flex: 1, fontWeight: 700, color: m.winner_id === teamB?.id ? '#d5ff00' : '#ccc', fontSize: '0.85rem', textAlign: 'right' }}>{getName(teamB)}</span>
                        </div>
                        {isEdit ? (
                          <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
                            <input value={scoreInput.a} onChange={e => setScoreInput(p => ({ ...p, a: e.target.value }))} style={{ ...inputStyle, flex: 1 }} placeholder="A점수" />
                            <span style={{ color: '#666' }}>:</span>
                            <input value={scoreInput.b} onChange={e => setScoreInput(p => ({ ...p, b: e.target.value }))} style={{ ...inputStyle, flex: 1 }} placeholder="B점수" />
                            <button onClick={saveScore} style={btnStyle('#4caf50', '#fff')}>저장</button>
                            <button onClick={() => setEditingMatch(null)} style={btnStyle('#555', '#aaa')}>취소</button>
                          </div>
                        ) : (
                          <button onClick={() => { setEditingMatch({ matchId: m.id, roundKey: key }); setScoreInput({ a: '', b: '' }); }}
                            style={{ ...btnStyle('#333', '#888'), marginTop: 6, fontSize: '0.75rem', width: '100%' }}>✏️ 직접 점수 입력</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* 우승자 */}
          {phase === 'done' && fin.length > 0 && (() => {
            const finalMatch = fin[0];
            const champ = finalMatch?.winner_id === finalMatch?.team_a?.id ? finalMatch?.team_a : finalMatch?.team_b;
            return (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg,rgba(213,255,0,0.1),rgba(255,200,0,0.1))', borderRadius: 20, border: '2px solid #d5ff00' }}>
                <div style={{ fontSize: '4rem' }}>🏆</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#d5ff00', marginTop: 8 }}>우승</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 4 }}>{getName(champ)}</div>
              </div>
            );
          })()}
        </div>
      )}

      <style>{`
        .sim-tab button:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

// ─── 스타일 헬퍼 ─────────────────────────────────────────────────────────────
const btnStyle = (bg, color, small = false) => ({
  background: bg, color, border: 'none', borderRadius: 8,
  padding: small ? '3px 8px' : '8px 18px',
  fontWeight: 700, cursor: 'pointer', fontSize: small ? '0.78rem' : '0.88rem',
  transition: 'opacity 0.2s',
});
const inputStyle = {
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 6, color: '#fff', padding: '3px 8px', width: 50, textAlign: 'center',
  fontSize: '0.85rem',
};

export default SimulatorTab;
