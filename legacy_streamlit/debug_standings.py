
import streamlit as st
from utils.db import get_db
from utils import logic
import pandas as pd

st.set_page_config(layout="wide")
db = get_db()
st.title("Debug Key Error")

if st.button("Check Standings"):
    try:
        grouped_stats = logic.calculate_standings(db)
        st.write("Calculated Stats Keys:", list(grouped_stats.keys()) if grouped_stats else "Empty")
        
        # Simulate Admin View Loop
        groups = db.get_groups()
        teams = db.get_teams()
        
        for group in groups:
            st.write(f"checking Group {group['id']}")
            data = []
            for tid in group['team_ids']:
                if tid in grouped_stats:
                    s = grouped_stats[tid].copy()
                    data.append(s)
                else:
                    st.error(f"Missing stats for {tid}")
            
            if data:
                df = pd.DataFrame(data)
                st.write(f"DF Columns: {df.columns.tolist()}")
                st.dataframe(df)
                try:
                   df = df.sort_values(by=['Pts', 'Games'], ascending=[False, False])
                   st.success("Sort OK")
                except KeyError as e:
                   st.error(f"Sort Failed: {e}")
                   st.write("Data Dump:", data)

    except Exception as e:
        st.error(f"Global Error: {e}")
