import traceback
from flask_restful import Resource
from flask import current_app, request
from pymongo import MongoClient
from bson import ObjectId
from werkzeug.datastructures import ImmutableMultiDict

class MongoCollections(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.db:MongoClient = current_app.config["mongo_db"]

    # =============== METODOS PRIVADOS ===============
    def __create_args_from_params(self, collection_name, filters=None, limit=None, skip=None):
        """
        Crea un ImmutableMultiDict desde parámetros de función
        
        Args:
            collection_name (str): Nombre de la colección
            filters (dict): Filtros donde las claves pueden tener listas como valores
            limit (int): Límite de documentos
            skip (int): Documentos a saltar
        """
        args_list = [('collection', collection_name)]
        
        if filters:
            for key, value in filters.items():
                if isinstance(value, list):
                    # Múltiples valores para la misma clave
                    for v in value:
                        args_list.append((key, str(v)))
                else:
                    # Un solo valor
                    args_list.append((key, str(value)))
        
        if limit:
            args_list.append(('limit', str(limit)))
        if skip:
            args_list.append(('skip', str(skip)))
        
        return ImmutableMultiDict(args_list)

    def __parse_args(self, args_source):
        """
        Parsea argumentos desde request.args o desde ImmutableMultiDict
        
        Args:
            args_source: request.args o ImmutableMultiDict
        """
        # ===== Nombre de la colección
        collection_name = args_source.get("collection")

        if not collection_name:
            return None, {
                "status": "error", 
                "info": "Falta el parámetro 'collection' en la consulta"
            }, 400

        # ===== Construir filtros
        query_filters = {}
        limit = None
        skip = None
        
        # Obtener todos los argumentos únicos (sin duplicados de keys)
        processed_keys = set()
        
        for key in args_source.keys():
            if key in processed_keys:
                continue
                
            processed_keys.add(key)
            
            if key in ["collection", "limit", "skip"]:
                if key == "limit":
                    limit_value = args_source.get("limit")
                    limit = int(limit_value) if limit_value and limit_value.isdigit() else None
                elif key == "skip":
                    skip_value = args_source.get("skip")
                    skip = int(skip_value) if skip_value and skip_value.isdigit() else None
                continue
            
            # Obtener todos los valores para esta clave
            values = args_source.getlist(key)
            
            if key == "_id" or key == "id":
                # Manejo especial para IDs de MongoDB
                try:
                    if len(values) == 1:
                        # Un solo ID
                        query_filters["_id"] = ObjectId(values[0])
                    else:
                        # Múltiples IDs - usar operador $in
                        object_ids = [ObjectId(value) for value in values]
                        query_filters["_id"] = {"$in": object_ids}
                except Exception as ex:
                    return None, {
                        "status": "error", 
                        "info": f"Uno o más IDs proporcionados no son válidos: {values}",
                        "error": f"{ex}"
                    }, 400
            else:
                # Para otros campos
                if len(values) == 1:
                    # Un solo valor - conversión de tipo básica
                    value = values[0]
                    if value.lower() == "true":
                        query_filters[key] = True
                    elif value.lower() == "false":
                        query_filters[key] = False
                    elif value.isdigit():
                        query_filters[key] = int(value)
                    else:
                        query_filters[key] = value
                else:
                    # Múltiples valores - usar operador $in con conversión de tipos
                    converted_values = []
                    for value in values:
                        if value.lower() == "true":
                            converted_values.append(True)
                        elif value.lower() == "false":
                            converted_values.append(False)
                        elif value.isdigit():
                            converted_values.append(int(value))
                        else:
                            converted_values.append(value)
                    query_filters[key] = {"$in": converted_values}

        return (collection_name, query_filters, limit, skip), None, 200

    def __execute_query(self, collection_name, query_filters, limit, skip):
        """
        Ejecuta la consulta en MongoDB
        """
        try:
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
                "collection": collection_name,
                "count": len(documents),
                "data": documents
            }, 200

        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500

    def __query_collection(self, collection_name, filters=None, limit=None, skip=None):
        """
        Método para consultar colecciones directamente desde código
        
        Args:
            collection_name (str): Nombre de la colección
            filters (dict): Filtros, ej: {'status': 'active', 'type': ['A', 'B']}
            limit (int): Límite de documentos
            skip (int): Documentos a saltar
        
        Returns:
            tuple: (response_data, status_code)
        """
        # Crear args simulados
        mock_args = self.__create_args_from_params(collection_name, filters, limit, skip)
        
        # Parsear argumentos
        parsed_data, error_response, status_code = self.__parse_args(mock_args)
        
        if error_response:
            return error_response, status_code
        
        collection_name, query_filters, limit, skip = parsed_data
        
        # Ejecutar consulta
        return self.__execute_query(collection_name, query_filters, limit, skip)

    
    
    # =============== METODOS HTTP ===============
    def get(self, collection_name=None, filters=None, limit=None, skip=None):
        """
        Endpoint HTTP o método directo
        
        Si se llama como endpoint HTTP: usa request.args
        Si se pasan parámetros: los usa directamente
        """
        if collection_name:
            # Llamada directa con parámetros
            return self.__query_collection(collection_name, filters, limit, skip)
        else:
            # Llamada como endpoint HTTP
            parsed_data, error_response, status_code = self.__parse_args(request.args)
            
            if error_response:
                return error_response, status_code
            
            collection_name, query_filters, limit, skip = parsed_data
            
            # Ejecutar consulta
            return self.__execute_query(collection_name, query_filters, limit, skip)
    
    def post(self):
        try:
            # ===== Data
            payload = request.json
            collection_name = payload.get("collection")
            data = payload.get("data")
        
            # ===== Validaciones
            if not collection_name:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'collection' en el payload"
                }, 400
            
            if not data:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'data' en el payload"
                }, 400
            
            # ===== Normalizar data a lista de documentos
            if isinstance(data, dict):
                # Si es un solo documento, usar insert_one
                result = self.db[collection_name].insert_one(data)
                
                return {
                    "status": "created",
                    "database": "mongodb",
                    "collection": collection_name,
                    "action": "inserted",
                    "info": f"Documento insertado en la colección '{collection_name}'",
                    "data": {
                        "inserted_id": str(result.inserted_id)
                    }
                }, 201
                
            elif isinstance(data, list):
                # Si es una lista, validar que todos sean diccionarios/documentos
                if not data:
                    return {
                        "status": "error",
                        "info": "La lista 'data' no puede estar vacía"
                    }, 400
                    
                if not all(isinstance(item, dict) for item in data):
                    return {
                        "status": "error",
                        "info": "Todos los elementos en 'data' deben ser documentos/diccionarios"
                    }, 400
                
                # Usar insert_many para múltiples documentos
                result = self.db[collection_name].insert_many(data)
                
                return {
                    "status": "created",
                    "database": "mongodb", 
                    "collection": collection_name,
                    "action": "inserted",
                    "info": f"{len(result.inserted_ids)} documentos insertados en la colección '{collection_name}'",
                    "count": len(result.inserted_ids),
                    "data": {
                        "inserted_ids": [str(id) for id in result.inserted_ids]
                    }
                }, 201
            else:
                return {
                    "status": "error",
                    "info": "Valida que 'data' sea un documento o una lista de documentos"
                }, 400
        
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
                
                "collection": collection_name,
                "info": f"Se eliminó el documento con id {doc_id}"
            }, 200

        # ===== Manejo de errores
        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500