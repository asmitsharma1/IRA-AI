import json

def save_memory(name, msg, mood):

    data = {
        "name": name,
        "message": msg,
        "mood": mood
    }

    try:
        with open("memory.json","r") as f:
            old = json.load(f)
    except:
        old = []

    old.append(data)

    with open("memory.json","w") as f:
        json.dump(old,f,indent=4)


def get_memory():
    try:
        with open("memory.json","r") as f:
            return json.load(f)
    except:
        return []