import traceback, json
from flask import current_app, request
from flask_restful import Resource
from contextlib import closing
from datetime import datetime
from werkzeug.datastructures import ImmutableMultiDict

class PostgresTables(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.get_connection = current_app.config["get_postgres_connection"]

    


    # =============== METODOS PRIVADOS ===============
    def __serialize_value(self, value):
        """Convierte valores no serializables a formatos compatibles con JSON"""
        if isinstance(value, datetime):
            return value.isoformat()
        elif isinstance(value, (dict, list)):
            return value  # Ya se manejará con json.dumps
        else:
            return value

    def __serialize_row(self, row, columns):
        """Convierte una fila de la base de datos a un diccionario serializable"""
        row_dict = {}
        for i, value in enumerate(row):
            serialized_value = self.__serialize_value(value)
            # Manejar tipos especiales
            if isinstance(serialized_value, (dict, list)):
                row_dict[columns[i]] = json.dumps(serialized_value)
            else:
                row_dict[columns[i]] = serialized_value
        return row_dict

    def __create_args_from_params(self, table_name, filters=None, limit=None, offset=None):
        """
        Crea un ImmutableMultiDict desde parámetros de función
        """
        args_list = [('table', table_name)]
        
        if filters:
            for key, value in filters.items():
                if isinstance(value, list):
                    for v in value:
                        args_list.append((key, str(v)))
                else:
                    args_list.append((key, str(value)))
        
        if limit:
            args_list.append(('limit', str(limit)))
        if offset:
            args_list.append(('offset', str(offset)))
        
        return ImmutableMultiDict(args_list)

    def __parse_args(self, args_source):
        """
        Parsea argumentos desde request.args o desde ImmutableMultiDict
        """
        # ===== Nombre de la tabla
        table_name = args_source.get("table")

        if not table_name:
            return None, {
                "status": "error", 
                "info": "Falta el parámetro 'table' en la consulta"
            }, 400

        # ===== Construir filtros WHERE
        where_conditions = []
        params = []
        limit = None
        offset = None
        
        # Obtener todos los argumentos únicos (sin duplicados de keys)
        processed_keys = set()
        
        for key in args_source.keys():
            if key in processed_keys:
                continue
                
            processed_keys.add(key)
            
            if key in ["table", "limit", "offset"]:
                if key == "limit":
                    limit_value = args_source.get("limit")
                    limit = int(limit_value) if limit_value and limit_value.isdigit() else None
                elif key == "offset":
                    offset_value = args_source.get("offset")
                    offset = int(offset_value) if offset_value and offset_value.isdigit() else None
                continue
            
            # Obtener todos los valores para esta clave
            values = args_source.getlist(key)
            
            if len(values) == 1:
                # Un solo valor - condición de igualdad
                where_conditions.append(f"{key} = %s")
                value = values[0]
                # Conversión básica de tipos
                if value.lower() == "true":
                    params.append(True)
                elif value.lower() == "false":
                    params.append(False)
                elif value.isdigit():
                    params.append(int(value))
                else:
                    params.append(value)
            else:
                # Múltiples valores - usar operador IN
                placeholders = ", ".join(["%s"] * len(values))
                where_conditions.append(f"{key} IN ({placeholders})")
                
                # Convertir todos los valores y agregarlos a params
                for value in values:
                    if value.lower() == "true":
                        params.append(True)
                    elif value.lower() == "false":
                        params.append(False)
                    elif value.isdigit():
                        params.append(int(value))
                    else:
                        params.append(value)

        return (table_name, where_conditions, params, limit, offset), None, 200

    def __execute_query(self, table_name, where_conditions, params, limit, offset):
        """
        Ejecuta la consulta en PostgreSQL
        """
        try:
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
                        results.append(self.__serialize_row(row, columns))

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

    
    
    
    # =============== METODOS HTTP ===============
    def get(self, table_name=None, filters=None, limit=None, offset=None):
        """
        Endpoint HTTP o método directo
        
        Si se llama como endpoint HTTP: usa request.args
        Si se pasan parámetros: los usa directamente
        """
        if table_name:
            # Llamada directa con parámetros
            mock_args = self.__create_args_from_params(table_name, filters, limit, offset)
            parsed_data, error_response, status_code = self.__parse_args(mock_args)
            
            if error_response:
                return error_response, status_code
            
            table_name, where_conditions, params, limit, offset = parsed_data
            return self.__execute_query(table_name, where_conditions, params, limit, offset)
        else:
            # Llamada como endpoint HTTP
            parsed_data, error_response, status_code = self.__parse_args(request.args)
            
            if error_response:
                return error_response, status_code
            
            table_name, where_conditions, params, limit, offset = parsed_data
            return self.__execute_query(table_name, where_conditions, params, limit, offset)

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
            
            if not data:
                return {
                    "status": "error",
                    "info": "Valida que se encuentre 'data' en el payload"
                }, 400
            
            # ===== Normalizar data a lista de diccionarios
            if isinstance(data, dict):
                # Si es un solo diccionario, convertir a lista
                data_list = [data]
            elif isinstance(data, list):
                # Si es una lista, validar que todos sean diccionarios
                if not all(isinstance(item, dict) for item in data):
                    return {
                        "status": "error",
                        "info": "Todos los elementos en 'data' deben ser objetos/diccionarios"
                    }, 400
                data_list = data
            else:
                return {
                    "status": "error",
                    "info": "Valida que 'data' sea un objeto o una lista de objetos"
                }, 400
            
            if not data_list:
                return {
                    "status": "error",
                    "info": "La lista 'data' no puede estar vacía"
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
                    
                    # ===== Si la tabla no existe, crearla basándose en el primer registro
                    if not table_exists:
                        first_record = data_list[0]
                        # Determinar tipos de datos para cada columna
                        column_definitions = []
                        for key, value in first_record.items():
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
                    
                    # ===== Insertar múltiples registros
                    inserted_records = []
                    
                    for record in data_list:
                        # ===== Construir query INSERT para cada registro
                        columns = list(record.keys())
                        values = list(record.values())
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
                                result_dict[column_names[i]] = self.__serialize_value(value)
                            inserted_records.append(result_dict)
                
                conn.commit()
            
            action = "created_table_and_inserted" if not table_exists else "inserted"
            
            # ===== Preparar respuesta según si fue un registro o múltiples
            if len(inserted_records) == 1:
                return {
                    "status": "success",
                    "database": "postgresql",
                    "table": table_name,
                    "action": action,
                    "info": f"Tabla '{table_name}' {'creada e ' if not table_exists else ''}registro insertado",
                    "data": inserted_records[0]
                }, 201
            else:
                return {
                    "status": "success",
                    "database": "postgresql",
                    "table": table_name,
                    "action": action,
                    "info": f"Tabla '{table_name}' {'creada e ' if not table_exists else ''}{len(inserted_records)} registros insertados",
                    "count": len(inserted_records),
                    "data": inserted_records
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