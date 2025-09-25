# API Microservice

This microservice is responsible for connecting to the databases through a REST API built with Flask.
Additionally, it provides endpoints dedicated to serving the necessary information for the visualizations and analyses required by the other microservices.

## Installation

To use this microservice, it is necessary to install the libraries listed in `requirements.txt`. This can be done from the terminal with one of the following commands:

* Without Virtual Environment

```bash
# Install libraries
pip install -r requirements.txt
```

* With Virtual Environment

```bash
# Create environment 'api-env'
python -m venv api-env

# Activate environment
source api-env/bin/activate

# Install libraries
pip install -r requirements.txt

# Execution of the microservice...

# Deactivate environment
deactivate
```

## Execution

### Dockerfile

To execute from the **Dockerfile**, you must be located in the `/visualization-tools-IX/API` folder.

| Command                                                               | Purpose                                      |
| --------------------------------------------------------------------- | -------------------------------------------- |
| `docker build -t api_visualization .`                                 | Create the image to be used by the container |
| `docker run -d --name api_visualization -p 502:502 api_visualization` | Run the container on port 502                |
| `docker stop api_visualization`                                       | Stop the container                           |
| `docker rm api_visualization`                                         | Remove the container                         |

### docker-compose

To execute from the **docker-compose.yml**, you must be located in the `/visualization-tools-IX/` folder.

| Command                                       | Purpose                                       |
| --------------------------------------------- | --------------------------------------------- |
| `docker compose up --build api_visualization` | Build and run the container on port 502       |
| `docker compose down api_visualization`       | Stop the container                            |
| `docker compose down api_visualization -v`    | Stop the container and remove the data volume |

## Component Explanation - Endpoints

The API uses the prefix `/api/` for requests, and additional prefixes are added depending on the database or service being accessed.

### /api/info

**Purpose:** Check if the databases are functioning correctly and see which tables/collections exist in the databases.

<table>
  <tr>
    <th>Method</th>
    <th>Query Params</th>
    <th>Payload</th>
  </tr>
  <tr>
    <td><code>GET</code></td>
    <td>Not required</td>
    <td>Not required</td>
  </tr>
</table>  

### /api/mongo

**Purpose:** Perform CRUD operations on the Mongo database.

<table>
  <tr>
    <th>Method</th>
    <th>Query Params</th>
    <th>Payload</th>
  </tr>
  <tr>
    <td><code>GET</code></td>
    <td>The only required parameter is <code>collection</code>, which specifies the collection to query. Any additional query params will be used as filters for the query.</td>
    <td>Not required</td>
  </tr>
  <tr>
    <td><code>POST</code></td>
    <td>Not required</td>
    <td>Requires two main keys: <code>collection</code> and <code>data</code>. <code>collection</code> specifies the name of the collection where the data will be stored. <code>data</code> is the information to be stored (only accepts objects, not lists of objects). If the collection does not exist, it will be created with the specified name.</td>
  </tr>
  <tr>
    <td><code>PATCH</code></td>
    <td>Not required</td>
    <td>Requires three main keys: <code>collection</code>, <code>id</code>, and <code>data</code>. <code>collection</code> specifies the name of the collection containing the record to edit. <code>id</code> is the ID of the object to edit. <code>data</code> is the updated information (only accepts objects, not lists of objects).</td>
  </tr>
  <tr>
    <td><code>DELETE</code></td>
    <td>Not required</td>
    <td>Requires two main keys: <code>collection</code> and <code>id</code>. <code>collection</code> specifies the name of the collection containing the record. <code>id</code> is the ID of the object to delete. Only accepts strings, not lists of strings.</td>
  </tr>
</table>  

### /api/postgres

**Purpose:** Perform CRUD operations on the Postgres database.

<table>
  <tr>
    <th>Method</th>
    <th>Query Params</th>
    <th>Payload</th>
  </tr>
  <tr>
    <td><code>GET</code></td>
    <td>The only required parameter is <code>table</code>, which specifies the table to query. Any additional query params will be used as filters for the query.</td>
    <td>Not required</td>
  </tr>
  <tr>
    <td><code>POST</code></td>
    <td>Not required</td>
    <td>Requires two main keys: <code>table</code> and <code>data</code>. <code>table</code> specifies the name of the table where the data will be stored. <code>data</code> is the information to be stored (only accepts objects, not lists of objects). If the table does not exist, it will be created with the specified name.</td>
  </tr>
  <tr>
    <td><code>PATCH</code></td>
    <td>Not required</td>
    <td>Requires three main keys: <code>table</code>, <code>filters</code>, and <code>data</code>. <code>table</code> specifies the name of the table containing the record to edit. <code>filters</code> is an object containing the conditions that must be met to perform the update. <code>data</code> is the updated information (only accepts objects, not lists of objects).</td>
  </tr>
  <tr>
    <td><code>DELETE</code></td>
    <td>Not required</td>
    <td>Requires two main keys: <code>table</code> and <code>filters</code>. <code>table</code> specifies the name of the table containing the record. <code>filters</code> is an object containing the conditions that must be met to perform the deletion.</td>
  </tr>
</table>  

## Possible Errors

* If there is no connection to the databases, ensure that the `.env` file exists and contains the required keys for the databases.


## Author(s):
* [monroyminerodiego](https://github.com/monroyminerodiego)