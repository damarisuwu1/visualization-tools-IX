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
            "values": [5, 10, 15, 20, 25]
        }


        # === abandonmentByCountry
        abandonmentByCountry = {
            "labels": ["México", "España", "Colombia", "Argentina", "Chile"],
            "values": [5, 10, 15, 20, 25]
        }


        # === engagementBySubscription
        engagementBySubscription = {
            "labels": ["Basic", "Standard", "Premium"],
            "values": [30, 35, 40]
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
                {"x": 5, "y": 10, "r": 15}, 
                {"x": 20, "y": 25, "r": 30}
            ],
            "standard": [
                {"x": 5, "y": 10, "r": 15},
                {"x": 20, "y": 25, "r": 30}
            ],
            "premium": [
                {"x": 5, "y": 10, "r": 15},
                {"x": 20, "y": 25, "r": 30}
            ]
        }

    def __obtener_info_temporal(self):
        ''' 
        '''
        return {
            "labels": ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            "cohorts": {
                "enero":   [35, 40, 65, 70, 95, 0],
                "febrero": [45, 50, 75, 80, 5, 10],
                "marzo":   [55, 60, 85, 90, 15, 20]
            }
        }

    def __obtener_info_technical(self):
        ''' 
        '''
        return {
            "labels": ["Mobile", "Desktop", "TV", "Tablet"],
            "duration":   [25, 30, 45, 50],
            "completion": [35, 40, 55, 60]
        }

    def __obtener_info_segmentation(self):
        ''' 
        '''
        return {
            "heavyUsers": [
                {"x": 65, "y": 70},
                {"x": 75, "y": 80},
                {"x": 85, "y": 90}
            ],
            "regularUsers": [
                {"x": 95, "y": 0},
                {"x": 5, "y": 10},
                {"x": 15, "y": 20}
            ],
            "casualViewers": [
                {"x": 25, "y": 30},
                {"x": 35, "y": 40},
                {"x": 45, "y": 50}
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
