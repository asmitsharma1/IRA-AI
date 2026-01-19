def detect_mood(text):

    text = text.lower()

    if "sad" in text or "tension" in text:
        return "sad"

    if "happy" in text or "excited" in text:
        return "happy"

    if "angry" in text:
        return "angry"

    return "neutral"