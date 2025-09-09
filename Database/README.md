# xpert-IA - DBS (Database)

## Descripción

Esta API permite gestionar distintas secciones de contenido (por ejemplo, menús de navegación u otros módulos) almacenadas en una base de datos MongoDB. Cada sección representa una colección en MongoDB, y cada ítem representa un documento dentro de esa colección.

La API está desarrollada con FastAPI y se ejecuta usando Docker para facilitar el despliegue.

---

## Cómo ejecutar el proyecto

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-repo.git
    cd tu-repo
    ```

2. Levanta los servicios con Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. Accede a la documentación interactiva:

- Swagger UI: http://localhost:503/docs

- ReDoc: http://localhost:503/redoc

## Endpoints disponibles

Todas las rutas están bajo el prefijo `/api-db/section`

1. Obtener todos los ítems de una sección
GET `/api-db/section/{section_name}`

Devuelve todos los documentos de la colección `{section_name}`.

Ejemplo:
GET `/api-db/section/menu`

Respuesta:

    ```json
    [
        {
            "id": "6835f47e2fbe96f049188ec9",
            "title": "Desarrollo de Software",
            "description": "Soluciones digitales personalizadas...",
            "type": "nav3.1"
        },
        {
            "id": "6835f5872fbe96f049188eca",
            "title": "Inicio",
            "type": "nav1"
        }
    ]
    ```

2. Obtener un ítem por su ID
GET `/api-db/section/{section_name}/{item_id}`

Ejemplo:
GET `/api-db/section/menu/6835f47e2fbe96f049188ec9`

Respuesta:

    ```json
        {
        "id": "6835f47e2fbe96f049188ec9",
        "title": "Desarrollo de Software",
        "description": "Soluciones digitales personalizadas...",
        "type": "nav3.1"
        }
    ```

3. Crear un nuevo ítem en una sección
POST `/api-db/section/{section_name}`

Body JSON:

    ```json
        {
        "title": "Contacto",
        "type": "nav5"
        }
    ```

Respuesta:

    ```json
        {
        "id": "6835f77f2fbe96f049188ecc",
        "title": "Contacto",
        "type": "nav5"
        }
    ```

4. Actualizar un ítem existente
PUT `/api-db/section/{section_name}/{item_id}`

Body JSON:

    ```json
        {
        "title": "Inicio actualizado",
        "type": "nav1"
        }
    ```

Respuesta:

    ```json
        {
        "id": "6835f5872fbe96f049188eca",
        "title": "Inicio actualizado",
        "type": "nav1"
        }
    ```

5. Eliminar un ítem
DELETE `/api-db/section/{section_name}/{item_id}`

Respuesta:

    ```json
        {
        "detail": "Item deleted"
        }
    ```

### Notas
* Puedes tener múltiples ítems por sección.

* No es obligatorio que todos los ítems tengan la misma estructura.

* Los ObjectId se devuelven como strings bajo la clave "id".

## Author(s)
* [MDavidHernandezP](https://github.com/MDavidHernandezP)
* [monroyminerodiego](https://github.com/monroyminerodiego)