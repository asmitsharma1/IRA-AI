from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


chat = client.chat.completions.create(
    model="openai/gpt-oss-20b",   # try this
    messages=[
        {"role":"system","content":"You are IRA, a cute romantic AI"},
        {"role":"user","content":"Hi IRA"}
    ]
)

print(chat.choices[0].message.content)

