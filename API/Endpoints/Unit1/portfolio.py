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
    def __completition_by_age(self):
        ''' Completa los siguientes pasos:
        1. Consulta el total de registros de 'viewing_sessions'.
        2. Por cada rango de edades, ejecuta lo siguiente:
            2.1 - Busca los usuarios que tengan ese rango de edad y guarda sus ids.
            2.2 -  Con los ids de los usuarios, busca la cantidad de registros que tengan un 'completion_percentage' > 95.
            2.3 - Hace una regla de 3 para sacar el porcentaje Vs el total de registros.
        '''
        # === Prepara los rangos de edad
        ages = {
            "18-25" : {
                "index" : 0,
                "range" : [i for i in range(18,25+1)]
            },
            "26-35" : {
                "index" : 1,
                "range" : [i for i in range(26,35+1)]
            },
            "36-45" : {
                "index" : 2,
                "range" : [i for i in range(36,45+1)]
            },
            "46-55" : {
                "index" : 3,
                "range" : [i for i in range(46,55+1)]
            },
            "55-99" : {
                "index" : 4,
                "range" : [i for i in range(55,99+1)]
            },
        }
        values = []

        # === Busca el total de registros de viewing_sessions
        response, code = self.postgres.get(
            table_name = 'viewing_sessions'
        )
        if code != 200: raise Exception(f"1. Se encontró un error al consultar la info de la bd - ({code}): {response}")
        else: total_registros = response['count']

        for age_range,properties in ages.items():
            # === Primero busca los ids de los usuarios en esos rangos
            response, code = self.postgres.get(
                table_name = 'users',
                filters = {
                    "age":properties['range']
                }
            )
            if code != 200: raise Exception(f"2. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else: response = response['data']

            user_id_range = list(set(register['user_id'] for register in response))

            # === Busca los completion_percentage > 95 de los user_id_range
            response, code = self.postgres.get(
                table_name = 'viewing_sessions',
                filters = {
                    "user_id":user_id_range,
                    "completion_percentage":[95.0 + i*0.1 for i in range(60)]
                }
            )
            if code != 200: raise Exception(f"3. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else: response = response['count']

            # === Guarda el porcentaje
            porcentaje_completition_range = int((response * 100) / total_registros)
            values.append(porcentaje_completition_range)

        
        return {
            "labels": ["18-25", "26-35", "36-45", "46-55", "55+"],
            "values" : values
        }

    def __abandonment_by_country(self):
        ''' 
        '''
        # === Busca el total de registros de viewing_sessions
        response, code = self.postgres.get(
            table_name = 'viewing_sessions'
        )
        if code != 200: raise Exception(f"4. Se encontró un error al consultar la info de la bd - ({code}): {response}")
        else: total_registros = response['count']

        # === Busca la información pais por país
        values = []
        for pais in ["Mexico","España","Colombia","Argentina","Chile"]:

            # === Primero busca los ids de los usuarios en el pais
            response, code = self.postgres.get(
                table_name = 'users',
                filters = {
                    "country":pais
                }
            )
            if code != 200: raise Exception(f"5. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else: response = response['data']

            user_id_range = list(set(register['user_id'] for register in response))

            # === Busca los completion_percentage < 15 de los user_id_range
            response, code = self.postgres.get(
                table_name = 'viewing_sessions',
                filters = {
                    "user_id":user_id_range,
                    "completion_percentage":[i*0.1 for i in range(150)]
                }
            )
            if code != 200: raise Exception(f"6. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else: response = response['count']

            # === Guarda el porcentaje
            porcentaje_completition_range = int((response * 100) / total_registros)
            values.append(porcentaje_completition_range)
        

        return {
            "labels" : ["México", "España", "Colombia", "Argentina", "Chile"],
            "values" : values
        }
    
    def __engagement_by_syscription(self):
        '''
        '''
        tiers  = ["Basic", "Standard", "Premium"]
        values = []

        # === Busca los usuarios dependiendo su tier de suscripcion
        for tier in tiers:
            response, code = self.postgres.get(
                table_name = 'users',
                filters = {"subscription_type":tier}
            )
            if code != 200: raise Exception(f"7. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            
            # === Obtiene el numero de usuarios en ese tier y el promedio de 'total_watch_time_hours'
            total_users = response['count']
            total_hours = sum([user['total_watch_time_hours'] for user in response['data']])
            total_avrg  = int(total_hours / total_users)

            values.append(total_avrg)

        return {
            "labels": tiers,
            "values": values
        }
    
    def __obtener_info_engagement(self):
        ''' 
        '''
        return {
            "completionByAge"          : self.__completition_by_age(),
            "abandonmentByCountry"     : self.__abandonment_by_country(),
            "engagementBySubscription" : self.__engagement_by_syscription(),
        }

    
    
    
    
    
    def __basic(self):
        return [
                {"x": 5, "y": 10, "r": 15}, 
                {"x": 20, "y": 25, "r": 30}
            ]
    
    def __standard(self):
        return [
                {"x": 5, "y": 10, "r": 15},
                {"x": 20, "y": 25, "r": 30}
            ]

    def __premium(self):
        return [
                {"x": 5, "y": 10, "r": 15},
                {"x": 20, "y": 25, "r": 30}
            ]

    def __obtener_info_value(self):
        ''' 
        '''
        return {
            "basic": self.__basic(),
            "standard": self.__standard(),
            "premium": self.__premium()
        }

    
    
    
    
    
    def __enero(self):
        return [35, 40, 65, 70, 95, 0]
    
    def __febrero (self):
        return [45, 50, 75, 80, 5, 10]
    
    def __marzo(self):
        return [55, 60, 85, 90, 15, 20]

    def __obtener_info_temporal(self):
        ''' 
        '''
        return {
            "labels": ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            "cohorts": {
                "enero":   self.__enero(),
                "febrero": self.__febrero(),
                "marzo":   self.__marzo()
            }
        }

    
    
    
    
    
    def __duration(self):
        return [25, 30, 45, 50]
    
    def __completition(self):
        return [35, 40, 55, 60]
    
    def __obtener_info_technical(self):
        ''' 
        '''
        return {
            "labels": ["Mobile", "Desktop", "TV", "Tablet"],
            "duration":   self.__duration(),
            "completion": self.__completition(),
        }

    
    
    
    
    
    def __heavyUsers(self):
        return [
                {"x": 65, "y": 70},
                {"x": 75, "y": 80},
                {"x": 85, "y": 90}
            ]

    def __regularUsers(self):
        return [
                {"x": 95, "y": 0},
                {"x": 5, "y": 10},
                {"x": 15, "y": 20}
            ]

    def __casualViewers(self):
        return [
                {"x": 25, "y": 30},
                {"x": 35, "y": 40},
                {"x": 45, "y": 50}
            ]
    
    def __obtener_info_segmentation(self):
        ''' 
        '''
        return {
            "heavyUsers": self.__heavyUsers(),
            "regularUsers": self.__regularUsers(),
            "casualViewers": self.__casualViewers(),
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
                    # "value"        : self.__obtener_info_value(),
                    # "temporal"     : self.__obtener_info_temporal(),
                    # "technical"    : self.__obtener_info_technical(),
                    # "segmentation" : self.__obtener_info_segmentation()
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
