import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from pymongo import MongoClient
import psycopg2
from contextlib import closing
from Endpoints.Unit1.portfolio import visualization

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
mongo_client = get_mongo_client()
mongo_db = mongo_client[str(os.getenv('MONGO_DB'))]

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
api = Api(app, prefix='/api')

# ===== Importar endpoints
from Endpoints.collections import MongoCollections
from Endpoints.tables import PostgresTables

class Info(Resource):
    def get(self):
        try:
            # Test MongoDB - Obtener colecciones
            mongo_collections = mongo_db.list_collection_names()
            mongo_status = "connected"
        except Exception as e:
            mongo_status = f"error: {str(e)}"
            mongo_collections = []

        try:
            # Test PostgreSQL - Obtener tablas
            with closing(get_postgres_connection()) as conn:
                with conn.cursor() as cursor:
                    # Obtener información de la base de datos
                    cursor.execute("SELECT version();")
                    postgres_version = cursor.fetchone()[0]
                    
                    # Obtener lista de tablas
                    cursor.execute("""
                        SELECT table_name 
                        FROM information_schema.tables 
                        WHERE table_schema = 'public'
                        ORDER BY table_name;
                    """)
                    postgres_tables = [row[0] for row in cursor.fetchall()]
                    
                    postgres_status = "connected"
        except Exception as e:
            postgres_status = f"error: {str(e)}"
            postgres_version = None
            postgres_tables = []

        return {
            "status": "healthy",
            "message": "Database API Service",
            "databases": {
                "mongodb": {
                    "status": mongo_status,
                    "collections": mongo_collections,
                    "collection_count": len(mongo_collections)
                },
                "postgresql": {
                    "status": postgres_status,
                    "version": postgres_version,
                    "tables": postgres_tables,
                    "table_count": len(postgres_tables)
                }
            }
        }, 200

# ===== Registrar endpoints
api.add_resource(Info,             '/info')
api.add_resource(MongoCollections, '/mongo')
api.add_resource(PostgresTables,   '/postgres')
api.add_resource(visualization, '/Unit1/portfolio')

if __name__ == '__main__':
    print("=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en POSTMAN:")
    print("• URL Base: http://127.0.0.1:503/api")

    print("====================================")
    app.run(debug=True, host='127.0.0.1', port=503)