import streamlit as st
import random
from utils import logic

def render(db):
    if st.button("홈으로", use_container_width=True):
        st.query_params.clear()
        st.rerun()

    state = db.knockout_draw
    current_round = state.get('current_round_name', '16강')
    
    st.title(f"🏆 {current_round} 조추첨")
    
    # Check if draw is active
    
    # Setup Button (only if not active)
    if not state['is_active']:
        # If matches are empty and no active draw, it might be initial start OR next round wait.
        # Check history to see if we are mid-tournament.
        history = state.get('round_history', [])
        
        if not history:
            st.info("예선 경기가 모두 종료되면 조추첨을 시작할 수 있습니다.")
            if st.button("예선 결과 집계 및 조추첨 시작", type="primary"):
                try:
                    logic.init_knockout_draw(db)
                    st.success("조추첨 준비 완료!")
                    st.rerun()
                except Exception as e:
                    st.error(f"오류: {e}")
            return
        else:
            # Check if current round matches are done?
            last_round = history[-1]['name']
            if logic.check_round_complete(db, last_round):
                 st.success(f"{last_round} 경기가 모두 종료되었습니다.")
                 if st.button(f"다음 라운드 조추첨 시작", type="primary"):
                     logic.init_next_round_draw(db)
                     st.rerun()
            else:
                st.warning(f"현재 {last_round} 경기가 진행 중입니다. 모든 경기가 종료되어야 다음 조추첨이 가능합니다.")
            return

    # Draw Interface area
    col_draw, col_result = st.columns([2, 1])
    
    with col_draw:
        st.subheader("추첨 진행")
        
        # Check if done
        if state['current_drawer_idx'] >= len(state['pot_2']):
            st.success("🎯 모든 조추첨이 완료되었습니다!")
            st.markdown("---")
            if st.button(f"🚀 {current_round} 토너먼트 시작하기", type="primary", use_container_width=True):
                logic.start_knockout_round(db)
                st.success(f"{current_round} 경기가 코트에 배정되었습니다!")
                st.query_params['view'] = 'admin'
                st.rerun()
                
        else:
            current_drawer = state['pot_2'][state['current_drawer_idx']]
            
            # Format Name
            c_name = current_drawer['name']
            p1 = current_drawer.get('player1', '')
            p2 = current_drawer.get('player2', '')
            
            # Smart Format
            if p1 or p2:
                 # If name matches "p1, p2" or contains it, don't append
                 if f"{p1}, {p2}" not in c_name:
                     c_name += f" ({p1}, {p2})"
            
            origin_label = current_drawer.get('group', '이전 라운드 승자')
            st.info(f"👉 **{origin_label}** 에서 올라온 **'{c_name}'**의 추첨 차례입니다.")
            st.write("아래 '물음표 카드' 중 하나를 선택하면 상대팀이 결정됩니다.")
            
            # Show Cards (Pot 1)
            # Pot 1 is shuffled list. We show buttons as "Card 1", "Card 2"...
            # Use columns for grid
            grid_cols = st.columns(4)
            
            # We need to show buttons for *remaining* items in pot_1.
            # pot_1 shrinks in logic.perform_draw.
            
            for i, target in enumerate(state['pot_1']):
                # Button label is hidden.
                # Just "Card X"?
                # But if we pop from list, indices shift. 
                # Better to just show N buttons where N = len(pot_1).
                
                with grid_cols[i % 4]:
                    if st.button(f"❓ 카드 {i+1}", key=f"card_{i}", use_container_width=True):
                        match_info = logic.perform_draw(db, i)
                        st.toast(f"추첨 결과: {match_info['home']['name']} vs {match_info['away']['name']}")
                        st.rerun()

    with col_result:
        st.subheader(f"{current_round} 대진표")
        if not state['matches']:
            st.info("아직 추첨된 대진이 없습니다.")
        
        for m in state['matches']:
            t1 = m['home']
            t2 = m['away']
            st.warning(f"**{t1['name']}** vs **{t2['name']}**")
            st.caption(f"매치업 확정") # Simplification
            st.divider()
            
    # Reset (Debug purpose)
    with st.expander("관리자 옵션"):
        if st.button("조추첨 초기화 (주의)", type="secondary"):
            db.knockout_draw['is_active'] = False
            db.knockout_draw['matches'] = []
            st.rerun()
