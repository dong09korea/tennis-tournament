import streamlit as st
import pandas as pd
from utils import logic
from views import bracket

def render(db):
    st.title("📊 대회 현황 (Public Dashboard)")
    
    col_nav1, col_nav2 = st.columns([1, 4])
    with col_nav1:
        if st.button("🏠 홈으로", use_container_width=True):
            st.query_params.clear()
            st.rerun()
    with col_nav2:
        if st.button("새로고침", use_container_width=True):
            st.rerun()

    # Smart Format with players helper
    def get_smart_name(t):
        name = t['name']
        p1 = t.get('player1', '')
        p2 = t.get('player2', '')
        if p1 or p2:
            if f"{p1}, {p2}" not in name:
                 return f"{name}\n({p1}, {p2})"
        return name

    # --- NEW: Priority View (Hot & Next) ---
    st.divider()
    hot_matches = logic.get_closing_matches(db)
    pending_matches = logic.get_pending_matches(db, limit=5)
    
    # Only show if there is something interesting
    if hot_matches or pending_matches:
        st.subheader("🔥 경기 종료 임박 & 대기 현황")
        p_col1, p_col2 = st.columns([1.2, 1])
        
        with p_col1:
            st.markdown("##### 🚨 곧 끝나는 코트 (준비해주세요!)")
            if hot_matches:
                for m in hot_matches:
                    court_info = "미정"
                    # Find court
                    courts = db.get_courts()
                    for c in courts:
                         if c['match_id'] == m['id']:
                             court_info = f"{c['id']}번 코트"
                             break
                    
                    with st.container(border=True):
                         h_cols = st.columns([0.8, 2, 1])
                         with h_cols[0]:
                             st.error(court_info, icon="🏟️")
                         with h_cols[1]:
                             tA = next(t for t in db.get_teams() if t['id'] == m['team_a_id'])['name']
                             tB = next(t for t in db.get_teams() if t['id'] == m['team_b_id'])['name']
                             st.write(f"**{tA}** vs **{tB}**")
                         with h_cols[2]:
                             st.write(f"**{m['score_a']} : {m['score_b']}**")
                             if m.get('is_tie_break'): st.caption("TIE")
            else:
                st.info("현재 종료 임박한 경기가 없습니다.")

        with p_col2:
            st.markdown("##### ⏳ 다음 대기 경기 (Top 5)")
            if pending_matches:
                p_list = []
                for m in pending_matches:
                    tA = next(t for t in db.get_teams() if t['id'] == m['team_a_id'])['name']
                    tB = next(t for t in db.get_teams() if t['id'] == m['team_b_id'])['name']
                    
                    # Court Info (If assigned)
                    c_id = m.get('court_id')
                    c_str = f"{c_id}번 코트" if c_id else "미정"
                    
                    p_list.append({
                        "경기": f"{m['group_id']}조 {m['round']}R",
                        "대진": f"{tA} vs {tB}",
                        "예정 코트": c_str
                    })
                st.dataframe(pd.DataFrame(p_list), hide_index=True, use_container_width=True)
            else:
                st.caption("대기 중인 경기가 없습니다.")
                
    st.divider()

    # Tabs
    tab_courts, tab_standings, tab_bracket = st.tabs(["🏟️ 실시간 코트", "🏆 조별 순위", "🧬 대진표"])

    # --- TAB 1: LIVE COURTS ---
    with tab_courts:
        st.subheader("실시간 코트 현황")
        courts = db.get_courts()
        matches = db.get_matches()
        teams = db.get_teams()
        

        
        c_cols = st.columns(3)
        for i in range(len(courts)):
            court = courts[i]
            match = next((m for m in matches if m['id'] == court['match_id']), None)
            
            with c_cols[i%3]:

                # Match Player Page Style: st.container(border=True)
                with st.container(border=True):
                    st.markdown(f"**{court['id']}번 코트**")
                    
                    if match:
                        tA = next(t for t in teams if t['id'] == match['team_a_id'])
                        tB = next(t for t in teams if t['id'] == match['team_b_id'])
                        
                        nA = tA['name']
                        nB = tB['name']
                        
                        # Tie Break Logic
                        tb_label = ""
                        if match.get('is_tie_break'):
                            tb_label = " <span style='color:orange;'>(TIE BREAK)</span>"

                        # Custom HTML for centered and better layout
                        st.markdown(f"""
                            <div style="text-align: center;">
                                <div style="font-size: 0.9em; color: #ccc; margin-bottom: 5px;">
                                    {match['group_id']}조 {match['round']}경기{tb_label}
                                </div>
                                <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="font-size: 1.2em; font-weight: bold; width: 45%; text-align: right; color: #ffffff;">{nA}</div>
                                    <div style="font-size: 0.9em; color: #aaa;">vs</div>
                                    <div style="font-size: 1.2em; font-weight: bold; width: 45%; text-align: left; color: #ffffff;">{nB}</div>
                                </div>
                                <div style="font-size: 2.2em; font-weight: bold; color: #ccff00; margin-bottom: 5px;">
                                    {match['score_a']} : {match['score_b']}
                                </div>
                        """, unsafe_allow_html=True)

                        # Points
                        pts_map = ['0', '15', '30', '40', 'AD']
                        if match.get('is_tie_break'):
                            pa, pb = match['point_a'], match['point_b']
                        else:
                            pa = pts_map[match['point_a']]
                            pb = pts_map[match['point_b']]
                            
                        st.markdown(f"""
                                <div style="font-size: 1.0em; color: #ddd;">
                                    Points: {pa} - {pb}
                                </div>
                                <div style="margin-top: 10px; color: #FF4B4B; font-weight: bold;">
                                    🔥 LIVE
                                </div>
                            </div>
                        """, unsafe_allow_html=True)
                    else:
                        st.caption("대기 중")           

    # --- TAB 2: STANDINGS ---
    with tab_standings:
        st.subheader("실시간 조별 순위")
        groups = db.get_groups()
        teams = db.get_teams()
        
        # Calculate stats roughly (or use logic.calculate_standings if efficient)
        team_stats = logic.calculate_standings(db)
        
        # Display Grid
        g_cols = st.columns(4)
        for i, group in enumerate(groups):
            with g_cols[i%4]:
                st.markdown(f"**{group['name']}**")
                data = []
                for tid in group['team_ids']:
                    s = team_stats[tid].copy()
                    
                    # Helper to format name for standings
                    t_obj = next((t for t in teams if t['id'] == tid), None)
                    if t_obj:
                         s['name'] = get_smart_name(t_obj).replace('\n', ' ') # Flatten for table
                         
                    data.append(s)
                
                df = pd.DataFrame(data)
                if not df.empty:
                    # Sort by Pts desc, then Games desc
                    df = df.sort_values(by=['Pts', 'Games'], ascending=[False, False])
                    
                    # Translate columns
                    df = df.rename(columns={'name': '팀이름', 'W': '승', 'L': '패', 'D': '무', 'Pts': '승점', 'Games': '득실'})
                    
                    st.dataframe(df[['팀이름', '승', '무', '패', '승점', '득실']], hide_index=True, use_container_width=True)
                else:
                    st.caption("팀 정보 없음")

    # --- TAB 3: BRACKET ---
    with tab_bracket:
        st.subheader("토너먼트 대진표")
        bracket.render(db)
