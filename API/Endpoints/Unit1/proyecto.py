import traceback
from flask_restful import Resource

from ..Utils.collections import MongoCollections
from ..Utils.tables      import PostgresTables

class Portfolio_1(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.mongo = MongoCollections()

        self.postgres = PostgresTables()

    # =============== METODOS PRIVADOS ===============
    def __distributional(self):
        '''
        '''
        return {
            "labels": ["Entry-level", "Mid-level", "Senior", "Executive"],
            "data": [65000, 95000, 135000, 185000],
            "colors": ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        }

    def __geographic(self):
        '''
        '''
        return {
            "labels": ["Estados Unidos", "Reino Unido", "Canadá", "Alemania", "Australia"],
            "data": [145000, 85000, 92000, 78000, 105000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        }

    def __remote(self):
        '''
        '''
        return {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "0% Remoto", 
                    "data": [85000, 88000, 92000, 95000, 98000], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "50% Remoto", 
                    "data": [90000, 95000, 100000, 105000, 108000], 
                    "color": "#f39c12" 
                },
                { 
                    "label": "100% Remoto", 
                    "data": [95000, 102000, 110000, 118000, 125000], 
                    "color": "#2ecc71" 
                }
            ]
        }

    def __roles(self):
        '''
        '''
        return {
            "labels": ["ML Engineer", "Data Scientist", "Data Engineer", "Analytics Manager", "Data Analyst"],
            "data": [155000, 145000, 135000, 125000, 85000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        }

    def __company(self):
        '''
        '''
        return {
            "labels": ["Startup (S)", "Mediana (M)", "Grande (L)"],
            "data": [95000, 125000, 155000],
            "colors": ["#e74c3c", "#f39c12", "#2ecc71"]
        }

    def __temporal(self):
        '''
        '''
        return {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "Entry-level", 
                    "data": [55000, 58000, 62000, 65000, 68000], 
                    "color": "#3498db" 
                },
                { 
                    "label": "Senior", 
                    "data": [115000, 125000, 135000, 145000, 155000], 
                    "color": "#e74c3c" 
                }
            ]
        }

    
    
    
    # =============== METODOS PUBLICOS ===============
    def get(self):
        '''
        '''
        try:
            return {
                "status":"success",
                "info":{
                    "distributional" : self.__distributional(),
                    "geographic" : self.__geographic(),
                    "remote" : self.__remote(),
                    "roles" : self.__roles(),
                    "company" : self.__company(),
                    "temporal" : self.__temporal(),
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500