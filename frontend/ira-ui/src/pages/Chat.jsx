import { useLocation } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import AnimeAvatar from "../components/AnimeAvatar.jsx" 

export default function Chat() {
  const { state } = useLocation()
  const name = state?.name || "User"

  const [msg, setMsg] = useState("")
  const [chat, setChat] = useState([])
  const [avatarStatus, setAvatarStatus] = useState("idle")
  const [avatarMood, setAvatarMood] = useState("happy")

  async function send() {
    if (!msg) return

    setAvatarStatus("thinking")

    setChat(prev => [...prev, { sender: "user", text: msg }])

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { name, message: msg }
      )

      setAvatarStatus("talking")

      setChat(prev => [...prev, { sender: "ira", text: res.data.reply }])

      // Simple mood detection
      detectMood(res.data.reply)

      // Back to idle after 2 sec
      setTimeout(() => setAvatarStatus("idle"), 2000)

    } catch (error) {
      setAvatarStatus("idle")
      console.error("Error:", error)
    }

    setMsg("")
  }

  function detectMood(text) {
    const t = text.toLowerCase()
    if (t.includes("love") || t.includes("❤") || t.includes("💕")) {
      setAvatarMood("cute")
    } else if (t.includes("! ") || t.includes("wow") || t.includes("amazing")) {
      setAvatarMood("excited")
    } else if (t.includes("sorry") || t.includes("understand")) {
      setAvatarMood("serious")
    } else {
      setAvatarMood("happy")
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={{ color: "white" }}>IRA 💕</h2>

      <AnimeAvatar status={avatarStatus} mood={avatarMood} />

      <div style={styles.chatBox}>
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf: c.sender === "user" ? "flex-end" : "flex-start",
              background: c. sender === "user"
                ?  "linear-gradient(135deg, #ff5edf, #ff9ff3)"
                : "linear-gradient(135deg, #04c8de, #0984e3)"
            }}
          >
            {c.sender === "ira" && <span style={styles.tag}>IRA 💕</span>}
            {c.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={msg}
          onChange={e => setMsg(e.target. value)}
          onKeyPress={e => e.key === "Enter" && send()}
          placeholder="Talk to IRA..."
          style={styles.input}
        />
        <button onClick={send} style={styles.btn}>Send 💌</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0b0f1a, #1a1a2e)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },
  chatBox: {
    width: "90%",
    maxWidth: "600px",
    height: "300px",
    background: "rgba(17,17,17,0.8)",
    marginTop: "20px",
    padding: "15px",
    borderRadius: "15px",
    border: "1px solid rgba(255,94,223,0.2)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  msg: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius:  "15px",
    color:  "white",
    fontSize: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  tag: {
    display: "block",
    fontSize: "10px",
    marginBottom: "5px",
    opacity: 0.8
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    width: "90%",
    maxWidth: "600px"
  },
  input:  {
    flex: 1,
    padding: "14px 18px",
    borderRadius: "25px",
    border: "2px solid rgba(255,94,223,0.3)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "14px",
    outline: "none"
  },
  btn: {
    padding: "14px 25px",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #ff5edf, #f368e0)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(255,94,223,0.4)"
  }
}