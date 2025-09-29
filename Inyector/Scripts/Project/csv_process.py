import os, pandas as pd, requests, csv, json
from typing import Literal
from Scripts.Project.utils import transform_types

URL_API = os.getenv('URL_API')

class SQL_Process_Proyecto:
    # =============== CONSTRUCTOR ===============
    def __init__(self, version:Literal['A','B','C','D'], table:Literal['tech_salaries']):
        '''
        ## Parameters
        ### version:
        - ```A```: Procesar el dataset registro por registro, validar el tipo de dato que es y si todo esta bien, subirlo al API igual registro por registro.
        - ```B```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico y luego procesar el dataframe fila por fila para subirlo al API
        - ```C```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subirlo al API con una sola llamada, subiendo todo el dataframe como lista dentro del payload.
        - ```D```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subir al API por bloques de 50 registros (por poner un ejemplo)
        ### table:
        - ```tech_salaries```: Procesar los valores de la colección salaries.
        ## Returns
        Nothing.
        '''
        
        self.version = version.upper()
        self.table = table
        self.location_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) # Te deja en la ruta: Inyector/


    # =============== METODOS PRIVADOS ===============
    # ======== Version A
    def __leer_archivo_version_A(self):
        '''
        '''
        file_path = os.path.join(self.location_path, 'Files', 'data', f'{self.table}.csv')
        with open(file_path, newline='', mode='r') as file:
            csv_file = csv.DictReader(file)
            for row in csv_file:
                yield row
        

    def __parsear_archivo_version_A(self, dictionary: dict):
        '''
        '''
        if self.table == "tech_salaries":
            columns = ['work_year','experience_level','employment_type','job_title','salary','salary_currency','salary_in_usd','employee_residence','remote_ratio','company_location','company_size']
            data_types = [int, str, str, str, int, str, int, str, int, str, str]
            self.processed_dict = transform_types(dictionary, columns, data_types)
        else:
            raise "No se seleccionó una tabla valida"
    
    def __preparar_payload_version_A(self, dictionary: dict):
        '''
        '''
        dictionary = self.processed_dict
        self.payload_body = {
            'table':self.table,
            'data': dictionary
        }


    def __enviar_info_version_A(self, dictionary: dict):
        '''
        '''
        dictionary = self.payload_body
        response = requests.post(
            url=f"{URL_API}/api/postgres",
            json= dictionary
        )
        return response

    def __procesar_version_A(self):
        '''
        '''
        for dictionary in self.__leer_archivo_version_A():
            self.__parsear_archivo_version_A(dictionary)
            self.__preparar_payload_version_A(dictionary)
            self.__enviar_info_version_A(dictionary)











    # ======== Version B
    def __leer_archivo_version_B(self):
        '''
        '''
        file_path = os.path.join(self.location_path, 'Files','data', f'{self.table}.csv')
        self.df_csv = pd.read_csv(file_path)

    def __parsear_archivo_version_B(self):
        '''
        '''
        df = self.df_csv
        columnas = list(df.columns)
        if self.table == "tech_salaries":
            data_types = [int, str, str, str, int, str, int, str, int, str, str]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            json_processed = json.loads(df_processed)
            for dictionary in json_processed:
                yield dictionary
        else:
            raise "No se seleccionó una tabla valida"

    def __preparar_payload_version_B(self, dictionary: dict):
        '''
        '''
        self.payload_body = {
        'table': self.table,
        'data': dictionary
        }

    def __enviar_info_version_B(self, dictionary: dict):
        '''
        '''
        dictionary = self.payload_body
        response = requests.post(
            url=f"{URL_API}/api/postgres",
            json = dictionary
        )
        return response

    def __procesar_version_B(self):
        '''
        '''
        self.__leer_archivo_version_B()
        for dictionary in self.__parsear_archivo_version_B():
            self.__preparar_payload_version_B(dictionary)
            self.__enviar_info_version_B(dictionary)











    # ======== Version C
    def __leer_archivo_version_C(self):
        '''
        '''
        file_path = os.path.join(self.location_path, 'Files','data', f'{self.table}.csv')
        self.df_csv = pd.read_csv(file_path)

    def __parsear_archivo_version_C(self):
        '''
        '''
        df = self.df_csv
        columns = list(df.columns)
        if self.table == "tech_salaries":
            data_types = [int, str, str, str, int, str, int, str, int, str, str]
            for column in columns:
                data_type = data_types.pop(0)
                df = df.astype({column : data_type})
            df = df.to_json(orient='records')
            self.df_processed = json.loads(df)
        else:
            raise "No se seleccionó una tabla valida"


    def __preparar_payload_version_C(self):
        '''
        '''
        self.payload_body = {
        'table': self.table,
        'data': self.df_processed
        }

    def __enviar_info_version_C(self):
        '''
        '''
        response = requests.post(
            url=f"{URL_API}/api/postgres",
            json=self.payload_body
        )
        return response

    def __procesar_version_C(self):
        '''
        '''
        self.__leer_archivo_version_C()
        self.__parsear_archivo_version_C()
        self.__preparar_payload_version_C()
        self.__enviar_info_version_C()











    # ======== Version D
    def __leer_archivo_version_D(self):
        '''
        '''
        file_path = os.path.join(self.location_path, 'Files','data', f'{self.table}.csv')
        self.df_csv = pd.read_csv(file_path)

    def __parsear_archivo_version_D(self):
        '''
        '''
        df = self.df_csv
        columns = list(df.columns)
        if self.table == "tech_salaries":
            data_types = [int, str, str, str, int, str, int, str, int, str, str]
            for column in columns:
                data_type = data_types.pop(0)
                df = df.astype({column : data_type})
            df = df.to_json(orient='records')
            self.df_processed = json.loads(df)
        else:
            raise "No se seleccionó una tabla valida"

    def __preparar_payload_version_D(self):
        '''
        '''
        values = self.df_processed
        i = 0
        chunk = values[i:(i+500)]
        for cluster in values:
            cluster = chunk
            if cluster == []:
                return None
            payload_body = {
            'table': self.table,
            'data': cluster
            }
            yield payload_body
            i = i+500
            chunk = values[(i):(i+500)]

    def __enviar_info_version_D(self, dictionary: dict):
        '''
        '''
        response = requests.post(
            url=f"{URL_API}/api/postgres",
            json=dictionary
        )
        return response

    def __procesar_version_D(self):
        '''
        '''
        self.__leer_archivo_version_D()
        self.__parsear_archivo_version_D()
        for dictionary in  self.__preparar_payload_version_D():
            self.__enviar_info_version_D(dictionary)











    # =============== METODOS PUBLICOS ===============
    def procesar(self):

        if self.version == 'A':   return self.__procesar_version_A()
        elif self.version == 'B': return self.__procesar_version_B()
        elif self.version == 'C': return self.__procesar_version_C()
        elif self.version == 'D': return self.__procesar_version_D()
        else: raise Exception(f'No se proporcionó una versión valida. Se espera sólo A, B, C o D, pero se ingresó: {self.version}')