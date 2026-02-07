import streamlit as st
import pandas as pd

def render(db):
    if st.button("홈으로", use_container_width=True):
        st.query_params.clear()
        st.rerun()

    st.title("🛡️ 선수 정보 조회")
    
    st.markdown("본인의 **팀 이름** 또는 **선수 이름**을 입력하면 현재 경기 상태나 다음 경기 정보를 알려드립니다.")
    
    # Simple search
    query = st.text_input("검색어 입력 (팀명 또는 선수명)", "").strip()
    
    if query:
        teams = db.get_teams()
        # Find partial matches in Name, Player1, Player2
        matched = []
        for t in teams:
            in_name = query in t['name']
            in_p1 = query in t.get('player1', '')
            in_p2 = query in t.get('player2', '')
            if in_name or in_p1 or in_p2:
                matched.append(t)
        
        if not matched:
            st.error(f"'{query}'에 해당하는 팀을 찾을 수 없습니다.")
            return
            
        st.success(f"{len(matched)}개의 팀을 찾았습니다.")
        
        matches = db.get_matches()
        courts = db.get_courts()
        
        for team in matched:
            with st.container(border=True):
                # Smart Name Display
                d_name = team['name']
                p1 = team.get('player1', '')
                p2 = team.get('player2', '')
                if (p1 or p2) and f"{p1}, {p2}" not in d_name:
                    d_name += f" ({p1}, {p2})"
                
                st.subheader(f"🎾 {d_name}")
                
                from utils import logic
                
                # Tabs for organization
                tab_status, tab_group, tab_history = st.tabs(["현재 상태", "소속 조 정보", "경기 기록"])
                
                with tab_status:
                    # Check status
                    # 1. Is playing now?
                    current_match = next((m for m in matches if (m['team_a_id'] == team['id'] or m['team_b_id'] == team['id']) and m['status'] == 'LIVE'), None)
                    
                    if current_match:
                        # Playing
                        court_num = current_match['court_id']
                        opp_id = current_match['team_b_id'] if current_match['team_a_id'] == team['id'] else current_match['team_a_id']
                        opp = next((t for t in teams if t['id'] == opp_id), None)
                        st.warning(f"🔥 **현재 {court_num}번 코트**에서 경기 진행 중입니다!")
                        st.write(f"상대: **{opp['name']}**")
                        st.metric("점수", f"{current_match['score_a']} : {current_match['score_b']}")
                    else:
                        # 2. Is pending?
                        pending_match = next((m for m in matches if (m['team_a_id'] == team['id'] or m['team_b_id'] == team['id']) and m['status'] == 'PENDING'), None)
                        if pending_match:
                            opp_id = pending_match['team_b_id'] if pending_match['team_a_id'] == team['id'] else pending_match['team_a_id']
                            opp = next((t for t in teams if t['id'] == opp_id), None)
                            st.info(f"⏳ **대기 중**입니다.")
                            # Check queue
                            pendings = [m for m in matches if m['status'] == 'PENDING']
                            try:
                                idx = pendings.index(pending_match)
                                st.write(f"대기 순번: {idx+1}번째")
                            except:
                                pass
                            if opp:
                                st.write(f"다음 상대: **{opp['name']}** ({pending_match['group_id']})")
                        else:
                            st.write("✅ 예정된/진행 중인 경기가 없습니다.")

                with tab_group:
                    # Find Group
                    groups = db.get_groups()
                    my_group = next((g for g in groups if team['id'] in g['team_ids']), None)
                    
                    if my_group:
                        st.subheader(f"{my_group['name']} 순위")
                        
                        # Calculate standings
                        all_stats = logic.calculate_standings(db)
                        
                        # Filter for my group
                        group_stats = []
                        for tid in my_group['team_ids']:
                            s = all_stats[tid].copy()
                            t_obj = next((t for t in teams if t['id'] == tid), None)
                            
                            # Smart Name
                            nm = t_obj['name']
                            p1 = t_obj.get('player1', '')
                            p2 = t_obj.get('player2', '')
                            if (p1 or p2) and f"{p1}, {p2}" not in nm:
                                nm += f" ({p1}, {p2})"
                            s['name'] = nm
                            group_stats.append(s)
                            
                        df = pd.DataFrame(group_stats)
                        df = df.sort_values(by=['Pts', 'Games'], ascending=[False, False])
                        df = df.rename(columns={'name': '팀이름', 'W': '승', 'L': '패', 'D': '무', 'Pts': '승점', 'Games': '득실'})
                        st.dataframe(df[['팀이름', '승', '무', '패', '승점', '득실']], hide_index=True)
                        
                    else:
                        st.write("소속된 조가 없습니다.")

                with tab_history:
                    st.write("예선 경기 기록:")
                    # My matches
                    my_matches = [m for m in matches if (m['team_a_id'] == team['id'] or m['team_b_id'] == team['id']) and isinstance(m['group_id'], int)]
                    
                    if not my_matches:
                         st.write("기록된 경기가 없습니다.")
                    else:
                         for m in my_matches:
                             is_home = (m['team_a_id'] == team['id'])
                             opp_id = m['team_b_id'] if is_home else m['team_a_id']
                             opp = next((t for t in teams if t['id'] == opp_id), None)
                             
                             res = "대기"
                             score = "-"
                             if m['status'] == 'LIVE':
                                 res = "진행 중"
                                 score = f"{m['score_a']} : {m['score_b']}"
                             elif m['status'] == 'COMPLETED':
                                 if m['is_draw']: res = "무승부"
                                 elif m['winner_id'] == team['id']: res = "승리"
                                 else: res = "패배"
                                 score = f"{m['score_a']} : {m['score_b']}"
                                 
                             st.markdown(f"**vs {opp['name']}** - {res} ({score})")
                             if m['status'] == 'COMPLETED':
                                 st.caption(f"Points: {m['point_a']}-{m['point_b']}")
                             st.divider()
