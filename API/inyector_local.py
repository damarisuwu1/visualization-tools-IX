import os, pandas as pd, requests, json
from dotenv import load_dotenv
load_dotenv()

location_path = os.path.dirname(os.path.dirname(__file__))
BASE_URL = os.getenv('URL_API')

# ===== Content
content_path = os.path.join(location_path,'Inyector','Files','data','content.json')
with open(content_path,'r') as file: content_file = json.load(file)

# === Movies
movies = content_file['movies'][:500]
response = requests.post(
    f"{BASE_URL}/api/mongo",
    json = {
        "collection":"movies",
        "data":movies
    },
    verify=False,
    headers={"Content-Type": "application/json; charset=utf-8"}
)
print('Ya se subio la información de movies')

# === Series
series = content_file['series'][:500]
response = requests.post(
    f"{BASE_URL}/api/mongo",
    json = {
        "collection":"series",
        "data":series
    },
    verify=False,
    headers={"Content-Type": "application/json; charset=utf-8"}
)
print('Ya se subio la información de series')

# ===== Users
users_path = os.path.join(location_path,'Inyector','Files','data','users.csv')
users_df = pd.read_csv(users_path)
users = json.loads(users_df.to_json(orient='records'))[:500]
response = requests.post(
    f"{BASE_URL}/api/postgres",
    json = {
        "table":"users",
        "data":users
    },
    verify=False,
    headers={"Content-Type": "application/json; charset=utf-8"}
)
print('Ya se subio la información de users')

# ===== Viewing Sessions
users_path = os.path.join(location_path,'Inyector','Files','data','viewing_sessions.csv')
users_df = pd.read_csv(users_path)
users = json.loads(users_df.to_json(orient='records'))[:500]
response = requests.post(
    f"{BASE_URL}/api/postgres",
    json = {
        "table":"viewing_sessions",
        "data":users
    },
    verify=False,
    headers={"Content-Type": "application/json; charset=utf-8"}
)
print('Ya se subio la información de viewing_sessions')