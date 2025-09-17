import requests
import uuid
import os
import json
import random
from config import MOCKAROO_API

class MockData:
    mock_url = "https://api.mockaroo.com/api/generate"
    
    def __init__(self, api_key: str):
        self.api_key = api_key
    
    def generate_data(self, fields: list, count: int = 1, format_: str = "json"):

        """
        Creates the body to send a request to the Mockaroo API.

        ## **Parameters**
        - ``fields``: Defines how the response will be provided by Mockaroo's API.
        - ``count``: Number of records that Mockaroo's API will return.
        - ``format_``: Defines the format of the data. 

        ## **Returns**
        Raw response by Mockaroo's API.
        """
        response = requests.post(self.mock_url, params = {
            "key": self.api_key,
            "count": count,
            "format": format_
        },
        json= fields)

        if response.status_code != 200:
            raise Exception(f"Error from Mockaroo API: {response.text}")

        if format_ == "json":
            response.json()
        return response.text
    
    def create_json():

        """
        Creates the JSON object with the desired keys and their values. It takes the function ``generate_data()`` with its default values.
        
        ## **Returns**
        JSON object with the requested fields and their values.
        """
    
        client = MockData(MOCKAROO_API)

        content_schema = [
        {"name": "content_id", "type": "Row Number"},
        {"name": "title", "type": "Movie Title"},
        {"name": "genre", "type": "Custom List", "values": [
            "Action", "Sci-Fi", "Fantasy", "Adventure", "Drama", "Technology", "Crime", "Mystery"
        ]},
        {"name": "type", "type": "Custom List", "values": ["Movie", "Series"]},
        {"name": "release_year", "type": "Number", "min": 1970, "max": 2025, "decimals": 0},
        {"name": "rating", "type": "Number", "min": 1, "max": 5, "decimals": 2},
        {"name": "views_count", "type": "Number", "min": 1000, "max": 100000, "decimals": 0},
        {"name": "production_budget", "type": "Number", "min": 1000000, "max": 200000000}
        ]

        payload = client.generate_data(fields = content_schema, count = 2, format_ = "json")
        payload_list = json.loads(payload)
        payload_json = payload_list[0]
        if payload_json['type'] == "Movie":
            payload_json['duration_minutes'] = random.randint(0, 360)
        else:
            payload_json['seasons'] = random.randint(1, 15)
            #IMPORTANT: the key 'episodes_per_season' should be a list with a length of the of the number of seasons, each item with a random integer number. Pending to fix in a future update.
            payload_json['episodes_per_season'] = random.uniform(3,30)
            payload_json['avg_episode_duration'] = random.uniform(20,60)
        
        return payload_json
    
if __name__ == '__main__':
    retrieval = MockData.create_json()
    print(retrieval)