# ==================================== Improved version =================================

import os
from dotenv import load_dotenv
from Scripts.json_process import NoSQL_Process
from Scripts.csv_process import SQL_Process

load_dotenv()

#send_postgres_A = SQL_Process("A")
#send_postgres_B = SQL_Process("B")
#send_postgres_C = SQL_Process("C")
#send_postgres_D = SQL_Process("D")
send_mongo_A1 = NoSQL_Process("A", "movies")
send_mongo_B1 = NoSQL_Process("B", "movies")
send_mongo_C1 = NoSQL_Process("C", "movies")
send_mongo_D1 = NoSQL_Process("D", "movies")
send_mongo_A2 = NoSQL_Process("A", "series")
send_mongo_B2 = NoSQL_Process("B", "series")
send_mongo_C2 = NoSQL_Process("C", "series")
send_mongo_D2 = NoSQL_Process("D", "series")

#send_postgres_A.procesar()
send_mongo_A1.procesar()
send_mongo_B1.procesar()
send_mongo_C1.procesar()
send_mongo_D1.procesar()
send_mongo_A2.procesar()
send_mongo_B2.procesar()
send_mongo_C2.procesar()
send_mongo_D2.procesar()


# ==================================== DIEGO ============================================
# import os
# from dotenv import load_dotenv

# from Scripts.csv_process import SQL_Process
# from Scripts.json_process import NoSQL_Process

# # ===== Preparación de environment
# load_dotenv()

# sql_process = SQL_Process(
#     version = 'A'
# )
# nosql_process = NoSQL_Process(
#     version = 'A'
# )

# # ===== Ejecución de scripts
# sql_process.procesar()

# nosql_process.procesar()
# ================================================================================ 