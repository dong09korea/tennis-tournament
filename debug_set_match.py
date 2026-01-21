from supabase import create_client
import json

url = "https://nszqhhyhouelizhyxuid.supabase.co"
key = "sb_publishable_qJovV-jC09oa6Wg_78qEXQ_9PxX-y8H" 
client = create_client(url, key)

# Get Team IDs for Team 1 and Team 13 (Assuming "t1" and "t13")
# Find match
print("Finding match...")
res = client.table('matches').select('*').or_('team_a_id.eq.t1,team_b_id.eq.t1').execute()
target_match = None
for m in res.data:
    if (m['team_a_id'] == 't1' and m['team_b_id'] == 't13') or \
       (m['team_a_id'] == 't13' and m['team_b_id'] == 't1'):
       target_match = m
       break

if target_match:
    print(f"Match Found: {target_match['id']}")
    # Set to 4:5, 40-40 (3:3 points)
    # Team B (t13) is leading 5-4.
    update_data = {
        "score_a": 4,
        "score_b": 5,
        "point_a": 3,
        "point_b": 3,
        "status": "LIVE",
        # Ensure it's on court 1 if not already
        "court_id": 1 
    }
    client.table('matches').update(update_data).eq('id', target_match['id']).execute()
    print("Match updated to 4:5, 40-40.")
else:
    print("Match t1 vs t13 not found.")
