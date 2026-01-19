import streamlit as st
from utils.db import get_db
from views import admin, court, draw, player, dashboard

st.set_page_config(page_title="테니스 대회 관리", layout="wide")

# Initialize DB
db = get_db()

# Query params for routing
# ?view=court&id=1
params = st.query_params
view_mode = params.get("view", "home")
court_id = params.get("id", None)

if view_mode == "court" and court_id:
    court.render(db, int(court_id))
elif view_mode == "admin":
    admin.render(db)
elif view_mode == "dashboard":
    dashboard.render(db)
elif view_mode == "draw":
    draw.render(db)
elif view_mode == "player":
    player.render(db)
else:
    # Landing Page
    st.title("🎾 라켓업 테니스대회")
    st.caption("원하시는 서비스를 선택하세요")
    
    st.markdown("---")
    
    # Public Section (Mobile First)
    if st.button("📊 관람용 대시보드 (실시간 현황)", use_container_width=True):
        st.query_params["view"] = "dashboard"
        st.rerun()
        
    st.write("") # Gap
    
    if st.button("🔍 내 경기 조회 (선수용)", use_container_width=True):
        st.query_params["view"] = "player"
        st.rerun()
        
    st.markdown("---")
    
    # Admin / Staff Section (Collapsible or Bottom)
    with st.expander("운영진 및 코트 접속 (Staff Only)"):
        c1, c2 = st.columns(2)
        with c1:
            if st.button("운영진 대시보드 입장", use_container_width=True):
                st.query_params["view"] = "admin"
                st.rerun()
        with c2:
            st.write("코트 태블릿 접속")
            cols = st.columns(3)
            courts = db.get_courts()
            for i in range(len(courts)):
                c_idx = i + 1
                if cols[i%3].button(f"{c_idx}코트", key=f"btn_c_{c_idx}"):
                    st.query_params["view"] = "court"
                    st.query_params["id"] = str(c_idx)
                    st.rerun()
