# visualization-tools-IX

## Objective
To design, implement, and deploy a multi-service data engineering solution that analyzes simulated video streaming data and presents key insights via an interactive dashboard, fulfilling all project and portfolio requirements for the "Visual Modeling" course.

## Microservices

### [(Public) API](./API/README.md)

### [(Public) Web](./Web/README.md)
 
### [(Private) Generator](./Generator/README.md)

### [(Private) Inyector](./Inyector/README.md)

### [(Private) ML](./ML/README.md)
 
### (Private) Mongo

This service deploys a **MongoDB** database, which serves as the project's **NoSQL** database engine. It is responsible for storing data collections with flexible or semi-structured schemas, such as video content metadata (`content.json`) and other documents that do not fit well into a relational model. The `API` service directly consumes this data to feed the *endpoints*.


#### Service Declaration

The service is declared in the `docker-compose.yml` file under the name `mongo_visualization` and uses the official `mongo:6.0` image. The configuration is as follows:

```yaml
  mongo_visualization:
    image: mongo:6.0
    container_name: mongo_visualization
    expose:
      - "27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
      - MONGO_INITDB_DATABASE=${MONGO_DB}
    volumes:
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
      - mongo_data:/data/db
    networks:
      - visualization_net
```


#### Volumes 💾

This service uses two volumes to manage initial configuration and data persistence:

  * `./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro`: This volume mounts a local initialization script (`mongo-init.js`) into the container. The official Mongo image automatically executes any `.js` script found in the `/docker-entrypoint-initdb.d/` directory the first time the container starts. It is used to programmatically **create users, databases, and collections**.
  * `mongo_data:/data/db`: This is a **named volume** that maps the `/data/db` directory inside the container (where Mongo stores all its data files) to a Docker-managed volume on the host machine. Its purpose is to ensure **data persistence**, so that information is not lost if the container is stopped, restarted, or removed.


#### Networks 🌐

The container connects to a single user-defined network to facilitate internal communication between services:

  * `visualization_net`: This is a *bridge* network that allows `mongo_visualization` to communicate with other services, such as `api_visualization` and `inyector_visualization`. By being on the same network, other services can connect to the database using its service name (`mongo_visualization`) as a hostname, without needing to insecurely expose ports to the local network.


### (Private) Postgres

This service deploys a **PostgreSQL** database, which acts as the project's relational (SQL) database engine.

#### Objective

The objective of the `postgres_visualization` microservice is to serve as the main **SQL** database. It is responsible for storing and managing structured, relational data with well-defined schemas, such as user information (`users.csv`) and tech industry salaries (`tech_salaries.csv`). The `API` service connects to this database to perform complex queries and retrieve the data served through its *endpoints*.


#### Service Declaration

The service is defined in `docker-compose.yml` under the name `postgres_visualization`, using the official `postgres:15` image. The configuration is as follows:

```yaml
  postgres_visualization:
    image: postgres:15
    container_name: postgres_visualization
    expose:
      - "5432"
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - visualization_net
```


#### Volumes 💾

This service uses a named volume to ensure the persistence of the database's data:

  * `postgres_data:/var/lib/postgresql/data`: This is a **named volume** that maps the `/var/lib/postgresql/data` directory inside the container. This is the default path where PostgreSQL stores all its files, such as tables, indexes, and transaction logs. The main purpose of this volume is to ensure **data persistence**, preventing data loss if the container is stopped or removed.


#### Networks 🌐

The container connects to a shared network to allow secure communication with other services:

  * `visualization_net`: Like other services, it connects to this *bridge* network. This allows the `api_visualization` service to communicate with the database securely and efficiently, using the service name `postgres_visualization` as a hostname. This eliminates the need to expose the database to the local network beyond the standard port for development purposes.


## Environment

### Variables

It is needed to have a `.env` file with the following

| Variable | Example | Container |
| -------- | ------- | --------- |
| MONGO_URL | mongodb://mongo_visualization:27017 | mongo_visualization |
| MONGO_DB | visualization_db | mongo_visualization |
| MONGO_ROOT_USER | admin | mongo_visualization |
| MONGO_ROOT_PASSWORD | admin123 | mongo_visualization |
| MONGO_USER | admin | mongo_visualization |
| MONGO_PASSWORD | admin123 | mongo_visualization |
| POSTGRES_HOST | postgres_visualization | postgres_visualization |
| POSTGRES_PORT | 5432 | postgres_visualization |
| POSTGRES_DB | visualization_db | postgres_visualization |
| POSTGRES_USER | admin | postgres_visualization |
| POSTGRES_PASSWORD | admin123 | postgres_visualization |
| URL_API | http://0.0.0.0:503 | web_visualization, gen_visualization, inyector_visualization |

## Execution

The only requirement is that `Docker` and `docker compose` must be installed in the OS.

### docker-compose

To execute from the **docker-compose.yml**, you must be located in the `/visualization-tools-IX/` folder.

| Command | Purpose |
| ------- | ------- |
| `docker compose up --build` | Build and run all microservices. Use `-d` as an aditional param to run docker in background. |
| `docker compose down`       | Stops the containers. |
| `docker compose down -v`    | Stop the containers and removes the data volumes. |

## Autor(es)
* [Alan Valbuena](https://github.com/AlanVAal)
* [Ariel Buenfil](https://github.com/areo-17)
* [Damaris Dzul](https://github.com/damarisuwu1)
* [Diego Monroy](https://github.com/monroyminerodiego)
* [Paulina Chiquete](https://github.com/)
* [Sergio Barrera](https://github.com/S3RG10-B4RR3R4)
