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

An API key from Mockaroo is also required, which must be configured as an environment variable called MOCKAROO_API_KEY or in a configuration file.