from pymongo import MongoClient
from config import CONNECTION_MONGO

# Crear cliente
mongo_client = MongoClient(CONNECTION_MONGO)

# Seleccionar base de datos
db = mongo_client["mi_base_de_datos"]

# Seleccionar colección
usuarios = db["usuarios"]

# Insertar un documento
nuevo_usuario = {"nombre": "Alan", "edad": 26, "pais": "México"}
usuarios.insert_one(nuevo_usuario)

# Leer documentos
for usuario in usuarios.find():
    print(usuario)