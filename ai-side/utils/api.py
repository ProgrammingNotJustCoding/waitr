import requests

url = "http://localhost:3030/api/v1/vendor/new"

def create_new_order():
    payload = {
        "name": "samay",
        "email": "meh.pro2@gmail.com",
        "phone": "9840121224",
        "address": "hula hula hu hu"
    }
    headers = {"content-type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    print(response.json())