from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

class Order(BaseModel):
    items: List[str]

router = APIRouter(tags=["TEST"])
orders = []
final_orders = []

@router.get("/orders")
async def get_orders():
    return {"orders": orders}

@router.post("/orders")
async def add_order(order: Order):
    orders.extend(order)
    return {"status": "success"}

@router.delete("/orders")
async def clear_orders():
    orders.clear()
    return {"status": "success"}

@router.delete("/orders/{item}")
async def delete_item_from_order(item: str):
    for order in orders:
        if item in order:
            orders.remove(order)
    return {"status": "success"}

@router.get("/final_orders")
async def get_final_orders():
    return {"final_orders": final_orders}

@router.post("/final_orders")
async def add_final_order():
    final_orders.append(orders)
    orders.clear()
    return {"status": "success", "final_order": final_orders[-1]}
