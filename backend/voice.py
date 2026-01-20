import edge_tts
import uuid

async def edge_voice(text):
    filename = f"ira_{uuid.uuid4()}.mp3"

    tts = edge_tts.Communicate(
        text,
        rate="-5%",      # slower
        pitch="+10Hz",   # cuteness
       
       voice="en-IN-NeerjaNeural"   # cute girl voice
    )

    await tts.save(filename)
    return filename
