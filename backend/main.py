from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

# Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")  # export GROQ_API_KEY=xxxx
)

# Request schema
class ChatRequest(BaseModel):
    name: str
    message: str


@app.get("/")
def home():
    return {"status": "IRA backend running 🚀"}


@app.post("/chat")
def chat_ira(data: ChatRequest):

    system_prompt = f"""
You are IRA, a cute romantic AI assistant.
You talk sweetly.
You call the user {data.name}.
Use emojis.
Be caring and emotional.
"""

    chat = client.chat.completions.create(
        model="openai/gpt-oss-20b",   # ✅ working model
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": data.message}
        ]
    )

    reply = chat.choices[0].message.content

    return {
        "user": data.name,
        "reply": reply
    }