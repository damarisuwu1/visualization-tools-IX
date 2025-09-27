import os, json, requests, pandas as pd
from dotenv import load_dotenv
from typing import Literal
from Scripts.utils import transform_types

URL_API = os.getenv('URL_API')

class NoSQL_Process:
    # =============== CONSTRUCTOR ===============
    def __init__(self, version:Literal['A','B','C','D'],data:Literal['movies','series']):
        '''
        - ```A```: Procesar el dataset registro por registro, validar el tipo de dato que es y si todo esta bien, subirlo al API igual registro por registro.
        - ```B```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico y luego procesar el dataframe fila por fila para subirlo al API
        - ```C```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subirlo al API con una sola llamada, subiendo todo el dataframe como lista dentro del payload.
        - ```D```: Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subir al API por bloques de 50 registros (por poner un ejemplo)
        '''
        
        self.version = version.upper()
        self.data = data
        self.location_path = os.path.dirname(os.path.dirname(__file__)) # Te deja en la ruta: Inyector/


    # =============== METODOS PRIVADOS ===============
    # ======== Version A
    def __leer_archivo_version_A(self):
        '''
        '''
        file_path = os.path.join(self.location_path,'Files','data','content.json')
        with open(file_path,'r') as file:
            json_data = json.load(file)[self.data]

        for dictionary in json_data:
            yield dictionary

    def __parsear_archivo_version_A(self,dictionary:dict):
        '''
        '''
        if self.data == 'movies':
            llaves_permitidas = ['_id','title','genre','duration_minutes','release_year','rating','views_count','production_budget']
            data_types = [str, str, list, int, int, float, int, int]
            self.payload_data = transform_types(dictionary, llaves_permitidas, data_types)
        elif self.data == 'series':
            llaves_permitidas = ['_id','title','genre','seasons','episodes_per_season','avg_episode_duration','rating','total_views', 'production_budget']
            data_types = [str, str, list, int, list, int, float, int, int]
            self.payload_data = transform_types(dictionary, llaves_permitidas, data_types)


        

    def __preparar_payload_version_A(self,dictionary:dict):
        '''
        '''
        dictionary = self.payload_data
        self.payload_body = {
            'collection': self.data,
            'data': dictionary
        }

    def __enviar_info_version_A(self,dictionary:dict):
        '''
        '''
        dictionary = self.payload_body
        response = requests.post(
            url=F"{URL_API}/api/mongo",
            json=dictionary
        )
        return response

    def __procesar_version_A(self):
        '''
        '''
        errors = []
        for dictionary in self.__leer_archivo_version_A():
            try:
                self.__parsear_archivo_version_A(dictionary)
                self.__preparar_payload_version_A(dictionary)
                self.__enviar_info_version_A(dictionary)
            except:
                errors.append(dictionary)
    
        retrieved_errors = errors
        return retrieved_errors










    # ======== Version B
    def __leer_archivo_version_B(self):
        '''
        '''
        file_path = os.path.join(self.location_path,'Files','data','content.json')
        with open(file_path,'r') as file:
            json_data = json.load(file)[self.data]
        self.df_json = pd.json_normalize(json_data)


    def __parsear_archivo_version_B(self):
        '''
        '''
        df = self.df_json
        columnas = list(df.columns)
        if self.data == "movies":
            data_types = [str, str, object, int, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            json_processed = json.loads(df_processed)
            for dictionary in json_processed:
                yield dictionary
        elif self.data == "series":
            data_types = [str, str, object, int, object, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            json_processed = json.loads(df_processed)
            for dictionary in json_processed:
                yield dictionary

    def __preparar_payload_version_B(self, dictionary: dict):
        '''
        '''
        self.payload_body = {
        'collection': self.data,
        'data': dictionary
        }

    def __enviar_info_version_B(self, dictionary: dict):
        '''
        '''
        dictionary = self.payload_body
        response = requests.post(
            url=f"{URL_API}/api/mongo",
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
        file_path = os.path.join(self.location_path,'Files','data','content.json')
        with open(file_path,'r') as file:
            json_data = json.load(file)[self.data]
        self.df_json = pd.json_normalize(json_data)

    def __parsear_archivo_version_C(self):
        '''
        '''
        df = self.df_json
        columnas = list(df.columns)
        if self.data == "movies":
            data_types = [str, str, object, int, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            self.json_processed = json.loads(df_processed)
        elif self.data == "series":
            data_types = [str, str, object, int, object, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            self.json_processed = json.loads(df_processed)

    def __preparar_payload_version_C(self):
        '''
        '''
        self.payload_body = {
        'collection': self.data,
        'data': self.json_processed
        }

    def __enviar_info_version_C(self):
        '''
        '''
        response = requests.post(
            url=f"{URL_API}/api/mongo",
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
        file_path = os.path.join(self.location_path,'Files','data','content.json')
        with open(file_path,'r') as file:
            json_data = json.load(file)[self.data]
        self.df_json = pd.json_normalize(json_data)

    def __parsear_archivo_version_D(self):
        '''
        '''
        df = self.df_json
        columnas = list(df.columns)
        if self.data == "movies":
            data_types = [str, str, object, int, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            self.json_processed = json.loads(df_processed)
        elif self.data == "series":
            data_types = [str, str, object, int, object, int, float, int, int]
            for column in columnas:
                item = data_types.pop(0)
                df = df.astype({column: item})
            df_processed = df.to_json(orient='records')
            self.json_processed = json.loads(df_processed)

    def __preparar_payload_version_D(self):
        '''
        '''
        values = self.json_processed
        i = 0
        chunk = values[i:(i+50)]
        for cluster in values:
            cluster = chunk
            if cluster == []:
                return None
            payload_body = {
            'collection': self.data,
            'data': cluster
            }
            yield payload_body
            i = i+50
            chunk = values[(i):(i+50)]

    def __enviar_info_version_D(self, dictionary: dict):
        '''
        '''
        response = requests.post(
            url=f"{URL_API}/api/mongo",
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

        if self.version == 'A':   self.__procesar_version_A()
        elif self.version == 'B': self.__procesar_version_B()
        elif self.version == 'C': self.__procesar_version_C()
        elif self.version == 'D': self.__procesar_version_D()
        else: raise Exception(f'No se proporcionó una versión valida. Se espera sólo A, B, C o D, pero se ingresó: {self.version}')