# ==================================== Improved version =================================

import os
import timeit
from dotenv import load_dotenv
from Scripts.Portfolio.json_process import NoSQL_Process
from Scripts.Portfolio.csv_process import SQL_Process
from Scripts.Project.csv_process import SQL_Process_Proyecto
from Scripts.Project.utils import benchmark_class_methods
from Scripts.Project.utils import save_benchmark_data

if __name__ == "__main__":
    
    load_dotenv()

    send_postgres_proyecto_A = SQL_Process_Proyecto('A', 'tech_salaries_v2')
    send_postgres_proyecto_B = SQL_Process_Proyecto('B', 'tech_salaries_v2')
    send_postgres_proyecto_C = SQL_Process_Proyecto('C', 'tech_salaries_v2')
    send_postgres_proyecto_D = SQL_Process_Proyecto('D', 'tech_salaries_v2')cd v
    send_postgres_proyecto_A.procesar()
    send_postgres_proyecto_B.procesar()
    send_postgres_proyecto_C.procesar()
    send_postgres_proyecto_D.procesar()
    print("¡Registros subidos!")

# =================== INSTANCIAS PARA SUBIDA DE DATOS PARA PROYECTO  =================== #
    '''send_postgres_proyecto_A = SQL_Process_Proyecto('A', 'tech_salaries_reduced')
    send_postgres_proyecto_B = SQL_Process_Proyecto('B', 'tech_salaries_reduced')
    send_postgres_proyecto_C = SQL_Process_Proyecto('C', 'tech_salaries_reduced')
    send_postgres_proyecto_D = SQL_Process_Proyecto('D', 'tech_salaries_reduced')'''

    # --------- NOTA: SE ESTÁ USANDO UN CSV MAS CHICO PARA BENCHMARKING ------- #

    # --------------- BENCHMARKING METHOD 1
    
    '''benchmark_postgres_proyecto_C = benchmark_class_methods(send_postgres_proyecto_C, send_postgres_proyecto_C.procesar(), repeat=3)
    print(f"Benchmark time for C{benchmark_postgres_proyecto_C}")
    benchmark_postgres_proyecto_D = benchmark_class_methods(send_postgres_proyecto_D, send_postgres_proyecto_D.procesar(), repeat=3)
    print(f"Benchmark time for D{benchmark_postgres_proyecto_D}")
    benchmark_postgres_proyecto_A = benchmark_class_methods(send_postgres_proyecto_A, send_postgres_proyecto_A.procesar(), repeat=3)
    print(f"Benchmark time for A{benchmark_postgres_proyecto_A}")
    benchmark_postgres_proyecto_B = benchmark_class_methods(send_postgres_proyecto_B, send_postgres_proyecto_B.procesar(), repeat=3)
    print(f"Benchmark time for B{benchmark_postgres_proyecto_B}")

    benchmarks = [benchmark_postgres_proyecto_C, benchmark_postgres_proyecto_D, benchmark_postgres_proyecto_A, benchmark_postgres_proyecto_B]

    save_benchmark_data(benchmarks)

    print("The benchmarks file has been saved.")'''

    
    # ---------------- BENCHMARKING METHOD 2
    
    '''# Simple wrapper to benchmark .procesar() calls
    def benchmark_instance(instance, repeat=3):
        stmt = "instance.procesar()"
        return timeit.timeit(stmt, globals={"instance": instance}, number=repeat)

    print("Benchmark Results (seconds, total time for 3 runs):")
    #print(f"Postgres Proyecto B: {benchmark_instance(send_postgres_proyecto_A, repeat=3)}")
    #print(f"Postgres Proyecto B: {benchmark_instance(send_postgres_proyecto_B, repeat=3)}")
    #print(f"Postgres Proyecto B: {benchmark_instance(send_postgres_proyecto_C, repeat=3)}")
    print(f"Postgres Proyecto D: {benchmark_instance(send_postgres_proyecto_D, repeat=3)}")'''

# =================== SUBIDA DE DATOS PARA PROYECTO =================== #




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