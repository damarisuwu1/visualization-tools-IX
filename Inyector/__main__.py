# ==================================== Improved version =================================

import os
from dotenv import load_dotenv
from Scripts.Portfolio.json_process import NoSQL_Process
from Scripts.Portfolio.csv_process import SQL_Process
from Scripts.Project.csv_process import SQL_Process_Proyecto
from Scripts.Project.benchmarking import benchmark_class_methods

if __name__ == "__main__":
    
    load_dotenv()

# =================== INSTANCIAS PARA SUBIDA DE DATOS PARA PORTAFOLIO Y PROYECTO =================== #
    send_mongo_D1 = NoSQL_Process("D", "movies")
    send_mongo_D2 = NoSQL_Process("D", "series")
    send_postgres_D1 = SQL_Process("D", "users")
    send_postgres_D2 = SQL_Process("D", "viewing_sessions")
    send_postgres_proyecto_D = SQL_Process_Proyecto('D', 'tech_salaries')

# --------------- ENVÍO
    send_mongo_D1.procesar()
    send_mongo_D2.procesar()
    send_postgres_D1.procesar()
    send_postgres_D2.procesar()
    send_postgres_proyecto_D.procesar()

# --------------- BENCHMARKING
    benchmark_mongo_D1 = benchmark_class_methods(send_mongo_D1, NoSQL_Process.procesar(), repeat=1)
    benchmark_postgres_proyecto_D = benchmark_class_methods(send_mongo_D1, SQL_Process_Proyecto.procesar(), repeat=1)

    print(f"MongoDB benchmark metrics with method D is {benchmark_mongo_D1}\nPostgres benchmark metrics with method D is {benchmark_postgres_proyecto_D}")

# =================== SUBIDA DE DATOS PARA PROYECTO =================== #

    #send_postgres_proyecto_A = SQL_Process('A', 'tech_salaries')
    #send_postgres_proyecto_B = SQL_Process('B', 'tech_salaries')
    #send_postgres_proyecto_C = SQL_Process('C', 'tech_salaries')


    #send_postgres_proyecto_A.procesar()
    #send_postgres_proyecto_B.procesar()
    #send_postgres_proyecto_C.procesar()


# =================== INSTANCIAS DE TODOS LOS METODOS DE DATOS PARA PROYECTO =================== #

    #send_postgres_A1 = SQL_Process("A", "users")
    #send_postgres_B1 = SQL_Process("B", "users")
    #send_postgres_C1 = SQL_Process("C", "users")
    #send_postgres_D1 = SQL_Process("D", "users")
    #send_postgres_A2 = SQL_Process("A", "viewing_sessions")
    #send_postgres_B2 = SQL_Process("B", "viewing_sessions")
    #send_postgres_C2 = SQL_Process("C", "viewing_sessions")
    #send_postgres_D2 = SQL_Process("D", "viewing_sessions")
    #send_mongo_A1 = NoSQL_Process("A", "movies")
    #send_mongo_B1 = NoSQL_Process("B", "movies")
    #send_mongo_C1 = NoSQL_Process("C", "movies")
    #send_mongo_D1 = NoSQL_Process("D", "movies")
    #send_mongo_A2 = NoSQL_Process("A", "series")
    #send_mongo_B2 = NoSQL_Process("B", "series")
    #send_mongo_C2 = NoSQL_Process("C", "series")
    #send_mongo_D2 = NoSQL_Process("D", "series")

    #send_postgres_A1.procesar()
    #send_postgres_A2.procesar()
    #send_postgres_B1.procesar()
    #send_postgres_B2.procesar()
    #send_postgres_C1.procesar()
    #send_postgres_C2.procesar()
    #send_postgres_D1.procesar()
    #send_postgres_D2.procesar()

    #send_mongo_A1.procesar()
    #send_mongo_B1.procesar()
    #send_mongo_C1.procesar()
    #send_mongo_D1.procesar()
    #send_mongo_A2.procesar()
    #send_mongo_B2.procesar()
    #send_mongo_C2.procesar()
    #send_mongo_D2.procesar()