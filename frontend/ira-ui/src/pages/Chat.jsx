import { useLocation } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function Orb(){
  return(
    <div
      style={{
        margin:"auto",
        marginTop:"20px",
        width:"160px",
        height:"160px",
        borderRadius:"80px",
        background:"radial-gradient(circle at 30% 30%, #ff5edf, #04c8de, #3677ff)",
        boxShadow:"0 0 30px #3677ff",
        animation:"pulse 3s infinite"
      }}
    ></div>
  )
}

export default function Chat(){

  const { state } = useLocation()
  const name = state?.name || "User"

  const [msg,setMsg] = useState("")
  const [chat,setChat] = useState([])
  const [listening,setListening]=useState(false)

  /* TEXT SEND */
  async function send(text){

    if(!text) return

    const userMsg = { sender:"user", text }
    setChat(prev=>[...prev,userMsg])

    const res = await axios.post(
      "http://127.0.0.1:8001/chat",
      { name, message: text }
    )

    const iraMsg={sender:"ira",text:res.data.reply}
    setChat(prev=>[...prev,iraMsg])

    speakIRA(res.data.reply)
    setMsg("")
  }

  /* SPEAK IRA */
  async function speakIRA(text){

    const res=await axios.post(
      "http://127.0.0.1:8001/voice",
      {text},
      {responseType:"blob"}
    )

    const url=URL.createObjectURL(res.data)
    new Audio(url).play()
  }

  /* MIC (BROWSER SPEECH API) */
  function startMic(){

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.lang="en-IN"
    recognition.start()
    setListening(true)

    recognition.onresult=(e)=>{
      const text=e.results[0][0].transcript
      setListening(false)
      send(text)
    }

    recognition.onerror=()=>{
      setListening(false)
      alert("Mic error 😢")
    }
  }

  return(
    <div style={styles.container}>

      <h2 style={{color:"white"}}>IRA is listening 💕</h2>
      <Orb/>

      {/* CHAT */}
      <div style={styles.chatBox}>
        {chat.map((c,i)=>(
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf:c.sender==="user"?"flex-end":"flex-start",
              background:c.sender==="user"
              ?"#ff5edf":"#04c8de"
            }}
          >
            {c.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <input
        value={msg}
        onChange={e=>setMsg(e.target.value)}
        placeholder="Talk to IRA..."
        style={styles.input}
      />

      {/* BUTTONS */}
      <button onClick={()=>send(msg)} style={styles.btn}>
        Send 💌
      </button>

      <button
        onClick={startMic}
        style={{
          ...styles.btn,
          background:"#04c8de"
        }}
      >
        {listening?"🎙 Listening...":"🎤 Talk"}
      </button>

    </div>
  )
}

const styles={
  container:{
    minHeight:"100vh",
    background:"#0b0f1a",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    padding:"20px"
  },

  chatBox:{
    width:"90%",
    maxWidth:"600px",
    height:"300px",
    background:"#111",
    marginTop:"20px",
    padding:"10px",
    borderRadius:"10px",
    overflowY:"auto",
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  },

  msg:{
    maxWidth:"70%",
    padding:"10px",
    borderRadius:"10px",
    color:"white",
    fontSize:"14px"
  },

  input:{
    width:"90%",
    maxWidth:"600px",
    padding:"12px",
    borderRadius:"10px",
    border:"none",
    marginTop:"15px"
  },

  btn:{
    marginTop:"10px",
    padding:"10px 20px",
    border:"none",
    borderRadius:"8px",
    background:"#ff5edf",
    color:"white",
    cursor:"pointer"
  }
}