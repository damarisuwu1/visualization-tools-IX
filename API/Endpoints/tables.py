import traceback
from flask_restful import Resource
from flask import current_app, request
from contextlib import closing
import json
from datetime import datetime

class PostgresTables(Resource):
    def __init__(self):
        self.get_connection = current_app.config["get_postgres_connection"]

    def _serialize_value(self, value):
        """Convierte valores no serializables a formatos compatibles con JSON"""
        if isinstance(value, datetime):
            return value.isoformat()
        elif isinstance(value, (dict, list)):
            return value  # Ya se manejará con json.dumps
        else:
            return value

    def _serialize_row(self, row, columns):
        """Convierte una fila de la base de datos a un diccionario serializable"""
        row_dict = {}
        for i, value in enumerate(row):
            serialized_value = self._serialize_value(value)
            # Manejar tipos especiales
            if isinstance(serialized_value, (dict, list)):
                row_dict[columns[i]] = json.dumps(serialized_value)
            else:
                row_dict[columns[i]] = serialized_value
        return row_dict

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
                    
                    # Convertir a diccionarios serializables
                    results = []
                    for row in rows:
                        results.append(self._serialize_row(row, columns))

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
            
            with closing(self.get_connection()) as conn:
                with conn.cursor() as cursor:
                    # ===== Verificar si la tabla existe
                    cursor.execute("""
                        SELECT EXISTS (
                            SELECT FROM information_schema.tables 
                            WHERE table_schema = 'public' 
                            AND table_name = %s
                        );
                    """, (table_name,))
                    table_exists = cursor.fetchone()[0]
                    
                    # ===== Si la tabla no existe, crearla
                    if not table_exists:
                        # Determinar tipos de datos para cada columna
                        column_definitions = []
                        for key, value in data.items():
                            if isinstance(value, bool):
                                column_type = "BOOLEAN"
                            elif isinstance(value, int):
                                column_type = "INTEGER"
                            elif isinstance(value, float):
                                column_type = "REAL"
                            elif isinstance(value, (dict, list)):
                                column_type = "JSONB"
                            else:
                                column_type = "TEXT"
                            
                            column_definitions.append(f"{key} {column_type}")
                        
                        # Crear la tabla con un ID serial como clave primaria
                        create_table_query = f"""
                            CREATE TABLE {table_name} (
                                id SERIAL PRIMARY KEY,
                                {', '.join(column_definitions)},
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            );
                        """
                        cursor.execute(create_table_query)
                        
                        # Crear trigger para actualizar updated_at automáticamente
                        cursor.execute(f"""
                            CREATE OR REPLACE FUNCTION update_updated_at_column()
                            RETURNS TRIGGER AS $$
                            BEGIN
                                NEW.updated_at = CURRENT_TIMESTAMP;
                                RETURN NEW;
                            END;
                            $$ language 'plpgsql';
                        """)
                        
                        cursor.execute(f"""
                            CREATE TRIGGER update_{table_name}_updated_at
                                BEFORE UPDATE ON {table_name}
                                FOR EACH ROW
                                EXECUTE FUNCTION update_updated_at_column();
                        """)
                    
                    # ===== Construir query INSERT
                    columns = list(data.keys())
                    values = list(data.values())
                    placeholders = ", ".join(["%s"] * len(values))
                    
                    insert_query = f"""
                        INSERT INTO {table_name} ({", ".join(columns)}) 
                        VALUES ({placeholders}) 
                        RETURNING *
                    """
                    
                    # ===== Ejecutar inserción
                    cursor.execute(insert_query, values)
                    inserted_row = cursor.fetchone()
                    column_names = [desc[0] for desc in cursor.description]
                    
                    # Convertir a diccionario serializable
                    result_dict = {}
                    if inserted_row:
                        for i, value in enumerate(inserted_row):
                            result_dict[column_names[i]] = self._serialize_value(value)
                
                conn.commit()
            
            action = "created_table_and_inserted" if not table_exists else "inserted"
            
            return {
                "status": "success",
                "database": "postgresql",
                "table": table_name,
                "action": action,
                "info": f"Tabla '{table_name}' {'creada e ' if not table_exists else ''}registro insertado",
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