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
            "values": [..., ..., ..., ..., ...]
        }


        # === abandonmentByCountry
        abandonmentByCountry = {
            "labels": ["México", "España", "Colombia", "Argentina", "Chile"],
            "values": [..., ..., ..., ..., ...]
        }


        # === engagementBySubscription
        engagementBySubscription = {
            "labels": ["Basic", "Standard", "Premium"],
            "values": [..., ..., ...]
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
                {"x": ..., "y": ..., "r": ...}, 
                {"x": ..., "y": ..., "r": ...}
            ],
            "standard": [
                {"x": ..., "y": ..., "r": ...},
                {"x": ..., "y": ..., "r": ...}
            ],
            "premium": [
                {"x": ..., "y": ..., "r": ...},
                {"x": ..., "y": ..., "r": ...}
            ]
        }

    def __obtener_info_temporal(self):
        ''' 
        '''
        return {
            "labels": ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            "cohorts": {
                "enero":   [..., ..., ..., ..., ..., ...],
                "febrero": [..., ..., ..., ..., ..., ...],
                "marzo":   [..., ..., ..., ..., ..., ...]
            }
        }

    def __obtener_info_technical(self):
        ''' 
        '''
        return {
            "labels": ["Mobile", "Desktop", "TV", "Tablet"],
            "duration":   [..., ..., ..., ...],
            "completion": [..., ..., ..., ...]
        }

    def __obtener_info_segmentation(self):
        ''' 
        '''
        return {
            "heavyUsers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ],
            "regularUsers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ],
            "casualViewers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ]
        }
    
    # =============== METODOS PUBLICOS ===============
    def get(self):
        '''
        '''
        try:
            return {
                "status":"success",
                "data":{
                    "engagement"   : self.__obtener_info_engagement(),
                    "value"        : self.__obtener_info_value(),
                    "temporal"     : self.__obtener_info_temporal(),
                    "technical"    : self.__obtener_info_technical(),
                    "segmentation" : self.__obtener_info_segmentation()
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
