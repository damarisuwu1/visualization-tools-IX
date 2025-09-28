from flask_restful import Resource
from flask import current_app
from contextlib import closing
from pymongo import MongoClient

class Info(Resource):
    def __init__(self):
        self.db: MongoClient = current_app.config["mongo_db"]
        self.get_connection = current_app.config["get_postgres_connection"]

    def get(self):
        try:
            # Test MongoDB - Obtener colecciones
            mongo_collections = self.db.list_collection_names()
            mongo_status = "connected"
        except Exception as e:
            mongo_status = f"error: {str(e)}"
            mongo_collections = []

        try:
            # Test PostgreSQL - Obtener tablas
            with closing(self.get_connection()) as conn:
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