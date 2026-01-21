import streamlit as st
from utils.db import get_db
from views import admin, court, draw, player, dashboard

st.set_page_config(page_title="테니스 대회 관리", layout="wide")

import time

# --- Intro Warning Screen ---
if 'intro_accepted' not in st.session_state:
    st.markdown("""
    <style>
    .fbi-warning {
        background-color: #000;
        color: #fff;
        padding: 50px;
        text-align: center;
        border: 5px solid #fff;
        font-family: 'Arial Black', sans-serif;
        margin-top: 50px;
    }
    .fbi-title {
        font-size: 3em;
        color: #FFD700; /* Gold */
        margin-bottom: 20px;
    }
    .fbi-text {
        font-size: 1.2em;
        line-height: 1.6;
        margin-bottom: 30px;
    }
    .fbi-footer {
        font-size: 0.9em;
        color: #aaa;
    }
    </style>
    """, unsafe_allow_html=True)
    
    st.markdown("""
        <div class="fbi-warning">
            <div class="fbi-title">WARNING</div>
            <div class="fbi-text">
                <strong>본 프로그램은 "라켓업 홍보이사 김동현" 님에 의해 제작되었습니다.</strong><br><br>
                저작권법 제501조 및 국제 협약에 따라<br>
                이 소프트웨어의 무단 복제, 배포 및 상업적 이용을 엄격히 금지합니다.<br>
                <br>
                위반 시 민, 형사상의 법적 책임을 물을 수 있으며<br>
                최대 5년 이하의 징역 또는 5천만 원 이하의 벌금에 처해질 수 있습니다.
            </div>
            <div class="fbi-footer">RACKET UP ANTI-PIRACY DEPARTMENT</div>
        </div>
    """, unsafe_allow_html=True)
    
    # 3 Seconds Delay simulation
    placeholder = st.empty()
    with placeholder:
        for i in range(3, 0, -1):
            st.write(f"⚠️ {i}초 후 입장 가능합니다...")
            time.sleep(1)
    placeholder.empty()
    
    c1, c2, c3 = st.columns([1,2,1])
    with c2:
        if st.button("위 내용을 확인하였으며, 동의합니다.", use_container_width=True, type="primary"):
            st.session_state['intro_accepted'] = True
            st.rerun()
            
    st.stop()
# -----------------------------

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
