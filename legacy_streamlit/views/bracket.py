import streamlit as st

def render(db):
    st.markdown("## 🏆 토너먼트 대진표")
    
    matches = db.get_matches()
    
    # Filter only knockout matches
    # Group logic uses '16강', '8강'...
    
    # Columns: 16강 -> 8강 -> 4강 -> 결승
    c1, c2, c3, c4 = st.columns(4)
    
    rounds = ["16강", "8강", "4강", "결승"]
    cols = [c1, c2, c3, c4]
    
    for r, col in zip(rounds, cols):
        with col:
            st.subheader(r)
            round_matches = [m for m in matches if m['group_id'] == r]
            if not round_matches:
                st.caption("-")
            
            for m in round_matches:
                # Helper for names
                def get_info(tid):
                     t = next((x for x in db.get_teams() if x['id'] == tid), None)
                     if not t: return "?", ""
                     
                     name = t['name']
                     p1 = t.get('player1', '')
                     p2 = t.get('player2', '')
                     sub = ""
                     
                     if p1 or p2:
                         if f"{p1}, {p2}" not in name:
                             sub = f"({p1}, {p2})"
                     return name, sub

                t1_name, t1_sub = get_info(m['team_a_id'])
                t2_name, t2_sub = get_info(m['team_b_id'])
                
                # HTML Construction
                if m['status'] == 'COMPLETED':
                    winner_id = m['winner_id']
                    
                    if winner_id == m['team_a_id']:
                        w_name, w_sub, w_score = t1_name, t1_sub, m['score_a']
                        l_name, l_sub, l_score = t2_name, t2_sub, m['score_b']
                    else:
                        w_name, w_sub, w_score = t2_name, t2_sub, m['score_b']
                        l_name, l_sub, l_score = t1_name, t1_sub, m['score_a']
                        
                    card_html = f"""
<div style="background-color: #184520; border-radius: 8px; padding: 12px; margin-bottom: 12px; border-left: 5px solid #76FF03;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
<span style="font-weight: 900; font-size: 1.1em; color: #fff;">{w_name}</span>
<span style="font-size: 0.8em; color: #ddd; margin-left: 6px;">{w_sub}</span>
</div>
<div style="font-weight: 900; font-size: 1.8em; color: #76FF03; min-width: 30px; text-align: right;">{w_score}</div>
</div>
<div style="display: flex; justify-content: space-between; align-items: center;">
<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
<span style="color: #A5D6A7;">{l_name}</span>
<span style="font-size: 0.8em; color: #888; margin-left: 6px;">{l_sub}</span>
</div>
<div style="font-size: 1.0em; color: #888; min-width: 30px; text-align: right;">{l_score}</div>
</div>
</div>
"""
                else:
                    # Pending/Live
                    border_color = "#D5FF00" if m['status'] == 'LIVE' else "#2E7D32"
                    bg_color = "#184520"
                    
                    status_badge = ""
                    if m['status'] == 'LIVE':
                         status_badge = f"<div style='text-align: right; font-size: 0.7em; color: #D5FF00; margin-bottom: 4px; font-weight: bold;'>🔥 진행 중</div>"
                    
                    card_html = f"""
<div style="background-color: {bg_color}; border-radius: 8px; padding: 12px; margin-bottom: 12px; border-left: 5px solid {border_color};">
{status_badge}
<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
<span>{t1_name} <small style='color:#888'>{t1_sub}</small></span>
<span>{m['score_a']}</span>
</div>
<div style="display: flex; justify-content: space-between;">
<span>{t2_name} <small style='color:#888'>{t2_sub}</small></span>
<span>{m['score_b']}</span>
</div>
</div>
"""

                st.markdown(card_html, unsafe_allow_html=True)
