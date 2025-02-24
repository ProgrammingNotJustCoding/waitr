from google import genai
from typing import List
from dotenv import load_dotenv
from collections import Counter
from os import getenv

from pydantic import BaseModel
import requests

class Item(BaseModel):
    item: str
    note: str = ""

load_dotenv()
CLIENT = genai.Client(api_key=getenv("API"))
order = []
API_URL = "http://localhost:3030"

def add_order(o: List[Item]): 
    print(order)
    order.extend([dict(i) for i in o])
    print(order)
    return {"status": "success"}


def show_orders():
    return Counter(order)


def clear_orders():
    order.clear()
    return {"status": "success"}


def delete_item_from_order(item: str):
    for i in range(0, len(order)):
        if order[i] == item:
            order.pop(i)
            break
    return {"status": "success"}


def get_available_items_with_cost():
    return {
        "cheeseburger": {
            "count": 10,
            "cost": 100,
            "priority": True,
            "description": "Cheeseburger is a hamburger topped with cheese. Traditionally, the slice of cheese is placed on top of the meat patty, but the burger can include many variations in structure, ingredients, and composition.",
            "recipe": [
                "Bun",
                "Patty",
                "Cheese",
                "Lettuce",
                "Tomato",
                "Onion",
                "Mayonnaise",
                "Ketchup",
            ],
        },
        "pizza": {
            "count": 5,
            "cost": 200,
            "priority": False,
            "description": "Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients.",
            "recipe": [
                "Dough",
                "Tomato Sauce",
                "Cheese",
                "Pepperoni",
                "Mushrooms",
                "Onions",
                "Bell Peppers",
                "Olives",
            ],
        },
        "burger": {
            "count": 20,
            "cost": 50,
            "priority": False,
            "description": "A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
            "recipe": [
                "Bun",
                "Patty",
                "Lettuce",
                "Tomato",
                "Onion",
                "Mayonnaise",
                "Ketchup",
            ],
        },
    }


def set_order_final():
    print("Order:")
    for item in order:
        print(item)
    print(
        "Total cost:",
        sum([get_available_items_with_cost()[item]["cost"] for item in order]),
    )
    return {"status": "success"}


class Chat:
    def __init__(self):
        config = {
            "tools": [
                add_order,
                show_orders,
                clear_orders,
                delete_item_from_order,
                get_available_items_with_cost,
                set_order_final,
            ]
        }
        self.chat = CLIENT.chats.create(
            model="gemini-2.0-flash",
            config=config,
            history=[
                {
                    "role": "user",
                    "parts": [{"text": "Please provide information in a table format whenever possible. Also attach the orders table to the bottom of the messages and currency is in ruppees. If no Note is given, give it as empty"}]
                }
            ]
        )

    def send(self, message: str):
        response = self.chat.send_message(message)
        return response.text


if __name__ == "__main__":
    chat = Chat()
    while True:
        message = input("You: ")
        print("Bot:", chat.send(message))
