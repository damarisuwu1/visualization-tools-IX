import traceback
from flask_restful import Resource
from flask import current_app, request
from contextlib import closing
import json

class PostgresTables(Resource):
    def __init__(self):
        self.get_connection = current_app.config["get_postgres_connection"]

    def get(self):
        try:
            # ===== Nombre de la tabla
            table_name = request.args.get("table")

            if not table_name:
                return {
                    "status": "error", 
                    "info": "Falta el parámetro '?table=' en el endpoint"
                }, 400

            # ===== Construir filtros WHERE
            where_conditions = []
            params = []
            limit = None
            offset = None
            
            for key, value in request.args.items():
                if key in ["table", "limit", "offset"]:
                    if key == "limit":
                        limit = int(value) if value.isdigit() else None
                    elif key == "offset":
                        offset = int(value) if value.isdigit() else None
                    continue
                else:
                    where_conditions.append(f"{key} = %s")
                    # Conversión básica de tipos
                    if value.lower() == "true":
                        params.append(True)
                    elif value.lower() == "false":
                        params.append(False)
                    elif value.isdigit():
                        params.append(int(value))
                    else:
                        params.append(value)

            # ===== Construir query
            base_query = f"SELECT * FROM {table_name}"
            
            if where_conditions:
                base_query += " WHERE " + " AND ".join(where_conditions)
            
            if limit:
                base_query += f" LIMIT {limit}"
            if offset:
                base_query += f" OFFSET {offset}"

            # ===== Ejecutar consulta
            with closing(self.get_connection()) as conn:
                with conn.cursor() as cursor:
                    cursor.execute(base_query, params)
                    columns = [desc[0] for desc in cursor.description]
                    rows = cursor.fetchall()
                    
                    # Convertir a diccionarios
                    results = []
                    for row in rows:
                        row_dict = {}
                        for i, value in enumerate(row):
                            # Manejar tipos especiales
                            if isinstance(value, (dict, list)):
                                row_dict[columns[i]] = json.dumps(value)
                            else:
                                row_dict[columns[i]] = value
                        results.append(row_dict)

            return {
                "status": "fetched",
                "database": "postgresql",
                "table": table_name,
                "count": len(results),
                "data": results
            }, 200

        except Exception as e:
            return {
                "status": "error",
                "info": traceback.format_exc().splitlines()
            }, 500

    def post(self):
        try:
            # ===== Data
            payload = request.json
            table_name = payload.get("table")
            data = payload.get("data")
        
            # ===== Validaciones
            if not table_name:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'table' en el payload"
                }, 400
            if not data or not isinstance(data, dict):
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'data' como objeto en el payload"
                }, 400
            
            # ===== Construir query INSERT
            columns = list(data.keys())
            values = list(data.values())
            placeholders = ", ".join(["%s"] * len(values))
            
            insert_query = f"""
                INSERT INTO {table_name} ({", ".join(columns)}) 
                VALUES ({placeholders}) 
                RETURNING *
            """
            
            # ===== Ejecutar consulta
            with closing(self.get_connection()) as conn:
                with conn.cursor() as cursor:
                    cursor.execute(insert_query, values)
                    inserted_row = cursor.fetchone()
                    column_names = [desc[0] for desc in cursor.description]
                    
                    # Convertir a diccionario
                    result_dict = {}
                    if inserted_row:
                        for i, value in enumerate(inserted_row):
                            result_dict[column_names[i]] = value
                    
                conn.commit()
            
            return {
                "status": "created",
                "database": "postgresql",
                "table": table_name,
                "info": f"Registro insertado en la tabla '{table_name}'",
                "data": result_dict
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
            table_name = payload.get("table")
            filters = payload.get("filters", {})
            data = payload.get("data")

            # ===== Validaciones
            if not table_name:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'table' en el payload"
                }, 400

            if not filters:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentren 'filters' en el payload para identificar registros"
                }, 400

            if not data or not isinstance(data, dict):
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'data' como objeto en el payload"
                }, 400

            # ===== Construir query UPDATE
            set_clauses = []
            where_clauses = []
            params = []
            
            # Campos a actualizar
            for key, value in data.items():
                set_clauses.append(f"{key} = %s")
                params.append(value)
            
            # Condiciones WHERE
            for key, value in filters.items():
                where_clauses.append(f"{key} = %s")
                params.append(value)
            
            update_query = f"""
                UPDATE {table_name} 
                SET {", ".join(set_clauses)} 
                WHERE {" AND ".join(where_clauses)}
            """
            
            # ===== Ejecutar consulta
            with closing(self.get_connection()) as conn:
                with conn.cursor() as cursor:
                    cursor.execute(update_query, params)
                    affected_rows = cursor.rowcount
                conn.commit()
            
            if affected_rows == 0:
                return {
                    "status": "error",
                    "info": "No se encontraron registros que coincidan con los filtros"
                }, 404
            
            return {
                "status": "updated", 
                "database": "postgresql",
                "table": table_name,
                "info": f"Se actualizaron {affected_rows} registros",
                "affected_rows": affected_rows
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
            table_name = payload.get("table")
            filters = payload.get("filters")

            # ===== Validaciones
            if not table_name:
                return {
                    "status": "error", 
                    "info": "Valida que se encuentre 'table' en el payload"
                }, 400

            # ===== Eliminar toda la tabla si no hay filtros
            if not filters:
                delete_query = f"DELETE FROM {table_name}"
                params = []
            else:
                # ===== Eliminar registros específicos
                where_clauses = []
                params = []
                
                for key, value in filters.items():
                    where_clauses.append(f"{key} = %s")
                    params.append(value)
                
                delete_query = f"DELETE FROM {table_name} WHERE {' AND '.join(where_clauses)}"

            # ===== Ejecutar consulta
            with closing(self.get_connection()) as conn:
                with conn.cursor() as cursor:
                    cursor.execute(delete_query, params)
                    affected_rows = cursor.rowcount
                conn.commit()
            
            if affected_rows == 0:
                return {
                    "status": "error",
                    "info": "No se encontraron registros para eliminar"
                }, 404

            return {
                "status": "deleted",
                "database": "postgresql",
                "table": table_name,
                "info": f"Se eliminaron {affected_rows} registros",
                "deleted_count": affected_rows
            }, 200

        # ===== Manejo de errores
        except Exception:
            return {
                "status": "error", 
                "info": traceback.format_exc().splitlines()
            }, 500