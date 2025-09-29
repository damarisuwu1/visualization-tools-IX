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

### docker-compose (Recommended)

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
**Purpose:** This endpoint acts as a generic CRUD (Create, Read, Update, Delete) interface for any collection within the MongoDB database. It allows for dynamic querying, insertion, updating, and deletion of documents.
<table>
    <tr>
        <th>Method</th>
        <th>Query Params</th>
        <th>Payload</th>
    </tr>
    <tr>
        <td><code>GET</code></td>
        <td>
            <b>Required:</b>
            <ul>
                <li><code>collection</code>: The name of the collection you want to query.</li>
            </ul>
            <b>Optional:</b>
            <ul>
                <li><code>limit</code>: An integer to limit the number of results (e.g., <code>limit=100</code>).</li>
                <li><code>skip</code>: An integer to skip a number of documents, useful for pagination (e.g.,
                    <code>skip=50</code>).</li>
                <li><b>Filters:</b> Any other query parameter is treated as a filter on the collection's fields. You can
                    provide a key multiple times to search for multiple possible values (uses an <code>$in</code>
                    query).</li>
                <li>Example: <code>?collection=salaries&experience_level=EN&experience_level=MI&limit=10</code></li>
            </ul>
        </td>
        <td>Not required</td>
    </tr>
    <tr>
        <td><code>POST</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>collection</code> (string): The name of the collection to insert into.</li>
                <li><code>data</code> (object | array of objects): The document or list of documents to be inserted.
                </li>
            </ul>
            Example for a single document:
            <pre><code>{
    "collection": "users",
    "data": { "name": "John Doe", "active": true }
    }</code></pre>
            Example for multiple documents:
            <pre><code>{
    "collection": "users",
    "data": [
    { "name": "Jane Doe", "active": true },
    { "name": "Peter Pan", "active": false }
    ]
    }</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>PATCH</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>collection</code> (string): The name of the collection where the document resides.</li>
                <li><code>id</code> (string): The unique <code>_id</code> of the document to update.</li>
                <li><code>data</code> (object): An object containing the fields to update.</li>
            </ul>
            Example:
            <pre><code>{
    "collection": "users",
    "id": "60d5ecf3e7b2f0a8d4d8c8b1",
    "data": { "active": false }
    }</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>DELETE</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>collection</code> (string): The name of the collection to delete from.</li>
                <li><code>id</code> (string): <b>Optional.</b> The unique <code>_id</code> of the document to delete.
                </li>
            </ul>
            <p><b>Warning:</b> If the <code>id</code> field is omitted from the payload, <b>ALL</b> documents in the
                specified collection will be deleted.</p>
            Example to delete one document:
            <pre><code>{
    "collection": "users",
    "id": "60d5ecf3e7b2f0a8d4d8c8b1"
    }</code></pre>
        </td>
    </tr>
</table>


### /api/postgres
**Purpose:** This endpoint provides a generic CRUD (Create, Read, Update, Delete) interface for tables in the PostgreSQL database. It allows for querying with filters, inserting, updating, and deleting records. A key feature is its ability to automatically create a new table if one doesn't exist during a POST request, inferring column types from the provided data.
<table>
    <tr>
        <th>Method</th>
        <th>Query Params</th>
        <th>Payload</th>
    </tr>
    <tr>
        <td><code>GET</code></td>
        <td>
            <b>Required:</b>
            <ul>
                <li><code>table</code>: The name of the table you want to query.</li>
            </ul>
            <b>Optional:</b>
            <ul>
                <li><code>limit</code>: An integer to limit the number of rows returned (e.g., <code>limit=50</code>).
                </li>
                <li><code>offset</code>: An integer to skip a number of rows, useful for pagination (e.g.,
                    <code>offset=100</code>).</li>
                <li><b>Filters:</b> Any other query parameter acts as a filter on the table's columns. Providing the
                    same key multiple times creates a SQL <code>IN</code> clause.</li>
                <li>Example: <code>?table=salaries&experience_level=EN&experience_level=MI&limit=25</code></li>
            </ul>
        </td>
        <td>Not required</td>
    </tr>
    <tr>
        <td><code>POST</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>table</code> (string): The name of the table to insert into. If the table doesn't exist, it
                    will be created automatically.</li>
                <li><code>data</code> (object | array of objects): The record or list of records to insert.</li>
            </ul>
            Example for a single record:
            <pre><code>{
              "table": "employees",
              "data": { "name": "John Doe", "department": "IT" }
              }</code></pre>
                          Example for multiple records:
                          <pre><code>{
              "table": "employees",
              "data": [
              { "name": "Jane Doe", "department": "HR" },
              { "name": "Peter Pan", "department": "Finance" }
              ]
              }</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>PATCH</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>table</code> (string): The name of the table to update.</li>
                <li><code>filters</code> (object): An object of key-value pairs to identify the records to be updated
                    (e.g., <code>{"id": 123}</code>).</li>
                <li><code>data</code> (object): An object containing the columns and their new values.</li>
            </ul>
            Example:
            <pre><code>{
              "table": "employees",
              "filters": { "name": "John Doe" },
              "data": { "department": "Engineering" }
              }</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>DELETE</code></td>
        <td>Not required</td>
        <td>
            <b>Required.</b> A JSON object with the following structure:
            <ul>
                <li><code>table</code> (string): The name of the table to delete from.</li>
                <li><code>filters</code> (object): <b>Optional.</b> An object of key-value pairs to identify which
                    records to delete.</li>
            </ul>
            <p><b>Warning:</b> If the <code>filters</code> field is omitted from the payload, <b>ALL</b> records in the
                specified table will be deleted.</p>
            Example to delete specific records:
            <pre><code>{
          "table": "employees",
          "filters": { "department": "IT" }
          }</code></pre>
        </td>
    </tr>
</table>

### /api/unit-1/portfolio
**Purpose:** Provides a set of pre-calculated metrics related to user engagement, designed to populate a portfolio dashboard. This endpoint queries the database to generate three specific analytics:

1. **Completion Rate by Age:** Calculates the percentage of viewing sessions with over 95% completion, segmented by different age groups.
2. **Abandonment Rate by Country:** Calculates the percentage of viewing sessions with less than 30% completion (considered abandonment), segmented by major countries.
3. **Engagement by Subscription:** Determines the average total watch time (in hours) for users, segmented by their subscription tier (Basic, Standard, Premium).

The response for each metric is structured with `labels` and `values` arrays, ready for direct use in charting libraries.

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

### /api/unit-1/project
**Purpose:** This endpoint is designed to provide a comprehensive analysis of technology salaries, delivering six distinct, pre-calculated metrics for a data visualization project. Each metric is structured to be easily consumed by charting libraries.

The specific analytics provided are:
1. **Salary Distribution by Experience:** Compares average salaries across different seniority levels (Entry-level, Mid-level, Senior, Executive).
1. **Geographic Salary Comparison:** Shows the average salary in different key countries to highlight geographical pay disparities.
1. **Impact of Remote Work on Salary:** Tracks the evolution of average salaries over the last five years, segmented by the degree of remote work (fully remote, hybrid, on-site).
1. **Salary by Tech Role:** Compares the average salaries for various prominent roles within the data and tech industry.
1. **Salary by Company Size:** Illustrates how average salaries differ between small (Startup), medium, and large companies.
1. **Temporal Salary Trends:** Shows the salary growth trends over the past five years, comparing Entry-level and Senior positions.

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

## Possible Errors

* If there is no connection to the databases, ensure that the `.env` file exists and contains the required keys for the databases.


## Author(s):
* [monroyminerodiego](https://github.com/monroyminerodiego)