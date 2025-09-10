### `generator.py` README

This `generator.py` script is a Python tool that uses the Mockaroo API to generate synthetic data. It is useful for quickly and flexibly creating test datasets.

***

### Key Features

* **Flexible Data Generation**: The script can generate data in **JSON** or **CSV** format.
* **Customizable Schemas**: It allows you to define complex data schemas, specifying the name, type, and properties of each field.
* **Mockaroo Integration**: It connects directly to the Mockaroo API to generate the information.

***

### Dependencies

To use this script, you must install the Python `requests` library. You can do this by running the following command:

```bash
pip install requests
```
An API key from Mockaroo is also required, which must be configured as an environment variable called MOCKAROO_API_KEY or in a configuration file.

How to Use
Set up the API Key: Make sure your Mockaroo API key is available as an environment variable.

```bash

export MOCKAROO_API_KEY="your_api_key_here"
```
Define the Schema: In the script, define the schema of the data you want to generate as a list of dictionaries, following the Mockaroo API structure.

Call the Generator: Create an instance of the MockData class with your API key and use the generate_data() method to generate the data.

fields: A list of dictionaries that define the data schema.

count: The number of records to be generated.

format_: The desired output format ("json" or "csv").

