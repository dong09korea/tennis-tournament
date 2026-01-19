import streamlit as st
import json
import os
import datetime

# For now, we use Streamlit Session State as the primary "Live" DB.
# In a real deployed version, we would verify connection to Supabase here.

# For now, we use a simple class stored in st.cache_resource to simulate a shared DB.
# This ensures that Admin tab and Court tabs share the same data in memory.

class LocalDatabase:
    DB_FILE = "tournament_data.json"

    def __init__(self):
        self.teams = []
        self.groups = []
        self.matches = []
        self.matches = []
        self.config = {"num_teams": 32, "num_groups": 8, "num_courts": 6} # Defaults
        # Courts will be init in load_from_disk or defaults
        self.courts = []
        self.logs = []
        
        # Knockout Draw State
        self.knockout_draw = {
            "is_active": False,
            "current_round_name": "16강",
            "pot_1": [], 
            "pot_2": [], 
            "matches": [], 
            "current_drawer_idx": 0,
            "round_history": []
        }
        
        # Attempt load on init
        self.load_from_disk()

        # Initialize courts if not loaded or resize if needed (though resize might need more logic, for now init)
        # Check if courts match config, if not, re-init (simple approach)
        current_court_count = self.config.get("num_courts", 6)
        if len(self.courts) != current_court_count:
             # Preserve existing if possible? For now, if count changes, we might accept reset or just append/trim?
             # Let's just strict resize or re-init. Re-init is safer for consistency.
             # But if we just loaded data, we might want to keep it.
             # Let's rely on load_from_disk to set self.courts.
             # If completely new DB, self.courts is empty before load? No, in init line 20.
             # Wait, line 20 was: self.courts = [{"id": i+1, "match_id": None} for i in range(6)]
             # We need to move that AFTER loading config because we don't know N yet.
             pass

    def save_to_disk(self):
        data = {
            "config": self.config,
            "teams": self.teams,
            "groups": self.groups,
            "matches": self.matches,
            "courts": self.courts,
            "knockout_draw": self.knockout_draw,
            "logs": self.logs
        }
        try:
            with open(self.DB_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Auto-save failed: {e}")

    def load_from_disk(self):
        if not os.path.exists(self.DB_FILE):
            # defaults if no file
            self.config = {"num_teams": 32, "num_groups": 8, "num_courts": 6}
            self.courts = [{"id": i+1, "match_id": None} for i in range(self.config["num_courts"])]
            return

        try:
            with open(self.DB_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Load config first
            self.config = data.get("config", {"num_teams": 32, "num_groups": 8, "num_courts": 6})
                
            self.teams = data.get("teams", [])
            self.groups = data.get("groups", [])
            self.matches = data.get("matches", [])
            self.courts = data.get("courts", [{"id": i+1, "match_id": None} for i in range(self.config["num_courts"])])
            self.logs = data.get("logs", [])
            self.knockout_draw = data.get("knockout_draw", {
                "is_active": False,
                "current_round_name": "16강",
                "pot_1": [], "pot_2": [], "matches": [], 
                "current_drawer_idx": 0, "round_history": []
            })
            if 'round_history' not in self.knockout_draw:
                self.knockout_draw['round_history'] = []
                
        except Exception as e:
            print(f"Load failed: {e}")
            # Fallback
            self.config = {"num_teams": 32, "num_groups": 8, "num_courts": 6}
            self.courts = [{"id": i+1, "match_id": None} for i in range(6)]

    def get_teams(self):
        return self.teams

    def set_teams(self, teams_data):
        # teams_data can be a list of strings (names) OR list of dicts (custom import)
        new_teams = []
        for i, item in enumerate(teams_data):
            tid = f"t{i+1}"
            if isinstance(item, str):
                new_teams.append({
                    "id": tid, "name": item, 
                    "player1": "", "player2": "",
                    "wins": 0, "draws": 0, "losses": 0, "points": 0, "games_won": 0
                })
            else:
                # Dict input
                new_teams.append({
                    "id": tid, 
                    "name": item.get('name', f'Team {i+1}'),
                    "player1": item.get('player1', ''),
                    "player2": item.get('player2', ''),
                    "wins": 0, "draws": 0, "losses": 0, "points": 0, "games_won": 0,
                    # Optional: preserve group pre-assignment if we want to handle it later
                    "pre_group": item.get('group', None) 
                })
        self.teams = new_teams
        self.save_to_disk()
        return self.teams

    def get_groups(self):
        return self.groups
    
    def set_groups(self, groups):
        self.groups = groups
        self.save_to_disk()

    def get_matches(self):
        return self.matches
    
    def set_matches(self, matches):
        self.matches = matches
        self.save_to_disk()

    def get_courts(self):
        return self.courts

    def update_match(self, match_id, updates):
        for m in self.matches:
            if m['id'] == match_id:
                m.update(updates)
                self.save_to_disk()
                return m
        return None

    def update_court(self, court_id, match_id):
        for c in self.courts:
            if c['id'] == court_id:
                c['match_id'] = match_id
                self.save_to_disk()
                return c
        return None

@st.cache_resource
def get_shared_db_v2():
    db = LocalDatabase()
    return db

def get_db():
    return get_shared_db_v2()
