import traceback
from flask_restful import Resource

from ..Utils.collections import MongoCollections
from ..Utils.tables      import PostgresTables

class Proyecto_1(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.mongo = MongoCollections()

        self.postgres = PostgresTables()

    # =============== METODOS PRIVADOS ===============
    def __distributional(self):
        '''
        '''
        return {
            "labels": ["Entry Level", "Junior", "Mid-Level", "Senior", "Lead", "Executive"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [52000, 68000, 95000, 128000, 165000, 210000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [58000, 75000, 115000, 155000, 195000, 245000],
                "color": "#3b82f6"
            },
            "growth": [11.5, 10.3, 21.1, 21.1, 18.2, 16.7]
        }

    def __work_modalities(self):
        '''
        '''
        return {
            "labels": ["2020", "2021", "2022", "2023", "2024", "2025"],
            "datasets": [
                { 
                    "label": "Hybrid", 
                    "data": [35, 32, 30, 45, 65, 85], 
                    "color": "#2ecc71" 
                },
                { 
                    "label": "On-site", 
                    "data": [35, 30, 15, 8, 5, 3], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "Remote", 
                    "data": [20, 25, 60, 30, 18, 18], 
                    "color": "#3498db" 
                },
                { 
                    "label": "AI Boom (ChatGPT)", 
                    "data": [0, 0, 2, 25, 45, 72], 
                    "color": "#f39c12" 
                }
            ]
        }

    def __geographic(self):
        '''
        '''
        return {
            "labels": ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Netherlands"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [135000, 78000, 85000, 72000, 95000, 82000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [155000, 92000, 98000, 84000, 115000, 95000],
                "color": "#3b82f6"
            },
            "growth": [14.8, 17.9, 15.3, 16.7, 21.1, 15.9]
        }

    def __remote(self):
        '''
        '''
        return {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "0% Remote", 
                    "data": [85000, 88000, 92000, 95000, 98000], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "50% Remote", 
                    "data": [90000, 95000, 100000, 105000, 108000], 
                    "color": "#f39c12" 
                },
                { 
                    "label": "100% Remote", 
                    "data": [95000, 102000, 110000, 118000, 125000], 
                    "color": "#2ecc71" 
                }
            ]
        }

    def __roles(self):
        '''
        '''
        return {
            "labels": ["AI/ML Engineer", "Data Scientist", "Cloud Architect", "DevOps Engineer", "Data Engineer"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [125000, 115000, 135000, 120000, 110000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [165000, 145000, 155000, 140000, 130000],
                "color": "#3b82f6"
            },
            "growth": [32.0, 26.1, 14.8, 16.7, 18.2]
        }

    def __company(self):
        '''
        '''
        return {
            "labels": ["Startup (S)", "Medium (M)", "Large (L)", "Enterprise (XL)"],
            "data": [105000, 135000, 165000, 195000],
            "colors": ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
            "description": "Post-AI Era (2023-2025)"
        }

    def __temporal(self):
        '''
        '''
        return {
            "labels": ["2020", "2021", "2022", "2023", "2024", "2025"],
            "datasets": [
                {
                    "label": "Entry Level",
                    "data": [48000, 52000, 56000, 58000, 62000, 65000],
                    "color": "#3498db"
                },
                {
                    "label": "Junior",
                    "data": [62000, 65000, 68000, 75000, 78000, 82000],
                    "color": "#2ecc71"
                },
                {
                    "label": "Mid-Level",
                    "data": [85000, 90000, 95000, 115000, 120000, 125000],
                    "color": "#f39c12"
                },
                {
                    "label": "Senior",
                    "data": [120000, 128000, 135000, 155000, 165000, 175000],
                    "color": "#e74c3c"
                },
                {
                    "label": "Lead",
                    "data": [150000, 160000, 165000, 195000, 205000, 215000],
                    "color": "#9b59b6"
                },
                {
                    "label": "Executive",
                    "data": [195000, 205000, 210000, 245000, 255000, 265000],
                    "color": "#34495e"
                }
            ],
            "growth": {
                "Entry Level": [8.3, 7.7, 3.6, 6.9, 4.8],
                "Junior": [4.8, 4.6, 10.3, 4.0, 5.1],
                "Mid-Level": [5.9, 5.6, 21.1, 4.3, 4.2],
                "Senior": [6.7, 5.5, 14.8, 6.5, 6.1],
                "Lead": [6.7, 3.1, 18.2, 5.1, 4.9],
                "Executive": [5.1, 2.4, 16.7, 4.1, 3.9]
            }
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
                    "workModalities" : self.__work_modalities(),
                    "geographic"     : self.__geographic(),
                    "remote"         : self.__remote(),
                    "roles"          : self.__roles(),
                    "company"        : self.__company(),
                    "temporal"       : self.__temporal(),
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500