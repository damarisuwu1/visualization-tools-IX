# Inyector

{Objetivo}

## Comentarios Diego
* Se cambio la estructura del microservicio, ahora está así:

    ``` bash
    Inyector
    ├── Dockerfile
    ├── Files
    │   ├── data
    │   │   ├── content.json
    │   │   ├── users.csv
    │   │   └── viewing_sessions.csv
    │   └── notebooks
    │       └── csv_processing.ipynb
    ├── __main__.py
    ├── README.md
    ├── requirements.txt
    └── Scripts
        ├── csv_process.py
        └── json_process.py

    5 directories, 10 files
    ```

    En el archivo `__main__.py` solo se va a instanciar las clases de los archivos `csv_process.py` y `json_process.py` y se van a mandar a llamar los metodos públicos de esas clases.
    Cada archivo contiene una clase que procesa un tipo de archivo diferente, sin embargo, el flujo debe ser similar:
    
    1. Lectura de archivo
    2. Parseo de archivo
    3. Preparación de payload
    4. Envio de payload

    Se tiene que hacer version A, version B, version C y version D de las dos clases con los dos tipos de archivo, done las versiones son:
    - **Version A:** Procesar el dataset registro por registro, validar el tipo de dato que es y si todo esta bien, subirlo al API igual registro por registro.
    - **Version B:** Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico y luego procesar el dataframe fila por fila para subirlo al API
    - **Version C:** Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subirlo al API con una sola llamada, subiendo todo el dataframe como lista dentro del payload.
    - **Version D:** Procesar el dataset como un dataframe, convertir la columna a un tipo de dato especifico, subir al API por bloques de 50 registros (por poner un ejemplo)

* Te hice cambios en `__main__.py`, pero estan comentados. Así es como mandas a llamar las clases y solo debería de haber una funcion publica por cada clase. También en los archivos de scripts te deje la estructura de como puedes organizar las clases.


## Author(s):
* [Ariel Buenfil](https://github.com/areo-17)