import traceback
from flask_restful import Resource
from flask import current_app
from contextlib import closing
from pymongo import MongoClient

class Proyecto_3(Resource):
    def __init__(self):
        self.db: MongoClient = current_app.config["mongo_db"]
        self.get_connection = current_app.config["get_postgres_connection"]

    def get(self):
        '''
        '''

        try:
            return {"status":"success","info":"Endpoint sigue en construccion"}, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500