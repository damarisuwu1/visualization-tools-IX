import traceback
from flask_restful import Resource
from flask import current_app
from contextlib import closing
from pymongo import MongoClient

class Portfolio_1(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.db: MongoClient = current_app.config["mongo_db"]
        self.get_connection = current_app.config["get_postgres_connection"]

    # =============== METODOS PRIVADOS ===============
    def __obtener_info_engagement(self):
        ''' 
        '''
        # === completionByAge
        completionByAge = {
            "labels": ["18-25", "26-35", "36-45", "46-55", "55+"],
            "values": [0, 0, 0, 0, 0]
        }


        # === abandonmentByCountry
        abandonmentByCountry = {
            "labels": ["México", "España", "Colombia", "Argentina", "Chile"],
            "values": [0, 0, 0, 0, 0]
        }


        # === engagementBySubscription
        engagementBySubscription = {
            "labels": ["Basic", "Standard", "Premium"],
            "values": [0, 0, 0]
        }


        return {
            "completionByAge"          : completionByAge,
            "abandonmentByCountry"     : abandonmentByCountry,
            "engagementBySubscription" : engagementBySubscription,
        }

    def __obtener_info_value(self):
        ''' 
        '''
        return {
            "basic": [
                {"x": 0, "y": 0, "r": 0}, 
                {"x": 0, "y": 0, "r": 0}
            ],
            "standard": [
                {"x": 0, "y": 0, "r": 0},
                {"x": 0, "y": 0, "r": 0}
            ],
            "premium": [
                {"x": 0, "y": 0, "r": 0},
                {"x": 0, "y": 0, "r": 0}
            ]
        }

    def __obtener_info_temporal(self):
        ''' 
        '''
        return {
            "labels": ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            "cohorts": {
                "enero":   [0, 0, 0, 0, 0, 0],
                "febrero": [0, 0, 0, 0, 0, 0],
                "marzo":   [0, 0, 0, 0, 0, 0]
            }
        }

    def __obtener_info_technical(self):
        ''' 
        '''
        return {
            "labels": ["Mobile", "Desktop", "TV", "Tablet"],
            "duration":   [0, 0, 0, 0],
            "completion": [0, 0, 0, 0]
        }

    def __obtener_info_segmentation(self):
        ''' 
        '''
        return {
            "heavyUsers": [
                {"x": 0, "y": 0},
                {"x": 0, "y": 0},
                {"x": 0, "y": 0}
            ],
            "regularUsers": [
                {"x": 0, "y": 0},
                {"x": 0, "y": 0},
                {"x": 0, "y": 0}
            ],
            "casualViewers": [
                {"x": 0, "y": 0},
                {"x": 0, "y": 0},
                {"x": 0, "y": 0}
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
                    "engagement"   : self.__obtener_info_engagement(),
                    "value"        : self.__obtener_info_value(),
                    "temporal"     : self.__obtener_info_temporal(),
                    "technical"    : self.__obtener_info_technical(),
                    "segmentation" : self.__obtener_info_segmentation()
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
