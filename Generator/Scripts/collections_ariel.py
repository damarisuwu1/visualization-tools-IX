from pymongo import MongoClient
from pymongo.server_api import ServerApi
import time
from config import CONNECTION_MONGO
from generate import MockData

def connect_database(cluster: str = 'VMI'):
    client = MongoClient(CONNECTION_MONGO, server_api =ServerApi('1'))
    return client[cluster]

def send_data(cluster: str = 'VMI', collection: str = 'content'):
    """
    Sends data to the MongoDB specified cluster.
    ## **Parameters**
    - ``cluster (str)``: name of the database cluster. Default "VMI"
    - ``content (str)``: name of the collection in the cluster. Default "content". If you pass the name of a collection that does not exist, it will be created and the data will be sent to it.
    ## **Returns**
    Cursor object (Logical position of the record in the MongoDB collection)
    """
    cluster_instance = connect_database(cluster)
    collection_instance = cluster_instance[collection]

    current_time = time.time()
    
    while time.time() <= (current_time + 10):
        data = MockData.create_json()
        collection_instance.insert_one(data)
        time.sleep(2)
    
    payload = collection_instance.find()
    return payload


if __name__ == '__main__':
    response = send_data()
    print(response)