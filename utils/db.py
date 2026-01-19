import streamlit as st
import json
import os
import datetime
from supabase import create_client, Client

# For now, we use a simple class stored in st.cache_resource to simulate a shared DB.
# This ensures that Admin tab and Court tabs share the same data in memory.

class SupabaseDatabase:
    def __init__(self):
        try:
            url = st.secrets["supabase_url"]
            key = st.secrets["supabase_key"]
            self.client: Client = create_client(url, key)
            self.config = self.load_config()
            
            # Cache for read heavy ops (optional, but good for performance)
            # For now, let's fetch fresh.
        except Exception as e:
            st.error(f"Supabase Connection Failed: {e}")
            self.client = None

    def load_config(self):
        if not self.client: return {"num_teams": 32, "num_groups": 8, "num_courts": 6}
        try:
            res = self.client.table('tournament_config').select('*').eq('key', 'main_config').execute()
            if res.data:
                return res.data[0]['value']
            else:
                # Default
                default_conf = {"num_teams": 32, "num_groups": 8, "num_courts": 6}
                self.client.table('tournament_config').insert({'key': 'main_config', 'value': default_conf}).execute()
                return default_conf
        except:
            return {"num_teams": 32, "num_groups": 8, "num_courts": 6}
            
    # --- Config Properties ---
    # We expose 'self.config' as a property or sync it often.
    # To keep interface similar to LocalDatabase, let's allow direct access but we need to save changes.
    # Actually, let's change behavior: any write to config must call save_config.
    
    @property
    def knockout_draw(self):
        # Fetch knockout state
        if not self.client: return {'is_active': False}
        try:
            res = self.client.table('tournament_config').select('*').eq('key', 'knockout_draw').execute()
            if res.data:
                return res.data[0]['value']
            return {
                "is_active": False,
                "current_round_name": "16강",
                "pot_1": [], "pot_2": [], "matches": [], 
                "current_drawer_idx": 0, "round_history": []
            }
        except:
            return {}

    @knockout_draw.setter
    def knockout_draw(self, value):
        if not self.client: return
        self.client.table('tournament_config').upsert({'key': 'knockout_draw', 'value': value}).execute()

    def save_to_disk(self):
        # Compatibility method: No-op for Supabase or maybe trigger config save?
        # In LocalDB, this dumped everything. In Supabase, we save incrementally.
        # But some code assumes modifying `db.config` locally then calling `save_to_disk`.
        # So we should save config here.
        if self.client:
            self.client.table('tournament_config').upsert({'key': 'main_config', 'value': self.config}).execute()

    # --- Teams ---
    def get_teams(self):
        if not self.client: return []
        res = self.client.table('teams').select('*').execute()
        # Sort by ID numeric if possible or just alpha
        # ID is "t1", "t2".
        data = res.data
        # Simple Sort
        try:
            data.sort(key=lambda x: int(x['id'][1:]))
        except:
            pass
        return data

    def set_teams(self, teams_data):
        # teams_data: list of dicts.
        # This replaces ALL teams? Usually setup phase.
        if not self.client: return []
        
        # 1. Truncate/Delete all (since it's a reset/setup op)
        # Supabase doesn't have simple TRUNCATE via API without RLS policies sometimes.
        # Delete where ID is not null.
        # CAUTION: This is dangerous. But `set_teams` is usually "Init Tournament".
        
        # We'll assume we upsert. But to clear old ones, we should delete.
        current = self.get_teams()
        if current:
            ids = [t['id'] for t in current]
            # Chunk delete if many
            self.client.table('teams').delete().in_('id', ids).execute()
        
        new_teams = []
        for i, item in enumerate(teams_data):
            tid = f"t{i+1}"
            if isinstance(item, str):
                t_row = {
                    "id": tid,
                    "name": item,
                    "player1": "",
                    "player2": "",
                    "group_id": None, 
                    "stats": {"wins": 0, "draws": 0, "losses": 0, "points": 0, "games_won": 0}
                }
            else:
                t_row = {
                    "id": tid,
                    "name": item.get('name', f'Team {i+1}'),
                    "player1": item.get('player1', ''),
                    "player2": item.get('player2', ''),
                    "group_id": None, # Handle later
                    "stats": {"wins": 0, "draws": 0, "losses": 0, "points": 0, "games_won": 0}
                }
                # Check pre-group
                if item.get('group'):
                    try:
                        t_row['group_id'] = int(item['group'])
                    except:
                        pass
            new_teams.append(t_row)
            
        if new_teams:
            self.client.table('teams').insert(new_teams).execute()
        
        # Sync local config if needed? No, separate call.
        return new_teams

    # --- Groups ---
    def get_groups(self):
        # Group is derived from Teams + Logic, OR stored?
        # Original: stored in JSON.
        # We didn't create a 'groups' table. We can infer groups from Teams' group_id.
        
        # Let's see logical structure. 'groups' list contains {id, name, team_ids}.
        # We can reconstruct this.
        teams = self.get_teams()
        n_groups = self.config.get("num_groups", 8)
        
        groups_map = {i: [] for i in range(1, n_groups+1)}
        for t in teams:
            gid = t.get('group_id')
            if gid and isinstance(gid, int) and gid in groups_map:
                groups_map[gid].append(t['id'])
        
        groups_list = []
        for i in range(1, n_groups+1):
            groups_list.append({
                "id": i,
                "name": f"{i}조",
                "team_ids": groups_map[i] 
            })
        return groups_list
    
    def set_groups(self, groups_data):
        # groups_data: list of {id, team_ids, ...}
        # Update team's group_id
        if not self.client: return
        
        # Prepare bulk updates?
        # Teams table update.
        for g in groups_data:
            gid = g['id']
            tids = g['team_ids']
            if not tids: continue
            
            # Update these teams
            for tid in tids:
                 self.client.table('teams').update({"group_id": gid}).eq('id', tid).execute()

    # --- Matches ---
    def get_matches(self):
        if not self.client: return []
        res = self.client.table('matches').select('*').execute()
        # Data conversion: Convert strings back to types if needed.
        # JSON standard types work fine.
        data = res.data
        # Sort?
        # Sorting matches: by group, round...
        return data
    
    def set_matches(self, matches):
        # Full Overwrite?
        if not self.client: return
        
        # Wipe old matches?
        current = self.get_matches()
        if current:
            ids = [m['id'] for m in current]
            # Delete in chunks if needed (Supabase limit usually high enough for ~100)
            self.client.table('matches').delete().in_('id', ids).execute()
        
        if matches:
            # Clean data for SQL
            # group_id might be "16강" (str) or 1 (int). Supabase TEXT column handles both as string.
            # Convert to valid dicts
            clean_matches = []
            for m in matches:
                # remove non-column keys if any (e.g. dynamic props)
                # Keep strictly schema cols
                # Schema: id, group_id, round, team_a_id, team_b_id, score_a, score_b, point_a, point_b, status, court_id, winner_id, is_draw, is_tie_break
                
                row = {
                    "id": m['id'],
                    "group_id": str(m['group_id']), # Force string
                    "round": m['round'],
                    "team_a_id": m['team_a_id'],
                    "team_b_id": m['team_b_id'],
                    "score_a": m['score_a'],
                    "score_b": m['score_b'],
                    "point_a": m['point_a'],
                    "point_b": m['point_b'],
                    "status": m['status'],
                    "court_id": m.get('court_id'),
                    "winner_id": m.get('winner_id'),
                    "is_draw": m.get('is_draw', False),
                    "is_tie_break": m.get('is_tie_break', False)
                }
                clean_matches.append(row)
            
            # Bulk Insert
            # Supabase API might limit bulk size. 
            count = len(clean_matches)
            chunk_size = 100
            for i in range(0, count, chunk_size):
                chunk = clean_matches[i:i+chunk_size]
                self.client.table('matches').insert(chunk).execute()

    def update_match(self, match_id, updates):
        if not self.client: return
        
        # Sanitize
        if 'group_id' in updates: updates['group_id'] = str(updates['group_id'])
        
        self.client.table('matches').update(updates).eq('id', match_id).execute()
        
        # If 'status' COMPLETED, update court? Handled by logic usually.
        # Return updated logic locally?
        # logic functions usually expect to read back from DB or use the dict passed.
        # we return the dict combined.
        # But wait, original code returned the modified dict. 
        # We should fetch fresh or just patch dict.
        return updates # Simplified

    # --- Courts ---
    def get_courts(self):
        if not self.client: return []
        res = self.client.table('courts').select('*').order('id').execute()
        if not res.data:
            # Init if empty
            n = self.config.get('num_courts', 6)
            init_data = [{"id": i+1, "match_id": None} for i in range(n)]
            self.client.table('courts').insert(init_data).execute()
            return init_data
        return res.data

    def update_court(self, court_id, match_id):
        if not self.client: return
        self.client.table('courts').update({'match_id': match_id}).eq('id', court_id).execute()

    # --- Compatibility Wrapper ---
    @property
    def teams(self): return self.get_teams()
    @teams.setter
    def teams(self, val): self.set_teams(val)
    
    @property
    def groups(self): return self.get_groups()
    @groups.setter
    def groups(self, val): self.set_groups(val)
    
    @property
    def matches(self): 
        # Convert group_id back to int if numeric string (compatibility)
        data = self.get_matches()
        for m in data:
            if m['group_id'].isdigit():
                m['group_id'] = int(m['group_id'])
        return data
        
    @matches.setter
    def matches(self, val): self.set_matches(val)
    
    @property
    def courts(self): return self.get_courts()
    @courts.setter
    def courts(self, val): 
        # Only used for init loop usually?
        # We generally update individual courts.
        # But if `db.courts = ...` is called, we should respect it.
        # Likely from admin config change.
        if not self.client: return
        self.client.table('courts').delete().neq('id', 0).execute() 
        self.client.table('courts').insert(val).execute()


@st.cache_resource
def get_shared_db_v3():
    db = SupabaseDatabase()
    return db

def get_db():
    return get_shared_db_v3()
