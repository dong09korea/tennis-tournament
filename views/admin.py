import streamlit as st
import pandas as pd
from utils import logic
from views import bracket
from utils import auth
import datetime

def render(db):
    # Secrets에서 비밀번호 로드 (없으면 기본값 경고)
    admin_pw = st.secrets.get("admin_password")
    if not admin_pw:
        st.error("Admin Password not set in secrets.toml!")
        return

    if not auth.check_password('admin', str(admin_pw)):
        return
    if st.button("홈으로", use_container_width=True):
        st.query_params.clear()
        st.rerun()

    st.title("운영진 대시보드")
    
    # Check if tournament started
    teams = db.get_teams()
    
    # Helper for names
    def get_smart_name(t):
        name = t['name']
        p1 = t.get('player1', '')
        p2 = t.get('player2', '')
        if p1 or p2:
            if f"{p1}, {p2}" not in name:
                 return f"{name}\n({p1}, {p2})"
        return name
    
    if not teams:
        st.header("대회 설정")
        
        # --- Environment Config Section (Initial) ---
        # --- Environment Config Section (Initial) ---
        st.markdown("### 🛠️ 대회 환경 설정")
        with st.form("init_config_form"):
            st.info("참가 팀 수나 조 개수를 먼저 설정하고 싶으면 여기서 변경하세요.")
            c1, c2, c3 = st.columns(3)
            with c1:
                new_n_teams = st.number_input("참가 팀 수", min_value=4, max_value=128, value=db.config.get("num_teams", 32))
            with c2:
                new_n_groups = st.number_input("조 개수", min_value=2, max_value=32, value=db.config.get("num_groups", 8))
            with c3:
                new_n_courts = st.number_input("코트 수", min_value=1, max_value=20, value=db.config.get("num_courts", 6))
            
            # Start Time
            def parse_time(t_str):
                try:
                    return datetime.datetime.strptime(t_str, "%H:%M").time()
                except:
                    return datetime.time(9, 0)
            
            current_start_time = parse_time(db.config.get("start_time", "09:00"))
            new_start_time = st.time_input("대회 시작 시간", value=current_start_time)
            
            # Notice/Schedule Editor
            default_notice = """**진행 순서:**
1. **예선 조별 리그** (각 조 풀리그, 5:5 무승부)
2. **본선 토너먼트** (각 조 상위 팀 진출, 16강 ~ 결승)
3. **시상식 (우승, 준우승, 3위)**"""
            new_notice = st.text_area("대회 공지사항/일정 (메인 화면 표시)", value=db.config.get("notice", default_notice), height=150)
                
            if st.form_submit_button("설정 적용 (새로고침)"):
                db.config["num_teams"] = new_n_teams
                db.config["num_groups"] = new_n_groups
                db.config["num_courts"] = new_n_courts
                db.config["start_time"] = new_start_time.strftime("%H:%M")
                db.config["notice"] = new_notice
                
                # Re-init courts if needed
                db.courts = [{"id": i+1, "match_id": None} for i in range(new_n_courts)]
                
                db.save_to_disk()
                st.success("설정이 적용되었습니다!")
                st.rerun()
        
        tab_manual, tab_excel = st.tabs(["직접 입력", "엑셀 업로드"])
        
        with tab_manual:
            with st.form("setup_form"):
                n_teams = db.config.get("num_teams", 32)
                st.write(f"{n_teams}개 팀 이름을 입력하세요 (기본값 제공)")
                
                # Dynamic Columns based on team count
                # Create adequate rows
                cols_per_row = 4
                rows = (n_teams + cols_per_row - 1) // cols_per_row
                
                team_names = []
                for r in range(rows):
                    cols = st.columns(cols_per_row)
                    for c in range(cols_per_row):
                        idx = r * cols_per_row + c
                        if idx < n_teams:
                            with cols[c]:
                                val = st.text_input(f"팀 {idx+1}", value=f"팀 {idx+1}")
                                team_names.append(val)
                
                submitted = st.form_submit_button("대진표 생성 및 시작 (수동)")
                if submitted:
                    db.set_teams(team_names)
                    teams_objs = db.get_teams()
                    groups = logic.generate_groups(teams_objs, n_groups=db.config.get("num_groups", 8))
                    db.set_groups(groups)
                    matches = logic.generate_schedule(groups)
                    db.set_matches(matches)
                    logic.assign_matches_to_courts(db)
                    st.rerun()

        with tab_excel:
            n_teams = db.config.get("num_teams", 32)
            st.info(f"엑셀 파일(.xlsx)을 업로드하세요. (형식: Team Name, Player 1, Player 2, Group(선택)) - 총 {n_teams}팀")
            st.write("헤더 이름은 'Team', 'Player1', 'Player2', 'Group' 으로 맞춰주세요.")
            
            # Template Download
            import io
            buffer = io.BytesIO()
            # Dynamic template size
            template_data = []
            for i in range(n_teams):
                template_data.append({
                    "Team": f"Team {i+1}", 
                    "Player1": "", 
                    "Player2": "", 
                    "Group": (i // (n_teams // db.config.get("num_groups", 8))) + 1 # Rough suggestion
                })
            
            df_template = pd.DataFrame(template_data)
            
            # Save to buffer
            with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
                df_template.to_excel(writer, index=False, sheet_name='참가신청서')
                
            st.download_button(
                label="📥 참가신청서 양식 다운로드 (Excel)",
                data=buffer.getvalue(),
                file_name="tournament_entry_template.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            
            st.divider()
            
            uploaded_file = st.file_uploader("엑셀 파일 선택", type=['xlsx'])
            if uploaded_file:
                try:
                    df = pd.read_excel(uploaded_file)
                    # Helper to find cols case-insensitively
                    cols = {c.lower(): c for c in df.columns}
                    
                    # Target Cols
                    c_team = cols.get('team') or cols.get('team name') or cols.get('팀명') or cols.get('팀이름')
                    c_p1 = cols.get('player1') or cols.get('선수1')
                    c_p2 = cols.get('player2') or cols.get('선수2')
                    c_grp = cols.get('group') or cols.get('조') or cols.get('draw')
                    
                    if not c_team:
                        st.error("오류: 'Team' 또는 '팀명' 컬럼을 찾을 수 없습니다.")
                    else:
                        st.success(f"{len(df)}개의 팀을 발견했습니다. (요구: {n_teams}팀)")
                        st.dataframe(df.head())
                        
                        if st.button("업로드 된 데이터로 대회 시작"):
                            # Prepare Data
                            teams_data = []
                            pre_defined_groups = {}
                            
                            for idx, row in df.iterrows():
                                if idx >= n_teams: break # Limit
                                
                                p1 = str(row[c_p1]) if c_p1 and pd.notna(row[c_p1]) else ""
                                p2 = str(row[c_p2]) if c_p2 and pd.notna(row[c_p2]) else ""
                                
                                # User Request: Team Name = "Player1, Player2"
                                if p1 and p2:
                                    t_name = f"{p1}, {p2}"
                                elif p1:
                                    t_name = p1
                                else:
                                    # Fallback to Team column or default
                                    t_name = str(row[c_team]) if c_team and pd.notna(row[c_team]) else f"Team {idx+1}"

                                t_data = {
                                    "name": t_name,
                                    "player1": p1,
                                    "player2": p2,
                                    "group": row[c_grp] if c_grp and pd.notna(row[c_grp]) else None
                                }
                                teams_data.append(t_data)
                                
                            # Fill rest if < n_teams
                            if len(teams_data) < n_teams:
                                st.warning(f"주의: {n_teams}팀보다 적습니다. 나머지는 더미로 채웁니다.")
                                for i in range(len(teams_data), n_teams):
                                    teams_data.append({"name": f"Team {i+1}", "player1": "", "player2": ""})

                                    
                            db.set_teams(teams_data)
                            teams_objs = db.get_teams()
                            
                            # Group Generation Logic
                            # If 'group' is in data, use it. 
                            # logic.generate_groups usually chunks list.
                            # We might need custom group assignment logic or sort teams by group first.
                            
                            has_groups = any(t.get('pre_group') for t in teams_objs)
                            
                            # Just call generate_groups. Logic handles both specific (if pre_group exists) and automatic assignment.
                            if not has_groups:
                                import random
                                random.shuffle(teams_objs)
                                db.teams = teams_objs
                                
                            groups = logic.generate_groups(teams_objs)
                            db.set_groups(groups)
                            matches = logic.generate_schedule(groups)
                            db.set_matches(matches)
                            logic.assign_matches_to_courts(db)
                            st.success("대회가 설정되었습니다!")
                            st.rerun()

                except Exception as e:
                    st.error(f"엑셀 처리 중 오류: {e}")
        return

    # Tournament Live View
    st.subheader(f"운영진 대시보드")
    
    # Check for active draw to highlight
    draw_active = db.knockout_draw.get('is_active', False)
    
    # --- PRIORITY VIEW (Match Control) ---
    st.divider()
    hot_matches = logic.get_closing_matches(db)
    pending_matches = logic.get_pending_matches(db, limit=5)
    
    if hot_matches or pending_matches:
        st.subheader("🔥 경기 종료 임박 & 대기 현황 (Admin View)")
        p_col1, p_col2 = st.columns([1.2, 1])
        
        with p_col1:
            st.markdown("##### 🚨 곧 끝나는 코트 (다음 경기 준비)")
            if hot_matches:
                for m in hot_matches:
                    court_info = "미정"
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
                             tA = next(t for t in teams if t['id'] == m['team_a_id'])['name']
                             tB = next(t for t in teams if t['id'] == m['team_b_id'])['name']
                             st.write(f"**{tA}** vs **{tB}**")
                         with h_cols[2]:
                             st.write(f"**{m['score_a']} : {m['score_b']}**")
                             if m.get('is_tie_break'): st.caption("TIE")
            else:
                st.info("종료 임박 경기 없음")

        with p_col2:
            st.markdown("##### ⏳ 대기열 관리 (Top 5)")
            if pending_matches:
                p_list = []
                for m in pending_matches:
                    tA = next(t for t in teams if t['id'] == m['team_a_id'])['name']
                    tB = next(t for t in teams if t['id'] == m['team_b_id'])['name']
                    
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
    tab_courts, tab_standings, tab_bracket, tab_draw, tab_settings = st.tabs(["🏟️ 실시간 코트", "🏆 조별 순위", "🧬 대진표", "🎉 본선 조추첨", "⚙️ 설정"])
    
    # --- TAB 1: LIVE COURTS ---
    with tab_courts:
        col_actions = st.columns([4, 1])
        with col_actions[1]:
            if st.button("새로고침 (코트)", key="refresh_courts", use_container_width=True):
                st.rerun()

        st.subheader("실시간 코트 현황")
        courts = db.get_courts()
        matches = db.get_matches()
        
        # DEBUG: Check Version
        # st.write(f"DEBUG: Active Courts = {len(courts)}")
        
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
                                <div style="font-size: 0.9em; color: gray; margin-bottom: 5px;">
                                    {match['group_id']}조 {match['round']}경기{tb_label}
                                </div>
                                <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="font-size: 1.2em; font-weight: bold; width: 45%; text-align: right; color: #000000;">{nA}</div>
                                    <div style="font-size: 0.9em; color: #444;">vs</div>
                                    <div style="font-size: 1.2em; font-weight: bold; width: 45%; text-align: left; color: #000000;">{nB}</div>
                                </div>
                                <div style="font-size: 2.2em; font-weight: bold; color: #006400; margin-bottom: 5px;">
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
                                <div style="font-size: 1.0em; color: #333;">
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
        col_actions2 = st.columns([4, 1])
        with col_actions2[1]:
            if st.button("새로고침 (순위)", key="refresh_standings", use_container_width=True):
                st.rerun()

        st.subheader("조별 순위")
        groups = db.get_groups()
        matches = db.get_matches() # Reload matches
        
        # Calculate stats
        team_stats = logic.calculate_standings(db)
        
        # Display Grid
        g_cols = st.columns(4)
        for i, group in enumerate(groups):
            with g_cols[i%4]:
                st.markdown(f"**{group['name']}**")
                data = []
                for tid in group['team_ids']:
                    s = team_stats[tid].copy()
                    # Helper to format name
                    def fmt_name(t):
                        base = t['name']
                        p1 = t.get('player1', '')
                        p2 = t.get('player2', '')
                        if p1 or p2:
                            if base == f"{p1}, {p2}" or (p1 and not p2 and base == p1): return base
                            if f"({p1}, {p2})" in base: return base
                            return f"{base} ({p1}, {p2})"
                        return base
                
                    t_obj = next((t for t in teams if t['id'] == tid), None)
                    if t_obj:
                        s['name'] = fmt_name(t_obj)
                    data.append(s)
                
                df = pd.DataFrame(data)
                if not df.empty:
                    df = df.sort_values(by=['Pts', 'Games'], ascending=[False, False])
                    df = df.rename(columns={'name': '팀이름', 'W': '승', 'L': '패', 'D': '무', 'Pts': '승점', 'Games': '득실'})
                    st.dataframe(df[['팀이름', '승', '무', '패', '승점', '득실']], hide_index=True, use_container_width=True)
                else:
                    st.info("팀 데이타가 없습니다.")
        
        # List view
        st.divider()
        with st.expander("전체 경기 리스트"):
            st.subheader("전체 경기 일정")
            schedule_data = []
            for m in matches:
                tA = next(t for t in teams if t['id'] == m['team_a_id'])['name']
                tB = next(t for t in teams if t['id'] == m['team_b_id'])['name']
                status_map = {'PENDING': '대기', 'LIVE': '진행 중', 'COMPLETED': '종료'}
                schedule_data.append({
                    "상태": status_map[m['status']],
                    "경기": f"{m['group_id']}조 {m['round']}경기",
                    "대진": f"{tA} vs {tB}",
                    "점수": f"{m['score_a']} : {m['score_b']}"
                })
            st.dataframe(pd.DataFrame(schedule_data), hide_index=True, use_container_width=True)

    # --- TAB 3: BRACKET ---
    with tab_bracket:
        st.subheader("토너먼트 대진표")
        bracket.render(db)
    
    # --- TAB 2: DRAW ---
    with tab_draw:
        import random
        # Logic from draw.py
        state = db.knockout_draw
        current_round = state.get('current_round_name', '16강')
        st.header(f"🏆 {current_round} 조추첨")
        
        # Check if draw is active
        if not state['is_active']:
            history = state.get('round_history', [])
            if not history:
                # Check directly if matches are done
                if logic.check_preliminaries_complete(db):
                    st.info("예선 경기가 모두 종료되었습니다. 조추첨을 시작할 수 있습니다.")
                    if st.button("예선 결과 집계 및 조추첨 시작", type="primary"):
                        try:
                            logic.init_knockout_draw(db)
                            st.success("조추첨 준비 완료!")
                            st.rerun()
                        except Exception as e:
                            st.error(f"오류: {e}")
                else:
                    st.warning("⚠️ 아직 진행 중인 예선 경기가 있습니다. 모든 경기가 종료되어야 조추첨이 가능합니다.")
                    st.write("대회 현황 탭에서 남은 경기를 확인하세요.")
            else:
                last_round = history[-1]['name']
                if logic.check_round_complete(db, last_round):
                     st.success(f"{last_round} 경기가 모두 종료되었습니다.")
                     if st.button(f"다음 라운드 조추첨 시작", type="primary"):
                         logic.init_next_round_draw(db)
                         st.rerun()
                else:
                    st.warning(f"현재 {last_round} 경기가 진행 중입니다. 모든 경기가 종료되어야 다음 조추첨이 가능합니다.")
        else:
            # Draw Interface
            col_draw, col_result = st.columns([2, 1])
            with col_draw:
                st.subheader("추첨 진행")
                if state['current_drawer_idx'] >= len(state['pot_2']):
                    st.success("🎯 모든 조추첨이 완료되었습니다!")
                    st.markdown("---")
                    if st.button(f"🚀 {current_round} 토너먼트 시작하기", type="primary", use_container_width=True):
                        logic.start_knockout_round(db)
                        st.success(f"{current_round} 경기가 코트에 배정되었습니다!")
                        st.rerun()
                else:
                    current_drawer = state['pot_2'][state['current_drawer_idx']]
                    c_name = current_drawer['name']
                    p1 = current_drawer.get('player1', '')
                    p2 = current_drawer.get('player2', '')
                    if p1 or p2:
                         if f"{p1}, {p2}" not in c_name: c_name += f" ({p1}, {p2})"
                    
                    origin_label = current_drawer.get('group', '이전 라운드 승자')
                    st.info(f"👉 **{origin_label}** 에서 올라온 **'{c_name}'**의 추첨 차례입니다.")
                    st.write("아래 '물음표 카드' 중 하나를 선택하면 상대팀이 결정됩니다.")
                    
                    grid_cols = st.columns(4)
                    for i, target in enumerate(state['pot_1']):
                        with grid_cols[i % 4]:
                            if st.button(f"❓ 카드 {i+1}", key=f"card_{i}", use_container_width=True):
                                match_info = logic.perform_draw(db, i)
                                st.toast(f"추첨 결과: {match_info['home']['name']} vs {match_info['away']['name']}")
                                st.rerun()
            with col_result:
                st.subheader("대진표")
                if not state['matches']: st.info("아직 추첨된 대진이 없습니다.")
                for m in state['matches']:
                    t1 = m['home']
                    t2 = m['away']
                    st.warning(f"**{t1['name']}** vs **{t2['name']}**")
                    st.divider()

    # --- TAB 3: SETTINGS ---
    with tab_settings:
        st.subheader("⚙️ 설정 및 관리")
        
        # 1. Tournament Settings (Dynamic Config)
        with st.expander("대회 환경 설정 (팀/조/코트 수)", expanded=True):
            with st.form("config_form"):
                st.warning("⚠️ 설정을 변경하면 대회를 초기화하는 것을 권장합니다.")
                c_conf1, c_conf2, c_conf3 = st.columns(3)
                with c_conf1:
                    new_n_teams = st.number_input("참가 팀 수", min_value=4, max_value=128, value=db.config.get("num_teams", 32))
                with c_conf2:
                    new_n_groups = st.number_input("조 개수", min_value=2, max_value=32, value=db.config.get("num_groups", 8))
                with c_conf3:
                    new_n_courts = st.number_input("코트 수", min_value=1, max_value=20, value=db.config.get("num_courts", 6))
                
                if st.form_submit_button("설정 저장"):
                    db.config["num_teams"] = new_n_teams
                    db.config["num_groups"] = new_n_groups
                    db.config["num_courts"] = new_n_courts
                    
                    # Re-init courts if count changed
                    if len(db.courts) != new_n_courts:
                        db.courts = [{"id": i+1, "match_id": None} for i in range(new_n_courts)]
                    
                    db.save_to_disk()
                    st.success("설정이 저장되었습니다. UI에 반영하기 위해 새로고침합니다.")
                    st.rerun()
        
        # Export
        with st.expander("데이터 내보내기", expanded=False):
             if st.button("경기 결과 및 순위 엑셀(CSV) 저장"):
                 # (Use existing export logic helper needed? Just inline copy for now as it was local vars)
                 teams_export = db.get_teams()
                 stats = logic.calculate_standings(db)
                 export_data = []
                 for t in teams_export:
                     s = stats[t['id']]
                     export_data.append({
                         "ID": s['id'],
                         "팀이름": s['name'],
                         "승": s['W'], "무": s['D'], "패": s['L'], "승점": s['Pts'], "득실": s['Games']
                     })
                 df_standings = pd.DataFrame(export_data)
                 matches_export = db.get_matches()
                 match_data = []
                 for m in matches_export:
                      tA = next(t for t in teams_export if t['id'] == m['team_a_id'])
                      tB = next(t for t in teams_export if t['id'] == m['team_b_id'])
                      match_data.append({
                          "ID": m['id'], "구분": m['group_id'], "라운드": m['round'],
                          "홈팀": tA['name'], "원정팀": tB['name'], "스코어": f"{m['score_a']} : {m['score_b']}",
                          "승자": m['winner_id'] or "-", "상태": m['status']
                      })
                 df_matches = pd.DataFrame(match_data)
                 csv_standings = df_standings.to_csv(index=False).encode('utf-8-sig')
                 csv_matches = df_matches.to_csv(index=False).encode('utf-8-sig')
                 c1, c2 = st.columns(2)
                 c1.download_button("순위표 다운로드 (CSV)", csv_standings, "standings.csv", "text/csv")
                 c2.download_button("경기기록 다운로드 (CSV)", csv_matches, "matches.csv", "text/csv")
        
        # QR Code Generator
        with st.expander("🔗 QR 코드 생성 (모바일 접속용)", expanded=True):
            st.info("관람객 및 선수가 스마트폰으로 접속할 수 있는 통합 QR 코드를 생성합니다.")
            
            # Try to guess IP or let user input. 
            default_url = "https://irmgard-unshowering-casen.ngrok-free.dev" 
            base_url = st.text_input("현재 대회 서버 주소 (터미널의 Network URL을 입력하세요)", value=default_url, key="qr_url_force_new")
            
            if base_url:
                # One QR for Home
                qr_api = f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={base_url}"
                
                c_qr, c_desc = st.columns([1, 2])
                with c_qr:
                     st.image(qr_api, caption="대회 모바일 홈 접속 QR")
                with c_desc:
                     st.markdown("### 📱 모바일 접속 안내")
                     st.write("이 QR 코드를 촬영하면 **'대회 모바일 홈'**으로 접속됩니다.")
                     st.write("사용자는 홈 화면에서 **[관람용 대시보드]** 또는 **[선수 정보 조회]**를 선택할 수 있습니다.")
                     st.code(base_url)
            else:
                st.warning("서버 주소를 입력해야 QR 코드가 생성됩니다.")
        
        # Dev Tools
        with st.expander("개발자/테스트 도구"):
            if st.button("예선 전경기 랜덤 결과 생성 (바로 종료)", use_container_width=True):
                # (Same logic as before)
                import random
                for m in db.get_matches():
                    if m['status'] != 'COMPLETED':
                        m['score_a'] = random.randint(0, 6)
                        m['score_b'] = random.randint(0, 6)
                        if m['score_a'] == m['score_b']:
                             if m['score_a'] != 5: m['score_a'] = 6
                        
                        if m['score_a'] == 5 and m['score_b'] == 5:
                            m['is_draw'] = True; m['winner_id'] = None
                        elif m['score_a'] > m['score_b']:
                            m['winner_id'] = m['team_a_id']; m['score_a'] = 6
                        else:
                            m['winner_id'] = m['team_b_id']; m['score_b'] = 6
                        m['status'] = 'COMPLETED'; m['court_id'] = None
                for c in db.get_courts(): c['match_id'] = None
                st.success("완료")
                st.rerun()

        # Reset
        st.divider()
        st.warning("경고: 대회 초기화")
        if st.button("🧨 대회 완전 초기화 (Reset Tournament)", type="primary"):
             db.teams = []
             db.groups = []
             db.matches = []
             db.knockout_draw = {'is_active': False, 'pot_1': [], 'pot_2': [], 'matches': [], 'current_drawer_idx': 0, 'round_history': [], 'current_round_name': '16강'}
             for c in db.courts: c['match_id'] = None
             st.success("초기화되었습니다.")
             st.rerun()
