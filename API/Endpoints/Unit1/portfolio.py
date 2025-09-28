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
        paises = ["Mexico", "Colombia", "Argentina", "Chile"]

        # === Busca el total de registros de viewing_sessions
        response, code = self.postgres.get(
            table_name = 'viewing_sessions'
        )
        if code != 200: raise Exception(f"4. Se encontró un error al consultar la info de la bd - ({code}): {response}")
        else: total_registros = response['count']

        # === Busca la información pais por país
        values = []
        for pais in paises:

            # === Primero busca los ids de los usuarios en el pais
            response, code = self.postgres.get(
                table_name = 'users',
                filters = {
                    "country":pais
                }
            )
            if code != 200: raise Exception(f"5. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else: response = response['data']

            user_id_range = list(set([register['user_id'] for register in response]))

            # === Busca los completion_percentage < 30 de los user_id_range
            response, code = self.postgres.get(
                table_name = 'viewing_sessions',
                filters = {
                    "user_id":user_id_range,
                    "completion_percentage":[i*0.1 for i in range(300)]
                }
            )
            if code != 200: raise Exception(f"6. Se encontró un error al consultar la info de la bd - ({code}): {response}")
            else:  response = response['count']

            # === Guarda el porcentaje
            porcentaje_completition_range = int((response * 100) / total_registros)
            values.append(porcentaje_completition_range)
        

        return {
            "labels" : paises,
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
    
    
    
    # =============== METODOS PUBLICOS ===============
    def get(self):
        '''
        '''
        try:
            return {
                "status":"success",
                "info":{
                    "engagement"   : self.__obtener_info_engagement()
                }
            }, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
