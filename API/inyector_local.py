import os, sys, pandas as pd, requests, json
from dotenv import load_dotenv
load_dotenv()

location_path = os.path.dirname(os.path.dirname(__file__))
BASE_URL = os.getenv('URL_API')
args = sys.argv

if '--portfolio' in args:
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
    data = json.loads(users_df.to_json(orient='records'))[:500]
    response = requests.post(
        f"{BASE_URL}/api/postgres",
        json = {
            "table":"users",
            "data":data
        },
        verify=False,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    print('Ya se subio la información de users')

    # ===== Viewing Sessions
    users_path = os.path.join(location_path,'Inyector','Files','data','viewing_sessions.csv')
    users_df = pd.read_csv(users_path)
    data = json.loads(users_df.to_json(orient='records'))[:500]
    response = requests.post(
        f"{BASE_URL}/api/postgres",
        json = {
            "table":"viewing_sessions",
            "data":data
        },
        verify=False,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    print('Ya se subio la información de viewing_sessions')

elif '--project' in args:
    tech = pd.read_csv('./tech_salaries.csv')
    tech.drop('id',axis = 1,inplace=True)

    data = json.loads(tech.to_json(orient='records'))[:500]
    print(data[0])

    response = requests.post(
        f"{BASE_URL}/api/postgres",
        json = {
            "table":"tech_salaries",
            "data":data
        },
        # verify=False,
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    response.raise_for_status()
    response = response.json()

    print(f'Ya se subio la información de tech_salaries: {response}')
