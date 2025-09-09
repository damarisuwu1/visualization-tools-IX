import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from pymongo import MongoClient
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import closing

# ===== Cargar variables de entorno
load_dotenv()

# ===== Configuración de conexiones
# MongoDB
mongo_client = MongoClient(os.getenv("MONGO_URL"))
mongo_db = mongo_client[str(os.getenv('MONGO_DB'))]

# PostgreSQL
def get_postgres_connection():
    return psycopg2.connect(
        host=os.getenv('POSTGRES_HOST'),
        port=os.getenv('POSTGRES_PORT'),
        database=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD')
    )

# ===== Configuraciones del app
app = Flask(__name__)
app.config['mongo_db'] = mongo_db
app.config['get_postgres_connection'] = get_postgres_connection
CORS(app)

# ===== API Configuration
api = Api(app, prefix='/api-db')

# ===== Importar endpoints
from .EndpointsMongo.collections import MongoCollections
from .EndpointsPostgres.tables import PostgresTables

class HealthCheck(Resource):
    def get(self):
        try:
            # Test MongoDB
            mongo_collections = mongo_db.list_collection_names()
            mongo_status = "connected"
        except Exception as e:
            mongo_status = f"error: {str(e)}"
            mongo_collections = []

        try:
            # Test PostgreSQL
            with closing(get_postgres_connection()) as conn:
                with conn.cursor() as cursor:
                    cursor.execute("SELECT version();")
                    postgres_version = cursor.fetchone()[0]
                    postgres_status = "connected"
        except Exception as e:
            postgres_status = f"error: {str(e)}"
            postgres_version = None

        return {
            "status": "healthy",
            "message": "Database API Service",
            "databases": {
                "mongodb": {
                    "status": mongo_status,
                    "collections": mongo_collections
                },
                "postgresql": {
                    "status": postgres_status,
                    "version": postgres_version
                }
            }
        }, 200

# ===== Registrar endpoints
api.add_resource(HealthCheck, '/health')
api.add_resource(MongoCollections, '/mongo')
api.add_resource(PostgresTables, '/postgres')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=10000)

