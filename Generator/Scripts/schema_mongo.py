from pymongo import MongoClient
from pymongo.server_api import ServerApi
from config import CONNECTION_MONGO
from generate import MockData

def connect_database():
    client = MongoClient(CONNECTION_MONGO, server_api =ServerApi('1'))
    return client['VMI']

if __name__ == '__main__':
    dbname = connect_database()
    test_collection = dbname["users_test"]
    test_item = {
  "_id" : "U1IT00001",
  "item_name" : "Blender",
  "max_discount" : "10%",
  "batch_number" : "RR450020FRG",
  "price" : 340,
  "category" : "kitchen appliance"
}
    test_collection.insert_one(test_item)
    retrieval = test_collection.find()
    print(retrieval)