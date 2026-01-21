import random

def generate_groups(teams, n_groups=8):
    # Teams is a list of team dicts.
    # n_groups: Number of groups (default 8)
    
    # Check if teams have 'pre_group' assigned via Excel
    use_pre_assigned = any(t.get('pre_group') for t in teams)
    
    if use_pre_assigned:
        # Initialize n_groups empty groups
        group_map = {i+1: [] for i in range(n_groups)}
        unassigned = []
        
        for t in teams:
            pg = t.get('pre_group')
            # Try to parse pg
            try:
                pg_int = int(pg)
                if 1 <= pg_int <= n_groups:
                    group_map[pg_int].append(t['id'])
                else:
                    unassigned.append(t['id'])
            except:
                unassigned.append(t['id'])
                
        # Simple fill for unassigned (optional robustness)
        for g_id in range(1, n_groups + 1):
            # Target size is roughly len(teams) / n_groups
            # But let's just append to fill roughly even? 
            # Or just append unassigned to empty spots first?
            # Existing logic was simple while loop.
            target_size = (len(teams) + n_groups - 1) // n_groups
            while len(group_map[g_id]) < target_size and unassigned:
                group_map[g_id].append(unassigned.pop(0))
                
        # If still unassigned, just dump in last group or round robin?
        i = 0
        while unassigned:
            g_id = (i % n_groups) + 1
            group_map[g_id].append(unassigned.pop(0))
            i += 1
                
        groups = []
        for i in range(n_groups):
            groups.append({
                "id": i+1,
                "name": f"{i+1}조",
                "team_ids": group_map[i+1]
            })
        return groups
        
    else:
        # Standard Slice/Distribute
        # To handle any number of teams/groups, simple slice might not be even.
        # Better to create empty groups and distribute round robin.
        groups = []
        for i in range(n_groups):
            groups.append({
                "id": i+1,
                "name": f"{i+1}조",
                "team_ids": []
            })
            
        for idx, team in enumerate(teams):
            g_idx = idx % n_groups
            groups[g_idx]['team_ids'].append(team['id'])
            
        return groups

def generate_schedule(groups):
    # Generic Round Robin for any group size
    all_matches = []
    
    for group in groups:
        team_ids = group['team_ids']
        n = len(team_ids)
        if n < 2: continue
        
        # Simple Pairwise generation
        # To better organize 'Rounds' for scheduling, we could use circle method?
        # But for now, let's just generate all pairs (i, j)
        # And assign them a sequential "match index" within the group which acts as "round" priority.
        
        group_matches = []
        for i in range(n):
            for j in range(i+1, n):
                group_matches.append((team_ids[i], team_ids[j]))
        
        # Shuffle or keep order? 
        # Keeping standard order (0-1, 0-2...) is bad for rest times.
        # Let's simple shuffle or try to distribute?
        # For typical 4-5 teams, standard order: 0-1, 0-2 (0 plays again immediately).
        # Better: Circle Method or just standard rotation.
        # Given scope, I will implement a standard All-Play-All nested loop
        # and rely on 'Team Busy' check in assignment to prevent double booking.
        # (I will add Team Busy check in assignment logic next).
        
        match_idx_in_group = 1
        for t_a, t_b in group_matches:
            match_id = f"g{group['id']}_m{match_idx_in_group}"
            
            all_matches.append({
                "id": match_id,
                "group_id": group['id'],
                "round": match_idx_in_group, # Priority
                "team_a_id": t_a,
                "team_b_id": t_b,
                "score_a": 0, "score_b": 0,
                "point_a": 0, "point_b": 0,
                "status": "PENDING",
                "court_id": None,
                "winner_id": None,
                "is_draw": False
            })
            match_idx_in_group += 1
            
    return all_matches

def assign_matches_to_courts(db):
    courts = db.get_courts()
    matches = db.get_matches()
    
    # Check for empty courts
    empty_courts = [c for c in courts if c['match_id'] is None]
    if not empty_courts:
        return
    
    # Check currently LIVE matches to find busy teams
    live_matches = [m for m in matches if m['status'] == 'LIVE']
    busy_teams = set()
    for m in live_matches:
        busy_teams.add(m['team_a_id'])
        busy_teams.add(m['team_b_id'])
    
    # Get pending matches
    pending_matches = [m for m in matches if m['status'] == 'PENDING']
    
    # Sort pending matches to prioritize earlier rounds
    # And interleave groups to avoid one group monopolizing courts if possible
    # Current sort: Round (asc), Group ID (asc)
    # This works reasonable well.
    pending_matches.sort(key=lambda m: (m['round'], str(m['group_id']))) # str for group_id to handle mixed types safely? (though prelim is int)
    
    for court in empty_courts:
        # Find first candidate match where teams are NOT busy
        candidate_match = None
        candidate_idx = -1
        
        for i, m in enumerate(pending_matches):
            if m['team_a_id'] not in busy_teams and m['team_b_id'] not in busy_teams:
                candidate_match = m
                candidate_idx = i
                break
        
        if candidate_match:
            # Assign
            pending_matches.pop(candidate_idx) # Remove from local list so we don't pick it again for next court loop
            
            candidate_match['status'] = 'LIVE'
            candidate_match['court_id'] = court['id']
            
            db.update_match(candidate_match['id'], {
                "status": "LIVE",
                "court_id": court['id']
            })
            db.update_court(court['id'], candidate_match['id'])
            
            # Mark teams as busy for this iteration
            busy_teams.add(candidate_match['team_a_id'])
            busy_teams.add(candidate_match['team_b_id'])
        else:
            # No playable match found (everyone busy or no matches)
            break


def process_score(db, match_id, team_side):
    print(f"DEBUG: process_score called for {match_id}, side {team_side}") # DEBUG
    # team_side: 'A' or 'B'
    matches = db.get_matches()
    match = next((m for m in matches if m['id'] == match_id), None)
    if not match:
        print("DEBUG: Match not found!") # DEBUG
        return

    is_knockout = isinstance(match['group_id'], str) # 16강, 8강 etc are strings
    
    # Rule: 
    # Prelim: Win at 6, Draw at 5-5.
    # Knockout: Win at 6... BUT if 5-5, enter TIE BREAK.
    # Tie Break: First to 7, win by 2.
    
    rule_win_games = 6
    rule_draw_at_5_5 = not is_knockout
    
    # Check if already in tie break
    in_tie_break = match.get('is_tie_break', False)
    
    # Trigger Tie Break at 5-5 for Knockout
    if is_knockout and not in_tie_break:
        if match['score_a'] == 5 and match['score_b'] == 5:
            # Entering Tie Break now? No, wait until they start playing for the next game?
            # Actually, standard is at 6-6. But user said "at 5:5".
            # So if score is 5-5, the NEXT points are for the tie-break game.
            # We must flag it.
            match['is_tie_break'] = True
            in_tie_break = True
            # Reset points for the tie break game (start 0-0)
            # CAUTION: If we just arrived at 5-5, point_x might have been the winning point of the previous game?
            # process_score checks winner logic below. we need to be careful.
            # let's look at logic flow.
            pass

    # Increment logic
    # Points: 0 -> 1(15) -> 2(30) -> 3(40) -> Game
    # Tie Break: 0 -> 1 -> 2 ... (Integer)
    
    pa = match['point_a']
    pb = match['point_b']
    
    game_winner = None
    
    if in_tie_break:
        # Tie Break Scoring (1, 2, 3...)
        if team_side == 'A':
            match['point_a'] += 1
        else:
            match['point_b'] += 1
            
        # Check Tie Break Win (7 points, 2 lead) OR (Hard Cap at 10 points)
        tpa = match['point_a']
        tpb = match['point_b']
        
        # Condition 1: Standard Tie Break (7 pts + 2 diff)
        cond_std_a = (tpa >= 7 and (tpa - tpb) >= 2)
        cond_std_b = (tpb >= 7 and (tpb - tpa) >= 2)
        
        # Condition 2: Hard Cap at 10 (Sudden Death at 9-9)
        # User: "그것도 안되면 10점먼저 내는 팀이 이긴데" -> First to 10 wins.
        cond_cap_a = (tpa == 10)
        cond_cap_b = (tpb == 10)
        
        if cond_std_a or cond_cap_a:
            game_winner = 'A'
        elif cond_std_b or cond_cap_b:
            game_winner = 'B'
            
    else:
        # Standard Game Scoring
        if team_side == 'A':
            if pa == 3 and pb == 3: # Deuce (No-Ad)
                game_winner = 'A'
            elif pa == 3:
                game_winner = 'A'
            else:
                match['point_a'] += 1
        else: # B
            if pa == 3 and pb == 3:
                game_winner = 'B'
            elif pb == 3:
                game_winner = 'B'
            else:
                match['point_b'] += 1
            
    if game_winner:
        # Reset points
        match['point_a'] = 0
        match['point_b'] = 0
        
        # If Tie Break was won, that means the MATCH is won (6-5 or 1-0 in tiebreak rule?)
        # Usually tie break counts as one "Game". So score becomes 6-5.
        if game_winner == 'A':
            match['score_a'] += 1
        else:
            match['score_b'] += 1
            
        # Check Set Win/Draw
        sa = match['score_a']
        sb = match['score_b']
        
        match_finished = False
        winner_id = None
        is_draw = False
        
        if rule_draw_at_5_5 and sa == 5 and sb == 5:
            match_finished = True
            is_draw = True
        elif sa >= rule_win_games:
            # Check tie break finish
            match_finished = True
            winner_id = match['team_a_id']
        elif sb >= rule_win_games:
            match_finished = True
            winner_id = match['team_b_id']
            
        if match_finished:
            court_id = match['court_id']
            db.update_match(match_id, {
                "status": "COMPLETED",
                "court_id": None,
                "winner_id": winner_id,
                "is_draw": is_draw
            })
            if court_id:
                db.update_court(court_id, None)
            
            # Auto assign next
            assign_matches_to_courts(db)
        else:
            # Match continues. 
            # Check if this NEW score (e.g. 5-5) triggers tie break for NEXT point?
            if is_knockout and match['score_a'] == 5 and match['score_b'] == 5:
                 match['is_tie_break'] = True
            
            db.update_match(match_id, match)

def is_match_ending_point(match, team_side):
    score_a = match['score_a']
    score_b = match['score_b']
    point_a = match['point_a']
    point_b = match['point_b']
    
    # Tie Break Match Point Check
    if match.get('is_tie_break'):
        p_me = point_a if team_side == 'A' else point_b
        p_other = point_b if team_side == 'A' else point_a
        
        # Win if I reach 6 (next is 7) AND diff will be >= 2
        # OR if I reach 9 (next is 10) - Sudden Death
        
        next_me = p_me + 1
        
        # Standard 7pt + 2diff
        if next_me >= 7 and (next_me - p_other) >= 2:
            return True
            
        # Hard Cap at 10
        if next_me == 10:
            return True
            
        return False
    
    p_me = point_a if team_side == 'A' else point_b
    
    is_knockout = isinstance(match['group_id'], str)
    
    if p_me >= 3: # Match Point candidates
        new_s_a = score_a + (1 if team_side == 'A' else 0)
        new_s_b = score_b + (1 if team_side == 'B' else 0)
        
        # Prelim: 6 Wins or 5-5 Draw
        if not is_knockout:
            if new_s_a == 6 or new_s_b == 6: return True
            if new_s_a == 5 and new_s_b == 5: return True
        else:
            # Knockout: 6 Wins (via Tie Break or 6-0 etc)
            # If 5-5, we don't end, we start tie break.
            if new_s_a == 6 or new_s_b == 6: return True
        
    return False

def undo_score(db, match_id, team_side):
    matches = db.get_matches()
    match = next((m for m in matches if m['id'] == match_id), None)
    if not match: return

    # Simplistic undo (reduce points)
    if team_side == 'A' and match['point_a'] > 0:
        match['point_a'] -= 1
    elif team_side == 'B' and match['point_b'] > 0:
        match['point_b'] -= 1
    
    db.update_match(match_id, match)

def calculate_standings(db):
    teams = db.get_teams()
    groups = db.get_groups()
    matches = db.get_matches()
    
    # Init stats
    stats = {t['id']: {'id': t['id'], 'name': t['name'], 'W': 0, 'L': 0, 'D': 0, 'Pts': 0, 'Games': 0} for t in teams}
    
    completed = [m for m in matches if m['status'] == 'COMPLETED']
    for m in completed:
        sa = m['score_a']
        sb = m['score_b']
        
        # Win/Loss/Draw Pts
        if m['is_draw']:
            stats[m['team_a_id']]['D'] += 1
            stats[m['team_a_id']]['Pts'] += 1
            stats[m['team_b_id']]['D'] += 1
            stats[m['team_b_id']]['Pts'] += 1
        elif m['winner_id']:
            stats[m['winner_id']]['W'] += 1
            stats[m['winner_id']]['Pts'] += 2
            
            loser_id = m['team_b_id'] if m['winner_id'] == m['team_a_id'] else m['team_a_id']
            stats[loser_id]['L'] += 1
        
        # Total Games for tie-breaker (Game Difference / 득실차)
        # Update: User requested clarification on '득실'. Standard is Diff.
        stats[m['team_a_id']]['Games'] += (m['score_a'] - m['score_b'])
        stats[m['team_b_id']]['Games'] += (m['score_b'] - m['score_a'])
            
    return stats

def get_closing_matches(db):
    """
    Returns a list of matches that are close to finishing.
    Criteria:
    - Status is LIVE
    - Sum of scores >= 7 (e.g. 4:3)
    - Or one team has 5 points (Match point soon)
    - Or is_tie_break is True
    """
    matches = db.get_matches()
    live_matches = [m for m in matches if m['status'] == 'LIVE']
    
    closing = []
    for m in live_matches:
        sa = m['score_a']
        sb = m['score_b']
        is_tb = m.get('is_tie_break', False)
        
        # Priority Score (Higher is more urgent)
        urgency = 0
        if is_tb:
            urgency = 100
        elif sa == 5 or sb == 5:
            urgency = 90
        elif (sa + sb) >= 7:
            urgency = 80 + (sa + sb)
        
        if urgency > 0:
            m['_urgency'] = urgency # Temp attribute for sorting
            closing.append(m)
            
    # Sort by urgency desc
    closing.sort(key=lambda x: x['_urgency'], reverse=True)
    return closing[:3]

def get_pending_matches(db, limit=5):
    """Returns next pending matches based on order (ID or Round)"""
    matches = db.get_matches()
    # Filter PENDING
    pending = [m for m in matches if m['status'] == 'PENDING']
    
    # Sort logic: Low Round first, then Low ID
    # Assuming match IDs are somewhat chronological or groups sorted.
    # Ideally should sort by Round -> ID
    # Note: ID is string, may need alphanumeric sort.
    # But usually user wants to see what's next regardless of group.
    
    # Helper for int ID
    def sort_key(m):
        try:
             # numeric part of id? 'm1' -> 1
             # If ID is UUID, this fails. But we use 'm1', 'm2'... in generator?
             # Actually generator uses uuid in some versions, but local db V2 used idx.
             # Let's check db sample. 
             # If logic.generate_schedule does NOT set ID, they might be random?
             # Assuming purely random, round is best bet.
             # If IDs are '1_1' (group_round)?
             return (m['round'], m['id'])
        except:
             return (99, 99)

    pending.sort(key=lambda x: (x.get('round', 99), len(x.get('id','')), x.get('id','')))
    return pending[:limit]

def init_knockout_draw(db):
    stats = calculate_standings(db)
    groups = db.get_groups()
    
    pot_1 = [] # 1st place
    pot_2 = [] # 2nd place
    
    for group in groups:
        # Get team stats for this group
        g_teams = []
        for tid in group['team_ids']:
            s = stats[tid]
            # Attach group info for display
            s['group'] = group['name']
            g_teams.append(s)
            
        # Sort by Pts desc, then Games desc
        g_teams.sort(key=lambda x: (x['Pts'], x['Games']), reverse=True)
        
        # Take Top 2
        if len(g_teams) >= 1:
            pot_1.append(g_teams[0])
        if len(g_teams) >= 2:
            pot_2.append(g_teams[1])
            
    # Save to DB state
    db.knockout_draw['is_active'] = True
    db.knockout_draw['current_round_name'] = "16강"
    db.knockout_draw['pot_1'] = pot_1 
    db.knockout_draw['pot_2'] = pot_2 
    db.knockout_draw['matches'] = []
    db.knockout_draw['current_drawer_idx'] = 0
    
    random.shuffle(db.knockout_draw['pot_1'])
    db.save_to_disk()

def perform_draw(db, picked_index):
    state = db.knockout_draw
    if state['current_drawer_idx'] >= len(state['pot_2']):
        return None
        
    drawer = state['pot_2'][state['current_drawer_idx']]
    target = state['pot_1'].pop(picked_index)
    
    match_info = {
        "round": state['current_round_name'],
        "home": drawer,  
        "away": target   
    }
    
    state['matches'].append(match_info)
    state['current_drawer_idx'] += 1
    
    db.save_to_disk()
    return match_info

def start_knockout_round(db):
    state = db.knockout_draw
    round_name = state['current_round_name']
    
    new_matches = []
    for i, m in enumerate(state['matches']):
        match_id = f"k_{round_name}_m{i+1}"
        new_matches.append({
            "id": match_id,
            "group_id": round_name, 
            "round": i + 1,    
            "team_a_id": m['home']['id'],
            "team_b_id": m['away']['id'],
            "score_a": 0, "score_b": 0, "point_a": 0, "point_b": 0,
            "status": "PENDING", "court_id": None, "winner_id": None, "is_draw": False
        })
        
    current_matches = db.get_matches()
    db.set_matches(current_matches + new_matches)
    
    # Archive current matches to history
    # note: These are the PLANNED pair matches (draw results), not the played match objects with scores.
    # We will reconstruct history from db.matches for bracket view usually.
    # But let's keep draw history
    if 'round_history' not in state: state['round_history'] = []
    state['round_history'].append({
        "name": round_name,
        "matches": state['matches']
    })
    
    # Reset Draw State
    state['is_active'] = False
    state['matches'] = []
    
    db.save_to_disk()
    assign_matches_to_courts(db)

def check_round_complete(db, round_name):
    # Check if all matches of this round are completed
    matches = db.get_matches()
    round_matches = [m for m in matches if m['group_id'] == round_name]
    if not round_matches: return False
    
    return all(m['status'] == 'COMPLETED' for m in round_matches)

def init_next_round_draw(db):
    # Determine next round
    state = db.knockout_draw
    last_round = state['round_history'][-1]['name']
    
    next_round_map = {"16강": "8강", "8강": "4강", "4강": "결승"}
    if last_round not in next_round_map: return # Finished
    
    next_name = next_round_map[last_round]
    
    # Get Winners from last round matches logic
    matches = db.get_matches()
    last_matches = [m for m in matches if m['group_id'] == last_round]
    
    winners_ids = [m['winner_id'] for m in last_matches if m['winner_id']]
    # We need team objects
    teams = db.get_teams()
    winners = []
    for wid in winners_ids:
        t = next(t for t in teams if t['id'] == wid)
        winners.append({'id': t['id'], 'name': t['name'], 'group': last_round}) # Group label is prev round
        
    # Split into Pot 1 and Pot 2 randomly for next draw?
    # User said: "Random draw among winners"
    # Usually we just shuffle all winners and take (0,1), (2,3)...
    # But to keep "Draw UI" (Pick a card), we can split them.
    # Random shuffle winners first.
    random.shuffle(winners)
    mid = len(winners) // 2
    pot_2 = winners[:mid] # Pickers
    pot_1 = winners[mid:] # Targets
    
    state['current_round_name'] = next_name
    state['pot_1'] = pot_1
    state['pot_2'] = pot_2
    state['matches'] = []
    state['current_drawer_idx'] = 0
    state['is_active'] = True
    
    db.save_to_disk()



def check_preliminaries_complete(db):
    matches = db.get_matches()
    # Preliminary matches have integer group_id
    prelims = [m for m in matches if isinstance(m['group_id'], int)]
    if not prelims: return False # Should not happen if initialized
    
    return all(m['status'] == 'COMPLETED' for m in prelims)
