import os, requests, pandas as pd, json
from dotenv import load_dotenv

# =============== Carga de contenido
load_dotenv()
URL_API = os.getenv('URL_API')
with open('./data/content.json','r') as file: content_json = json.load(file)
content = content_json.items()
users_df = pd.read_csv('./data/users.csv')
viewing_df = pd.read_csv('./data/viewing.csv')

# ---------------- PROCESAMIENTO DE DOCUMENTOS --------------------- # 

# =============== Procesamiento de JSON --> MONGO
def json_processed():
    for key, documents in content:
        for docs in documents:
            collection = key
            data = docs
            response = requests.post(
                f"{URL_API}/api/mongo",
                json={
                    "collection": collection,
                    "data": data
                }
            )
    return response

# =============== Procesamiento de CSVs --> POSTGRESQL

def transform_csv(file_path: str, users: bool = True):
    """
    Converts the CSV format into JSON-like to send it as an API payload. The function creates keys based on the CSV column names. It also creates the values as arrays from the data related to each column.
    ## **Parameters**
    - ```file_path```: Path to the file that will be processed.
    - ```users```: Determine whether the file is for the table users. Otherwise, the table will be viewing_sessions.

    ## **Returns**
    A dictionary with the table name and its data:\n
    {'table': 'table_name',\n
    'data': {\n
        'column1': ['value1', 'value2', 'value3', ...],
        ...
        }\n
    }
    """

    df = pd.read_csv(file_path)
    df_columns = df.columns.to_list()
    data= {}
    for column in df_columns:
        items = []
        column_items = users_df[column].to_list()
        for item in column_items:
            tupple_item = (item,)
            items.append(tupple_item)
        data[column] = items
    if users == True:
        table_name = 'users'
    else:
        table_name = 'viewing_sessions'
    
    payload = requests.post(
        f'{URL_API}/api/postgres', 
        json= {
        'table': table_name,
        'data': data
        })
    return payload

if __name__ == '__main__':
    json_processed()
    transform_csv('./data/users.csv', True)
    transform_csv('./data/viewing_sessions.csv', False)