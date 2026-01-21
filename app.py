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
        background-color: #0d0d0d;
        color: #e5e5e5;
        padding: 40px;
        text-align: center;
        border: 4px solid #cc0000; /* Red Border like typical warnings */
        box-shadow: 0 0 20px rgba(204, 0, 0, 0.5);
        font-family: 'Arial', sans-serif;
        margin-top: 50px;
        margin-bottom: 30px;
    }
    .fbi-title {
        font-size: 3.5em;
        font-weight: 900;
        color: #fff;
        background-color: #cc0000;
        display: inline-block;
        padding: 5px 20px;
        margin-bottom: 30px;
        letter-spacing: 2px;
    }
    .fbi-subtitle {
        font-size: 1.5em;
        font-weight: bold;
        color: #cc0000;
        margin-bottom: 20px;
        text-transform: uppercase;
    }
    .fbi-text {
        font-size: 1.1em;
        line-height: 1.8;
        margin-bottom: 30px;
        color: #fff;
    }
    .fbi-footer {
        font-size: 0.8em;
        color: #888;
        margin-top: 20px;
        border-top: 1px solid #333;
        padding-top: 10px;
    }
    /* Force Button Text Color to Black for better visibility on Yellow Primary */
    div.stButton > button, 
    div.stButton > button p, 
    div.stButton > button span,
    div.stButton > button div,
    button[kind="primary"],
    button[kind="primary"] * {
        color: black !important;
        font-weight: bold !important;
        background-color: #ccff00 !important; /* Force Tennis Yellow */
        border: none !important;
    }
    /* Even deeper targeting for specific Streamlit versions */
    div.stButton button div[data-testid="stMarkdownContainer"] p {
         color: black !important;
    }
    
    div.stButton > button:hover, 
    div.stButton > button:hover *,
    div.stButton > button:active,
    div.stButton > button:focus {
        background-color: #b3e600 !important;
        color: black !important;
    }
    
    /* Specific target for the primary button container if needed */
    div[data-testid="stBaseButton-primary"] {
        color: black !important;
    }
    </style>
    """, unsafe_allow_html=True)
    
    st.markdown("""
        <div class="fbi-warning">
            <div class="fbi-title">WARNING</div>
            <div class="fbi-subtitle">FBI ANTI-PIRACY WARNING</div>
            <div class="fbi-text">
                본 프로그램은 <strong style="font-size: 1.5em; color: #ccff00; text-decoration: underline;">"라켓업 홍보이사 김동현"</strong> 님에 의해 제작되었습니다.<br>
                <br>
                저작권법 제501조 및 국제 형사법에 의거하여<br>
                이 소프트웨어의 무단 복제, 배포, 방송 및 상업적 이용을 <strong>엄격히 금지</strong>합니다.<br>
                <br>
                <span style="color: #ff4b4b;">위반 행위 적발 시, 예고 없이 민·형사상의 법적 조치가 취해질 수 있으며<br>
                최대 5년 이하의 징역 또는 5천만 원 이하의 벌금에 처해질 수 있습니다.</span>
            </div>
            <div class="fbi-footer">
                UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS INVESTIGATED BY THE FBI AND IS PUNISHABLE BY FEDERAL LAW.
            </div>
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
    
    # Tournament Schedule & Order Section
    st.markdown("### 📅 대회 일정 및 순서")
    
    # Fetch start time
    start_time_str = db.config.get("start_time", "09:00")
    
    st.info(f"""
    **대회 시작 시간:** {start_time_str}
    
    **진행 순서:**
    1. **예선 조별 리그** (각 조 풀리그, 5:5 무승부)
    2. **본선 토너먼트** (각 조 상위 팀 진출, 16강 ~ 결승)
    3. **시상식 (우승, 준우승, 3위)**
    """)
    
    st.markdown("---")
    st.caption("원하시는 서비스를 선택하세요")
    
    # Public Section (Mobile First)
    if st.button("📊 참가자용 대시보드 (전체 현황)", use_container_width=True, type="primary"):
        st.query_params["view"] = "dashboard"
        st.rerun()
        
    st.write("") # Gap
    
    if st.button("🔍 내 경기 조회 (선수용)", use_container_width=True):
        st.query_params["view"] = "player"
        st.rerun()
        
    st.markdown("---")
    
    # Admin / Staff Section (Collapsible or Bottom)
    with st.expander("🔐 운영진 및 코트 접속 (Staff Only)"):
        c1, c2 = st.columns(2)
        with c1:
            if st.button("운영진 대시보드 입장", use_container_width=True):
                st.query_params["view"] = "admin"
                st.rerun()
        with c2:
            # Court Login Input
            court_pw = st.text_input("코트 비밀번호", type="password", key="idx_court_pw")
            if st.button("코트 접속", use_container_width=True):
                if auth.check_password('court', court_pw):
                     st.warning("코트 접속은 각 코트별 고유 주소(QR)를 이용해주세요.")
                     pass
            
            st.divider()
            st.caption("테스트용 코트 바로가기")
            cols = st.columns(3)
            courts = db.get_courts()
            for i in range(len(courts)):
                c_idx = i + 1
                if cols[i%3].button(f"{c_idx}코트", key=f"btn_c_{c_idx}"):
                    st.query_params["view"] = "court"
                    st.query_params["id"] = str(c_idx)
                    st.rerun()
