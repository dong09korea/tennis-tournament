import streamlit as st
import time
from utils import logic, auth

def render(db, court_id):
    # Password Check
    # court_id is distinct int or str? Usually int from loop in app.py
    # Expected PW: 5132 + court_id
    if not auth.check_password(f"court_{court_id}", f"5132{court_id}"):
        return
        
    # Auto-refresh mechanism
    if 'last_refresh' not in st.session_state:
        st.session_state.last_refresh = time.time()
        
    # Check for updates every 2 seconds
    # In Streamlit, we can't do true background poll easily without rerun.
    # We will rely on manual interaction OR use st.empty with loop (blocking).
    # Better: Just let user click buttons. If match changes, they see it.
    # To see "New Match assigned" automatically, we need auto-refresh.
    
    # Simple auto-refresh using fragment or timer if available?
    # Streamlit 1.30+ has st.rerun().
    # We'll use a manual refresh button for safety + auto-check on interaction.

    courts = db.get_courts()
    court = next((c for c in courts if c['id'] == court_id), None)
    
    if not court:
        st.error("존재하지 않는 코트입니다.")
        return

    st.markdown(f"<h1 style='text-align: center;'>{court_id}번 코트</h1>", unsafe_allow_html=True)
    
    # CSS to fix button text color (White on Neon Yellow is bad)
    st.markdown("""
    <style>
    div[data-testid="stButton"] > button[kind="primary"] {
        color: black !important;
        font-weight: bold !important;
    }
    </style>
    """, unsafe_allow_html=True)
    
    match_id = court['match_id']
    if not match_id:
        st.info("배정된 경기가 없습니다. 대기 중...")
        if st.button("새로고침"):
            st.rerun()
        return

    matches = db.get_matches()
    match = next((m for m in matches if m['id'] == match_id), None)
    teams = db.get_teams()
    
    tA = next(t for t in teams if t['id'] == match['team_a_id'])
    tB = next(t for t in teams if t['id'] == match['team_b_id'])
    
    # Fix Group Label: Handle string/int mixture from logic/Excel
    gid = match['group_id']
    if str(gid).isdigit():
        group_label = f"{gid}조"
    else:
        group_label = str(gid)
        
    st.markdown(f"<h3 style='text-align: center;'>{group_label} {match['round']}경기</h3>", unsafe_allow_html=True)

    # Scoreboard Layout
    colA, colMid, colB = st.columns([1, 0.1, 1])
    
    points_map = ['0', '15', '30', '40', 'AD']
    
    # Helper for court view display
    def get_court_display_name(t):
        name = t['name']
        p1 = t.get('player1', '')
        p2 = t.get('player2', '')
        
        # If name is auto-generated (matches p1, p2), just show name large
        if name == f"{p1}, {p2}":
            return name
        if p1 and not p2 and name == p1:
            return name
            
        # Else show Name + Subtext
        if p1 or p2:
            return f"{name}<br><span style='font-size:0.5em; color:gray'>({p1}, {p2})</span>"
        return name

    # Determine display points
    is_tie_break = match.get('is_tie_break', False)
    
    if is_tie_break:
        disp_p_a = str(match['point_a'])
        disp_p_b = str(match['point_b'])
        tb_label = "<div style='background: #FF5722; color: white; border-radius: 5px; padding: 2px 10px; display: inline-block; font-weight: bold; margin-bottom: 5px;'>TIE BREAK</div>"
    else:
        disp_p_a = points_map[match['point_a']]
        disp_p_b = points_map[match['point_b']]
        tb_label = ""

    with colA:
        nA = get_court_display_name(tA)
        st.markdown(f"<div style='background-color: #f0f2f6; padding: 20px; border-radius: 10px; text-align: center;'><h2 style='color: black; margin: 0;'>{nA}</h2></div>", unsafe_allow_html=True)
        st.markdown(f"<h1 style='text-align: center; font-size: 80px; color: #ff4b4b;'>{disp_p_a}</h1>", unsafe_allow_html=True)
        if is_tie_break: st.markdown(f"<div style='text-align:center'>{tb_label}</div>", unsafe_allow_html=True)
        st.markdown(f"<h3 style='text-align: center;'>세트 스코어: {match['score_a']}</h3>", unsafe_allow_html=True)
        
        warn_end_a = logic.is_match_ending_point(match, 'A')
        
        if st.button("득점 (A)", key=f"score_a_{match_id}", use_container_width=True, type="primary"):
            if warn_end_a:
                st.session_state[f"confirm_end_{match_id}_A"] = True
                st.rerun()
            else:
                logic.process_score(db, match_id, 'A')
                st.rerun()
        
        if st.session_state.get(f"confirm_end_{match_id}_A", False):
            st.warning("⚠️ 이 점수면 경기가 종료됩니다! 정말입니까?")
            c1, c2 = st.columns(2)
            with c1:
                # Force string key
                if st.button("네, 경기 종료", key=f"conf_yes_A_{str(match_id)}", type="primary"):
                    st.error("Processing Match End...") # Visible Debug
                    logic.process_score(db, match_id, 'A')
                    del st.session_state[f"confirm_end_{match_id}_A"]
                    st.rerun()
            with c2:
                if st.button("아니오 (취소)", key=f"conf_no_A_{match_id}"):
                    del st.session_state[f"confirm_end_{match_id}_A"]
                    st.rerun()
                    
        # ... undo ...
        if st.button("취소 (A)", key=f"undo_a_{match_id}", use_container_width=True):
             logic.undo_score(db, match_id, 'A')
             st.rerun()

    with colB:
        nB = get_court_display_name(tB)
        st.markdown(f"<div style='background-color: #f0f2f6; padding: 20px; border-radius: 10px; text-align: center;'><h2 style='color: black; margin: 0;'>{nB}</h2></div>", unsafe_allow_html=True)
        st.markdown(f"<h1 style='text-align: center; font-size: 80px; color: #0083b8;'>{disp_p_b}</h1>", unsafe_allow_html=True)
        if is_tie_break: st.markdown(f"<div style='text-align:center'>{tb_label}</div>", unsafe_allow_html=True)
        st.markdown(f"<h3 style='text-align: center;'>세트 스코어: {match['score_b']}</h3>", unsafe_allow_html=True)
        
        warn_end_b = logic.is_match_ending_point(match, 'B')

        if st.button("득점 (B)", key=f"score_b_{match_id}", use_container_width=True, type="primary"):
            if warn_end_b:
                st.session_state[f"confirm_end_{match_id}_B"] = True
                st.rerun()
            else:
                logic.process_score(db, match_id, 'B')
                st.rerun()

        if st.session_state.get(f"confirm_end_{match_id}_B", False):
            st.warning("⚠️ 이 점수면 경기가 종료됩니다! 정말입니까?")
            c1, c2 = st.columns(2)
            with c1:
                # Force string key
                if st.button("네, 경기 종료", key=f"conf_yes_B_{str(match_id)}", type="primary"):
                    st.error("Processing Match End...") # Visible Debug
                    logic.process_score(db, match_id, 'B')
                    del st.session_state[f"confirm_end_{match_id}_B"]
                    st.rerun()
            with c2:
                if st.button("아니오 (취소)", key="conf_no_B"):
                    del st.session_state[f"confirm_end_{match_id}_B"]
                    st.rerun()

        if st.button("취소 (B)", key="undo_b", use_container_width=True):
            logic.undo_score(db, match_id, 'B')
            st.rerun()
            
    st.divider()
    if st.button("코트 화면 새로고침"):
        st.rerun()
