import traceback
from flask_restful import Resource
from flask import current_app, request
from pymongo import MongoClient
from bson import ObjectId

class MongoCollections(Resource):
    def __init__(self):
        self.db: MongoClient = current_app.config["mongo_db"]

    def get(self):
        try:
            # ===== Nombre de la colección
            collection_name = request.args.get("collection")

            if not collection_name:
                return {
                    "status": "error", 
                    "info": "Falta el parámetro '?collection=' en el endpoint"
                }, 400

            # ===== Construir filtros
            query_filters = {}
            limit = None
            skip = None
            
            for key, value in request.args.items():
                if key in ["collection", "limit", "skip"]:
                    if key == "limit":
                        limit = int(value) if value.isdigit() else None
                    elif key == "skip":
                        skip = int(value) if value.isdigit() else None
                    continue
                elif key == "id":
                    try:
                        query_filters["_id"] = ObjectId(value)
                    except Exception as ex:
                        return {
                            "status": "error", 
                            "info": "El id proporcionado no es válido",
                            "error": f"{ex}"
                        }, 400
                else:
                    # Conversión básica de tipos
                    if value.lower() == "true":
                        query_filters[key] = True
                    elif value.lower() == "false":
                        query_filters[key] = False
                    elif value.isdigit():
                        query_filters[key] = int(value)
                    else:
                        query_filters[key] = value

            # ===== Ejecutar consulta
            collection = self.db[collection_name]
            cursor = collection.find(query_filters)
            
            if skip:
                cursor = cursor.skip(skip)
            if limit:
                cursor = cursor.limit(limit)
                
            documents = list(cursor)

            # Convertir ObjectId a string
            for doc in documents:
                doc["_id"] = str(doc["_id"])

            return {
                "status": "fetched",
                "database": "mongodb", 
                "collection": collection_name,
                "count": len(documents),
                "data": documents
            }, 200

        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500
    
    def post(self):
        try:
            # ===== Data
            payload = request.json
            collection_name = payload.get("collection")
            documento = payload.get("data")
        
            # ===== Validaciones
            if not collection_name:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'collection' en el payload"
                }, 400
            if not documento:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'data' en el payload"
                }, 400
            
            # ===== Consulta en BD
            result = self.db[collection_name].insert_one(documento)
            
            # ===== Confirmación
            return {
                "status": "created",
                "database": "mongodb",
                "collection": collection_name,
                "info": f"Documento insertado en la colección '{collection_name}'",
                "inserted_id": str(result.inserted_id)
            }, 201
        
        # ===== Manejo de errores
        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500

    def patch(self):
        try:
            # ===== Data
            payload = request.json
            collection_name = payload.get("collection")
            doc_id = payload.get("id")
            update_data = payload.get("data")

            # ===== Validaciones
            if not collection_name:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'collection' en el payload"
                }, 400

            if not doc_id:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'id' en el payload"
                }, 400

            if not update_data:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'data' en el payload"
                }, 400

            # ===== Consulta en BD
            result = self.db[collection_name].update_one(
                {"_id": ObjectId(doc_id)},
                {"$set": update_data}
            )
            
            if result.matched_count == 0:
                return {
                    "status": "error",
                    "info": "No se encontró el documento con el id especificado"
                }, 404
            
            # ===== Confirmación
            return {
                "status": "updated", 
                "database": "mongodb",
                "collection": collection_name,
                "info": f"Se actualizó el documento con id {doc_id}",
                "matched_count": result.matched_count,
                "modified_count": result.modified_count
            }, 200
        
        # ===== Manejo de errores
        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500

    def delete(self):
        try:
            # ===== Data
            payload = request.json
            doc_id = payload.get("id")
            collection_name = payload.get("collection")

            # ===== Validaciones
            if not collection_name:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'collection' en el payload"
                }, 400

            collection = self.db[collection_name]

            # ===== Eliminar toda la colección si no hay ID
            if not doc_id:
                result = collection.delete_many({})
                return {
                    "status": "deleted_all",
                    "database": "mongodb",
                    "collection": collection_name,
                    "info": f"Se eliminaron {result.deleted_count} documentos"
                }, 200

            # ===== Eliminar un solo documento por ID
            result = collection.delete_one({"_id": ObjectId(doc_id)})
            
            if result.deleted_count == 0:
                return {
                    "status": "error",
                    "info": "No se encontró el documento con el id especificado"
                }, 404

            # ===== Confirmación de eliminación individual
            return {
                "status": "deleted",
                "database": "mongodb",
                "collection": collection_name,
                "info": f"Se eliminó el documento con id {doc_id}"
            }, 200

        # ===== Manejo de errores
        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500