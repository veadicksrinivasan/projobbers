import requests 
import json

url = "http://localhost:8000/api/chat"
payload = {
    "message": "how to fix a code error",
    "context": "test context",
    "language": "en",
    "page_url": "http://localhost:8000/index.html"
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
