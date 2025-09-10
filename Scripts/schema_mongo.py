import json
from pymongo import MongoClient
from config import CONNECTION_MONGO

# Crear cliente
mongo_client = MongoClient(CONNECTION_MONGO)

# Seleccionar base de datos
db = mongo_client["VMI_model"]

# Seleccionar colección
usuarios = db["usuarios"]

# Leer archivo JSON
with open("usuarios.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Insertar varios documentos
usuarios.insert_many(data)

print("Usuarios insertados correctamente.")
