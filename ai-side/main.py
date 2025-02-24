from fastapi import FastAPI
from utils.chat import Chat
from uuid import uuid4

app = FastAPI() 
chats = {}

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
async def send_message(chat_id: str, message: str):
    print(chats)
    chat = chats[chat_id]
    response = chat.send(message)
    return {"response": response}