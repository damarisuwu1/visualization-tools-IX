# ==================================== Improved version =================================

import os
from dotenv import load_dotenv
#from Scripts.Project.json_process import NoSQL_Process
from Scripts.Project.csv_process import SQL_Process

if __name__ == "__main__":
    
    load_dotenv()

    #send_postgres_A1 = SQL_Process("A", "users")
    #send_postgres_B1 = SQL_Process("B", "users")
    send_postgres_C1 = SQL_Process("C", "users")
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
    send_postgres_C1.procesar()
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