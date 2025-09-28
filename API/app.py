import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from pymongo import MongoClient
import psycopg2

# ===== Cargar variables de entorno
load_dotenv()

# ===== Configuración de conexiones
def get_mongo_client():
    return MongoClient(
        os.getenv("MONGO_URL"),
        username=os.getenv("MONGO_USER"),
        password=os.getenv("MONGO_PASSWORD"),
        authSource=os.getenv("MONGO_DB")
    )

def get_postgres_connection():
    return psycopg2.connect(
        host=os.getenv('POSTGRES_HOST'),
        port=os.getenv('POSTGRES_PORT'),
        database=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD')
    )

mongo_client = get_mongo_client()
mongo_db = mongo_client[str(os.getenv('MONGO_DB'))]


# ===== API Configuration
app = Flask(__name__)
app.config['mongo_db'] = mongo_db
app.config['get_postgres_connection'] = get_postgres_connection
CORS(app)
api = Api(app, prefix='/api') # dev
# api = Api(app) # main


# ===== Registrar endpoints
# === Generales
from Endpoints.Utils.collections import MongoCollections
from Endpoints.Utils.tables import PostgresTables
from Endpoints.Utils.info import Info

api.add_resource(Info,             '/info')
api.add_resource(MongoCollections, '/mongo')
api.add_resource(PostgresTables,   '/postgres')

# === Unidad 1
from Endpoints.Unit1.portfolio import Portfolio_1
from Endpoints.Unit1.proyecto import Proyecto_1

api.add_resource(Portfolio_1,    '/unit-1/portfolio')
api.add_resource(Proyecto_1,    '/unit-1/project')

# === Unidad 2
from Endpoints.Unit2.portfolio import Portfolio_2
from Endpoints.Unit2.proyecto import Proyecto_2

api.add_resource(Portfolio_2,    '/unit-2/portfolio')
api.add_resource(Proyecto_2,    '/unit-2/project')

# === Unidad 3
from Endpoints.Unit3.portfolio import Portfolio_3
from Endpoints.Unit3.proyecto import Proyecto_3

api.add_resource(Portfolio_3,    '/unit-3/portfolio')
api.add_resource(Proyecto_3,    '/unit-3/project')


if __name__ == '__main__':
    print("=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en POSTMAN:")
    print("• URL Base: http://127.0.0.1:503/api")

    print("====================================")
    app.run(debug=True, host='127.0.0.1', port=503)