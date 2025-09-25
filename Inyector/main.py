import os, requests, pandas as pd, json
from dotenv import load_dotenv
import time

# =============== Carga de contenido
load_dotenv()
URL_API = os.getenv('URL_API')
with open('./data/content.json','r') as file: content_json = json.load(file)
content = content_json.items()

# ---------------- PROCESAMIENTO DE DOCUMENTOS --------------------- # 

# =============== Procesamiento de JSON --> MONGO
def json_processed(id_prefix: str = "M"):
    """
    - ```id_prefix```: Find the character that distinguish the _id key. Possible values: ```"M"``` (for movies), ```"S"``` (for series).
    """
    values = []
    for key, documents in content:
        for docs in documents:
            collection = key
            data = docs
            if id_prefix in data["_id"]:
                values.append(data)
                payload ={
                'collection': collection,
                'data': values
                }
    
    response = requests.post(
                f"{URL_API}/api/mongo",
                json=payload)
    return response


# =============== Procesamiento de CSVs --> POSTGRESQL

def transform_csv(file_path: str, users: bool = True):
    """
    Converts the CSV format into JSON-like to send it as an API payload. The function creates a list with JSON items, each item has keys based on the CSV column names and each key has a single value from the data related to their respective column.
    ## **Parameters**
    - ```file_path```: Path to the file that will be processed.
    - ```users```: Determine whether the file is for the table "users", otherwise, the table will be "viewing_sessions".

    ## **Returns**
    A dictionary with the table name and its data:\n
    {'table': 'table_name',\n
    'data': [\n
        \n{
        'column1': 'value',\n
        'column2': 'value',
        ...
        },\n
        {
        'column1': 'value',
        'column2': 'value',
        ...
        }, ...\n
    ]
    """

    df = pd.read_csv(file_path)
    if users == True:
        table_name = 'users'
    else:
        table_name = 'viewing_sessions'
    df.to_json(path_or_buf=f"./data/{table_name}_processed.json", orient='records')
    #Giving a few seconds to process and save the file.
    time.sleep(6)
    with open(f"./data/{table_name}_processed.json", "r") as json_raw:
        content_processed = json.load(json_raw)
    payload = requests.post(
        f'{URL_API}/api/postgres', 
        json= {
        'table': table_name,
        'data': content_processed
        })
    return payload

if __name__ == '__main__':
    json_processed(id_prefix="M") # Creates collection "movies" and inserts data
    json_processed(id_prefix="S") # Creates collection "series" and inserts data
    transform_csv('./data/users.csv', True) # Creates table "users" and inserts data
    transform_csv('./data/viewing_sessions.csv', False) # Creates table "viewing_sessions" and inserts data