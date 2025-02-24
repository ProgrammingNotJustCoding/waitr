from google import genai
from typing import List
from dotenv import load_dotenv
from os import getenv

import requests

load_dotenv()
CLIENT = genai.Client(api_key=getenv("API"))
order = []


def add_order(o: List[str]):    
    order.extend(o)
    return {"status": "success"}


def show_orders():
    return order


def clear_orders():
    order.clear()
    return {"status": "success"}


def delete_item_from_order(item: str):
    order.remove(item)
    return {"status": "success"}


def get_available_items_with_cost():
    return {
        "cheeseburger": {
            "count": 10,
            "cost": 100,
            "priority": True,
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
                    "parts": [{"text": "Please provide information in a table format whenever possible, if i ask for menu just SHARE ME THE menu with price please? also if i dont have an order and not asking for my order then do not give my order stuff. If there is a table for my orders then do not mention current orders and with plain text. If i ask for bill, sum every item up and show all items and price, if there is multiple then add quantities instead of spamming... If i add orders then please show me the prizes too! Also attach the orders table to the bottom of the messages and currency is in ruppees, do NOT show receipies if not mentioned."}]
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
