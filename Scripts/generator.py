import requests
import os
from config import MOCKAROO_API

class MockData:
    mock_url = "https://api.mockaroo.com/api/generate"
    
    def __init__(self, api_key: str):
        self.api_key = api_key
    
    def generate_data(self, fields: list, count: int = 10, format_: str = "json"):
        response = requests.post(self.mock_url, params = {
            "key": self.api_key,
            "count": count,
            "format": format_
        },
        json= fields)

        if response.status_code != 200:
            raise Exception(f"Error from Mockaroo API: {response.text}")

        if format_ == "json":
            return response.json()
        return response.text

if __name__ == '__main__':
    API_KEY = os.getenv("MOCKAROO_API_KEY", MOCKAROO_API)

    client = MockData(API_KEY)
    users_schema =[
        {"name": "user_id", "type": "Row Number"},
        {"name": "age", "type": "Number", "min": 18, "max": 80},
        {"name": "country", "type": "Country"},
        {"name": "subscription_type", "type": "Custom List", "values": ["Basic", "Premium"]},
        {"name": "registration_date", "type": "Datetime", "min": "01/01/2020", "max": "12/31/2024", "format": "%m-%d-%Y"},
        {"name": "total_watch_time_hours", "type": "Number", "min": 0, "max": 1000, "decimals": 1},
    ]
    content_schema = [
        {"name": "content_id", "type": "Row Number"},
        {"name": "title", "type": "Number", "min": 18, "max": 80},
        {"name": "genre", "type": "Country"},
        {"name": "duration_minutes", "type": "Custom List", "values": ["Basic", "Premium"]},
        {"name": "registration_date", "type": "Date", "min": "2020-01-01", "max": "2024-12-31", "format": "%Y-%m-%d"},
        {"name": "total_watch_time_hours", "type": "Number", "min": 0, "max": 1000, "decimals": 1},
    ]
    viewing_sessions_schema = [
        {"name": "user_id", "type": "Row Number"},
        {"name": "age", "type": "Number", "min": 18, "max": 80},
        {"name": "country", "type": "Country"},
        {"name": "subscription_type", "type": "Custom List", "values": ["Basic", "Premium"]},
        {"name": "registration_date", "type": "Date", "min": "2020-01-01", "max": "2024-12-31", "format": "%Y-%m-%d"},
        {"name": "total_watch_time_hours", "type": "Number", "min": 0, "max": 1000, "decimals": 1},
    ]

    payload = client.generate_data(fields = users_schema, format_ = "csv")
    print(payload)