# Inyector

The Inyector microservice is in charge to load, process and send the required data to the databases. It communicates with the API and its endpoints to properly send the entire data of a file to the respective DBMS through specific classes, one for PostgreSQL and one for MongoDB.
The inyector allows the sending of data through different methods.

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

To execute from the **Dockerfile**, you must be located in the `/visualization-tools-IX/Inyector` folder.

| Command                                                               | Purpose                                      |
| --------------------------------------------------------------------- | -------------------------------------------- |
| `docker build -t inyector_visualization .`                                 | Create the image to be used by the container |
| `docker stop inyector_visualization`                                       | Stop the container                           |
| `docker rm inyector_visualization`                                         | Remove the container                         |

### docker-compose (Recommended)

To execute from the **docker-compose.yml**, you must be located in the `/visualization-tools-IX/` folder.

| Command                                       | Purpose                                       |
| --------------------------------------------- | --------------------------------------------- |
| `docker compose up --build inyector_visualization` | Build and run the container       |
| `docker compose down inyector_visualization`       | Stop the container                            |
| `docker compose down inyector_visualization -v`    | Stop the container and remove the data volume |

## Component Explanation - Scripts

The inyector is constructed by several scripts that allow to implement different approaches to send data to the API.

### data

**Purpose:** To have data to work with and process it in order to send it to databases. The data is in a file named ```tech_salaries.csv```.
<table>
  <tr>
    <th>Column</th>
    <th>Description</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td><code>work_year</code></td>
    <td>The year the salary was paid.</td>
    <td>Numeric, e.g., **2025**</td>
  </tr>
  <tr>
    <td><code>experience_level</code></td>
    <td>The level of experience of the employee.</td>
    <td>Categorical/Abbreviated, e.g., **MI** (Mid-Level/Intermediate), **SE** (Senior), **EN** (Entry-Level), **EX** (Executive/Director)</td>
  </tr>
  <tr>
    <td><code>employment_type</code></td>
    <td>The type of employment.</td>
    <td>Categorical/Abbreviated, e.g., **FT** (Full-time), **PT** (Part-time), **CT** (Contract), **FL** (Freelance)</td>
  </tr>
  <tr>
    <td><code>job_title</code></td>
    <td>The specific job title for the role.</td>
    <td>String, e.g., **Penetration Tester**, **Data Scientist**, **ML Engineer**</td>
  </tr>
  <tr>
    <td><code>salary</code></td>
    <td>The gross amount of the salary paid.</td>
    <td>Numeric, e.g., **1336608**</td>
  </tr>
  <tr>
    <td><code>salary_currency</code></td>
    <td>The currency in which the salary was paid.</td>
    <td>Currency ISO Code, e.g., **INR**, **USD**, **EUR**</td>
  </tr>
  <tr>
    <td><code>salary_in_usd</code></td>
    <td>The salary converted to US dollars (USD).</td>
    <td>Numeric, e.g., **15804**</td>
  </tr>
  <tr>
    <td><code>employee_residence</code></td>
    <td>The country of the employee's main residence.</td>
    <td>Country ISO Code, e.g., **IN**, **US**, **GB**</td>
  </tr>
  <tr>
    <td><code>remote_ratio</code></td>
    <td>The percentage of time spent working remotely.</td>
    <td>Numeric, e.g., **0** (No remote work), **50** (Hybrid), **100** (Fully remote)</td>
  </tr>
  <tr>
    <td><code>company_location</code></td>
    <td>The country of the employer's headquarters or main office.</td>
    <td>Country ISO Code, e.g., **IN**, **US**, **CA**</td>
  </tr>
  <tr>
    <td><code>company_size</code></td>
    <td>The average size of the company during the year.</td>
    <td>Categorical/Abbreviated, e.g., **S** (Small), **M** (Medium), **L** (Large)</td>
  </tr>
</table>  

### csv_process.py

**Purpose:** Process the data of a csv file. It implements the class of ```SQL_Process_Proyect()```. It has these parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Purpose</th>
    <th>Values</th>
  </tr>
  <tr>
    <td><code>version</code></td>
    <td>Specifies the method in which the data will be processed and sent.</td>
    <td>
        <ul>
        <li>A: Process the dataset record by record, validate the data type, and if everything is OK, upload it to the API record by record.
        <li>B: Process the dataset as a dataframe, convert the column to a specific data type, and then process the dataframe row by row to upload it to the API.
        <li>C: Process the dataset as a dataframe, convert the column to a specific data type, upload it to the API with a single call, uploading the entire dataframe as a list within the payload.
        <li>D: Process the dataset as a dataframe, convert the column to a specific data type, upload to the API in blocks of 50 records (for example).
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>table</code></td>
    <td>Specifies the name of the table in PostgreSQL in which the data will be inserted </td>
    <td><strong>tech_salaries</strong>: Process the values of the table tech_salaries.</td>
  </tr>
</table>

It includes the following methods:

<table>
  <tr>
    <th>Function</th>
    <th>Purpose</th>
    <th>Returns</th>
  </tr>
  <tr>
    <td><code>__init__(self, version, table)</code></td>
    <td>Constructor. Initializes the **version** (A, B, C, or D), the **table** name (e.g., 'tech_salaries'), and sets the base file path location.</td>
    <td>Nothing (initializes object state).</td>
  </tr>
  <tr>
    <td><code>__leer_archivo_version_X()</code></td>
    <td>Reads the specified CSV file from the local file system.</td>
    <td>
        <ul>
            <li>**Version A:** A generator that yields one dictionary (row) at a time.</li>
            <li>**Versions B, C, D:** Stores the entire file content as a Pandas DataFrame (`self.df_csv`).</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__parsear_archivo_version_X()</code></td>
    <td>Converts the data types of the columns to the specified types (e.g., `int`, `str`) for the selected table.</td>
    <td>
        <ul>
            <li>**Version A:** Stores the processed dictionary in `self.processed_dict`.</li>
            <li>**Version B:** A generator that yields one processed dictionary (row) at a time.</li>
            <li>**Versions C, D:** Stores the entire processed dataset as a list of dictionaries (`self.df_processed`).</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__preparar_payload_version_X()</code></td>
    <td>Structures the data into the final payload format: a dictionary with keys `table` and `data`.</td>
    <td>
        <ul>
            <li>**Versions A, B, C:** Stores the complete payload in `self.payload_body`.</li>
            <li>**Version D:** A generator that yields a payload dictionary for a block of up to 500 records.</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__enviar_info_version_X()</code></td>
    <td>Sends the prepared JSON payload to the external API using a `requests.post` call to the `URL_API/api/postgres` endpoint.</td>
    <td>The API response object.</td>
  </tr>
  <tr>
    <td><code>__procesar_version_X()</code></td>
    <td>The main private function that orchestrates the entire data processing workflow for a specific version.</td>
    <td>The API response object (only for version C) or `None` (returns of inner methods are used to drive the loop).</td>
  </tr>
  <tr>
    <td><code>procesar(self)</code></td>
    <td>The **public callable function**. It selects and executes the appropriate <code>__procesar_version_X()</code> method based on the `version` attribute set in the constructor.</td>
    <td>The result of the corresponding <code>__procesar_version_X()</code> method.</td>
  </tr>
</table>

### json_process.py

**Purpose:** Contains the NoSQL_Process class, which handles the processing and ingestion of JSON data for MongoDB collections (movies or series). It has the same workflow of the ```csv_process.py``` file.

<table>
  <tr>
    <th>Function</th>
    <th>Purpose</th>
    <th>Returns</th>
  </tr>
  <tr>
    <td><code>__init__(self, version, data)</code></td>
    <td>Constructor. Initializes the <strong>version</strong> (A, B, C, or D), the target <strong>data</strong> collection ('movies' or 'series'), and sets the base file path location.</td>
    <td>Nothing (initializes object state).</td>
  </tr>
  <tr>
    <td><code>__leer_archivo_version_X()</code></td>
    <td>Reads the common source JSON file (`content.json`) and extracts the data corresponding to the selected collection (`self.data`).</td>
    <td>
        <ul>
            <li><strong>Version A:</strong> A generator that yields one dictionary (document) at a time.</li>
            <li><strong>Versions B, C, D:</strong> Stores the collection data as a Pandas DataFrame (`self.df_json`) after using `pd.json_normalize`.</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__parsear_archivo_version_X()</code></td>
    <td>Converts the data types of the keys/columns to the specified types (e.g., `str`, `int`, `list`, `object`) for the selected collection ('movies' or 'series').</td>
    <td>
        <ul>
            <li><strong>Version A:</strong> Stores the processed document in `self.payload_data`.</li>
            <li><strong>Version B:</strong> A generator that yields one processed dictionary (document) at a time.</li>
            <li><strong>Versions C, D:</strong> Stores the entire processed dataset as a list of dictionaries (`self.json_processed`).</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__preparar_payload_version_X()</code></td>
    <td>Structures the data into the final payload format: a dictionary with keys `collection` and `data`.</td>
    <td>
        <ul>
            <li><strong>Versions A, B, C:</strong> Stores the complete payload in `self.payload_body`.</li>
            <li><strong>Version D:</strong> A generator that yields a payload dictionary for a block of up to <strong>50</strong> records.</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>__enviar_info_version_X()</code></td>
    <td>Sends the prepared JSON payload to the external API using a `requests.post` call to the `URL_API/api/mongo` endpoint.</td>
    <td>The API response object.</td>
  </tr>
  <tr>
    <td><code>__procesar_version_X()</code></td>
    <td>The main private function that orchestrates the entire data processing workflow (read $\rightarrow$ parse $\rightarrow$ prepare payload $\rightarrow$ send) for a specific version.</td>
    <td>
        <ul>
            <li><strong>Version A:</strong> Returns a list of dictionaries that encountered errors during processing.</li>
            <li><strong>Versions B, C, D:</strong> Returns `None` (returns of inner methods are used to drive the process/loop).</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td><code>procesar(self)</code></td>
    <td>The <strong>public callable function</strong>. It selects and executes the appropriate `__procesar_version_X()` method based on the `version` attribute set in the constructor.</td>
    <td>The result of the corresponding `__procesar_version_X()` method.</td>
  </tr>
</table>

### utils.py
**Purpose:** Serves as a file to share reusable functions for certain methods in the ```SQL_Process_Proyecto``` and ```NoSQL_Process```. It also includes the benchmarking function.

<table>
  <tr>
    <th>Function</th>
    <th>Purpose</th>
    <th>Returns</th>
  </tr>
  <tr>
    <td><code>transform_types(dictionary, list_1, list_2)</code></td>
    <td>Converts the values in a dictionary to specific data types based on corresponding lists of column names and types. It iterates through the keys in `list_1` and uses the type from `list_2` to cast the value in the `dictionary`.</td>
    <td>The original `dictionary` with its values type-casted.</td>
  </tr>
  <tr>
    <td><code>benchmark_method(func, *args, repeat=5, **kwargs)</code></td>
    <td>Benchmarks the execution time of a single function or method. It runs the function a specified number of times (`repeat`) and records the elapsed time for each run using `time.perf_counter()`.</td>
    <td>A dictionary containing performance metrics: <code>"mean"</code>, <code>"median"</code>, <code>"min"</code>, <code>"max"</code>, and a list of all execution <code>"runs"</code> (times in seconds).</td>
  </tr>
  <tr>
    <td><code>benchmark_class_methods(instance, methods=None, repeat=5)</code></td>
    <td>Benchmarks one or more methods of an instantiated class. By default, it benchmarks the method named <code>"procesar"</code>. It uses <code>getattr()</code> to retrieve the method and calls <code>benchmark_method()</code> to get the statistics.</td>
    <td>A dictionary where keys are the method names (e.g., <code>"procesar"</code>) and values are the performance results dictionary returned by <code>benchmark_method()</code>.</td>
  </tr>
</table>


### __main__.py
**Purpose:** This file is in charge of running and benchmarking the data ingestion processes. It imports the necessary classes from csv_process.py and json_process.py and utility functions. It also loads environment variables. The ingestion processes and benchmarking are instanced as follows.

<table>
  <tr>
    <th>Instance</th>
    <th>Parameters</th>
    <th>Structure</th>
  </tr>
  <tr>
    <td><strong>Class Instantiation</strong></td>
    <td>`version` (Literal: 'A', 'B', 'C', 'D') and `table` (String: e.g., 'movies', 'users', 'tech_salaries').</td>
    <td>
        The classes are instantiated using the format:
        <br>
        <code>instance_name = ClassName("version_letter", "table_name")</code>
        <br>
        **Example:** <code>send_mongo_D1 = NoSQL_Process("D", "movies")</code>
        <br>
        This creates an object (`send_mongo_D1`) of the `NoSQL_Process` class configured to process the **"movies"** dataset using **Version D** logic (chunked upload).
    </td>
  </tr>
  <tr>
    <td><strong>Benchmarking Method 1</strong></td>
    <td>
        `instance`: The class object to test (e.g., `send_mongo_D1`).
        <br>
        `repeat`: The number of times to run the test (set to **3**).
    </td>
    <td>
        A simple helper function, **`benchmark_instance(instance, repeat=3)`**, is defined to use the standard Python **`timeit.timeit()`** module.
        <br>
        It measures the total time taken to call the object's public method **`instance.procesar()`** a specified number of times.
        <br>
        **Example Call:** <code>benchmark_instance(send_mongo_D1, repeat=3)</code>
    </td>
  </tr>
  <tr>
    <td><strong>Benchmarking Method 2 (Commented out)</strong></td>
    <td>
        `instance`: The class object to test.
        <br>
        `methods`: List of method names (default is `["procesar"]`).
        <br>
        `repeat`: Number of runs (set to **1** in the commented section).
    </td>
    <td>
        Uses the custom function **`benchmark_class_methods()`** imported from `utils.py`.
        <br>
        This function returns a dictionary with detailed metrics (**mean, median, min, max, runs**) for the specified methods, offering more statistical insight than `timeit.timeit()`.
        <br>
        **Example Call:** <code>benchmark_class_methods(send_mongo_D1, repeat=1)</code>
    </td>
  </tr>
</table>

## Possible Errors

* The service does not inyect data if the API service does not start.
* Depending on the process, the data ingestion may take more or less time to be completed. Consider to comment out the processes you don't want to test.


## Author(s):
* [Ariel Buenfil](https://github.com/Areo-17)
* [monroyminerodiego](https://github.com/monroyminerodiego)