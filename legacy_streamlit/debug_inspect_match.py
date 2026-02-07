from supabase import create_client
import json

url = "https://nszqhhyhouelizhyxuid.supabase.co"
key = "sb_publishable_qJovV-jC09oa6Wg_78qEXQ_9PxX-y8H" 
client = create_client(url, key)

print("Fetching g1_m1...")
res = client.table('matches').select('*').eq('id', 'g1_m1').execute()
if res.data:
    m = res.data[0]
    print(f"Match: {m}")
    print(f"Group ID: {m.get('group_id')} (Type: {type(m.get('group_id'))})")
    print(f"Status: {m.get('status')}")
    print(f"Scores: {m.get('score_a')} - {m.get('score_b')}")
    print(f"Points: {m.get('point_a')} - {m.get('point_b')}")
    print(f"Is Tie Break: {m.get('is_tie_break')}")
    print(f"Court ID: {m.get('court_id')}")
else:
    print("Match g1_m1 not found.")
