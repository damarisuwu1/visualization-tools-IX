# ETL Process Documentation: Inyector Microservice

This document outlines the core aspects of the data ingestion and transformation logic implemented within the **Inyector Microservice**, as defined in the `csv_process.py` and `json_process.py` files.

---

## 1. Data Lineage

The data flow is consistent across both SQL (`tech_salaries_v2` table) and NoSQL (`movies` or `series` collections) pipelines, involving a three-stage Extract-Transform-Load (ETL) process.

### 1.1 Source Data
| Data Type | Target System | Source File | Structure |
| :--- | :--- | :--- | :--- |
| **CSV** | PostgreSQL | `tech_salaries.csv` | Tabular (Processed via Pandas/CSV reader) |
| **JSON** | MongoDB | `content.json` | Nested JSON object containing `movies` and `series` arrays |

### 1.2 Transformation and Loading Path
The process defines four distinct versions (A, B, C, D) for processing and sending data, all of which culminate in a POST request to an external API (`$URL_API`).

| Version | Extraction/Transformation Method | Load Method | Target Endpoint |
| :--- | :--- | :--- | :--- |
| **A** | Record-by-record processing and type casting (`utils.transform_types`). | Record-by-record API call. | `/api/postgres` or `/api/mongo` |
| **B** | Load to Pandas DataFrame, type cast, then iterate row-by-row for payload preparation. | Record-by-record API call. | `/api/postgres` or `/api/mongo` |
| **C** | Load to Pandas DataFrame, type cast, convert to list of records. | **Single bulk API call.** | `/api/postgres` or `/api/mongo` |
| **D** | Load to Pandas DataFrame, type cast, convert to list of records, then split into chunks. | **Chunked API calls.** | `/api/postgres` or `/api/mongo` |

---

## 2. Transformation Rules

All transformation logic is primarily centered around type casting, managed by the private parsing methods (`__parsear_archivo_version_X`) and the shared utility function, `transform_types`.

### 2.1 Shared Utility Transformation
The function `transform_types(dictionary, list_1, list_2)` (from `utils.py`) enforces strict data typing by:
1. Iterating over column/key names provided in `list_1`.
2. Casting the value in the `dictionary` to the corresponding Python type pulled from `list_2`.
3. If a required key from `list_1` is missing, it raises an **Exception**.

### 2.2 SQL (CSV) Transformations (`tech_salaries` data)
| Field Name | Source Type | Target Type | Notes |
| :--- | :--- | :--- | :--- |
| `work_year` | Varies | **int** | The year the salary was paid. |
| `experience_level` | Varies | **str** | The level of experience of the employee. |
| `employment_type` | Varies | **str** | The type of employment. |
| `job_title` | Varies | **str** | The specific job title for the role. |
| `salary` | Varies | **int** | The gross amount of the salary paid. |
| `salary_currency` | Varies | **str** | The currency in which the salary was paid. |
| `salary_in_usd` | Varies | **int** | The salary converted to US dollars (USD). |
| `employee_residence` | Varies | **str** | The country of the employee's main residence. |
| `remote_ratio` | Varies | **int** | The percentage of time spent working remotely. |
| `company_location` | Varies | **str** | The country of the employer's headquarters or main office. |
| `company_size` | Varies | **str** | The average size of the company during the year. |

### 2.3 NoSQL (JSON) Transformations

#### 2.3.1 `movies` Collection
| Field Name | Source Type | Target Type | Notes |
| :--- | :--- | :--- | :--- |
| Keys include | Varies | **str**, **list** (or **object**), **int**, **float** | Data types enforced on keys like `_id`, `title`, `genre`, `duration_minutes`, `release_year`, `rating`, `views_count`, and `production_budget`. |

#### 2.3.2 `series` Collection
| Field Name | Source Type | Target Type | Notes |
| :--- | :--- | :--- | :--- |
| Keys include | Varies | **str**, **list** (or **object**), **int**, **float** | Data types enforced on keys like `_id`, `title`, `genre`, `seasons`, `episodes_per_season`, `avg_episode_duration`, `rating`, `total_views`, and `production_budget`. |

---

## 3. Pipeline Performance Metrics

Performance is measured using a dedicated benchmarking framework provided in `utils.py`.

### 3.1 Benchmarking Functions
| Function | Purpose | Metrics Returned |
| :--- | :--- | :--- |
| `benchmark_method()` | Measures the execution time of a single function call, repeated `N` times. | **mean**, **median**, **min**, **max**, and all **runs** (in seconds). |
| `benchmark_class_methods()` | Benchmarks the public `procesar()` method of a class instance. | Dictionary mapping method name (e.g., `"procesar"`) to detailed `benchmark_method` results. |

### 3.2 Key Performance Indicator (KPI)
The primary KPI is the **Mean Execution Time** of the entire data ingestion workflow, measured by benchmarking the `procesar()` method for each version (A, B, C, D) to compare efficiency. Version C (single bulk API call) is generally expected to be the fastest for bulk data transfer.

---

## 4. Error Handling Procedures

Error handling is implemented for type casting and API communication, although it is minimally logged.

### 4.1 Type Casting Errors
* **Source:** The `transform_types` function.
* **Procedure:** If a required key is missing, an **Exception** is raised, terminating the process for that record.
* **NoSQL Pipeline (Version A only):** Version A of the `NoSQL_Process` (`__procesar_version_A`) includes a `try...except` block. Documents that encounter errors during processing are appended to an `errors` list, which is returned by the method.

### 4.2 API Communication Errors
* API calls (`__enviar_info_version_X`) are made using `requests.post`.
* The raw `response` object is returned by the send methods, but its status or content is not explicitly checked or logged within the current ETL logic.

---

## 5. Operational Monitoring

Monitoring is based on the benchmarking capabilities and high-level health checks.

### 5.1 Process Monitoring
* **Console Logging (Implicit):** In version A and B of the CSV process, a message `"1000 registros subidos"` is printed after processing the first 1000 records, providing an operational checkpoint.
* **Block Tracking:** Version D for SQL utilizes blocks of up to **1500** records and NoSQL uses blocks of up to **50** records, effectively tracking progress by block rather than record.

### 5.2 Performance Monitoring
The `utils.py` benchmarking functions allow for offline analysis of pipeline speed.
* Benchmarking is instance-based, typically running the `procesar()` method a number of times (e.g., 3 in the main execution file) to gather mean, median, min, and max execution times.

### 5.3 Health Checks
The microservice is dependent on the external API being operational. As noted, the service **"does not inyect data if the API service does not start"**.