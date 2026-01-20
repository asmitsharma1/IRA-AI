from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from memory import save_memory, get_memory

from fastapi.responses import FileResponse
from voice import edge_voice
import requests

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== GROQ =====
client = Groq(api_key=os.getenv("GROQ_API_KEY"))




# ===== SCHEMA =====
class ChatRequest(BaseModel):
    name: str
    message: str


@app.get("/")
def home():
    return {"status": "IRA backend running 🚀"}
@app.post("/voice")
async def voice_api(data:dict):
    file = await edge_voice(data["text"])
    return FileResponse(file, media_type="audio/mpeg")


# ================= SPEECH TO TEXT =================
@app.post("/speech")
def speech_to_text(audio: UploadFile = File(...)):

    url = "https://api.elevenlabs.io/v1/speech-to-text"

    headers = {
        "xi-api-key": ELEVEN_API_KEY
    }

    files = {
        "file": audio.file
    }

    res = requests.post(url, headers=headers, files=files)

    if res.status_code != 200:
        return {"text": ""}

    return {"text": res.json()["text"]}


# ================= CHAT =================
@app.post("/chat")
def chat(req: ChatRequest):

    # Mood detection
    mood = "neutral"
    if any(x in req.message.lower() for x in ["sad","depressed","low"]):
        mood = "sad"
    elif any(x in req.message.lower() for x in ["happy","excited","great"]):
        mood = "happy"

    # Save memory
    save_memory(req.name, req.message, mood)

    # Load memory
    past_memory = get_memory()

    prompt = f"""
You are IRA, a cute romantic AI.

User name: {req.name}
Mood: {mood}

Past memory:
{past_memory}

User: {req.message}
Reply emotionally:
"""

    chat = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role":"system","content":prompt}
        ]
    )

    reply = chat.choices[0].message.content

    return {
        "user": req.name,
        "reply": reply
    }