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
                            tb_label = " (TIE BREAK)"
                            
                        st.caption(f"{match['group_id']}조 {match['round']}경기{tb_label}")
                        
                        # Score Display using Metric or similar
                        # st.metric is good but takes up space.
                        # Let's use simple markdown for compactness inside container
                        
                        col_score = st.columns([1, 0.2, 1])
                        with col_score[0]:
                            st.write(f"{nA}")
                        with col_score[1]:
                            st.write("vs")
                        with col_score[2]:
                            st.write(f"{nB}")
                            
                        st.subheader(f"{match['score_a']} : {match['score_b']}")
                        
                        # Points
                        pts_map = ['0', '15', '30', '40', 'AD']
                        if match.get('is_tie_break'):
                            pa, pb = match['point_a'], match['point_b']
                        else:
                            pa = pts_map[match['point_a']]
                            pb = pts_map[match['point_b']]
                            
                        st.caption(f"Points: {pa} - {pb}")
                        
                        if match['status'] == 'LIVE':
                             st.write("🔥 진행 중")
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
