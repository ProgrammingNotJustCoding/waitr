from fastapi import FastAPI
from utils.chat import Chat, get_available_items_with_cost
from routes import test_routes
from uuid import uuid4
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class ChatMessage(BaseModel):
    message: str

app = FastAPI()
chats = {}
orders = []
app.include_router(test_routes.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}


@app.post("/chat")
async def create_chat():
    chat = Chat()
    unique_id = uuid4()
    chats[str(unique_id)] = chat
    return {"chat_id": unique_id}


@app.post("/chat/{chat_id}/")
async def send_message(chat_id: str, text: ChatMessage):
    print(chats)
    chat = chats[chat_id]
    response = chat.send(text.message)
    return {"response": response}
