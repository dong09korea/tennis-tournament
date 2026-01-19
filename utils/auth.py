import streamlit as st
import time

def check_password(key_prefix, proper_password):
    """
    Returns True if password is correct (or already verified).
    Returns False and shows input if not.
    """
    session_key = f"auth_{key_prefix}"
    
    # Check if already authenticated
    if st.session_state.get(session_key, False):
        return True
        
    st.markdown("## 🔒 접근 제한")
    st.write("이 페이지에 접근하려면 비밀번호가 필요합니다.")
    
    # Use a form to allow 'Enter' key submission
    with st.form(key=f"auth_form_{key_prefix}"):
        pwd = st.text_input("비밀번호", type="password")
        submit = st.form_submit_button("확인")
        
    if submit:
        if pwd == proper_password:
            st.session_state[session_key] = True
            st.success("인증되었습니다!")
            time.sleep(0.5)
            st.rerun()
        else:
            st.error("비밀번호가 올바르지 않습니다.")
            
    return False
