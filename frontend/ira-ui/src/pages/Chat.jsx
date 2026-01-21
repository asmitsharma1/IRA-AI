import { useLocation } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import AnimeAvatar from "../components/AnimeAvatar.jsx"

export default function Chat(){

 const { state } = useLocation()
 const name = state?.name || "User"

 const [msg,setMsg] = useState("")
 const [chat,setChat] = useState([])

 async function send(){

  if(!msg) return

  setChat(prev=>[
   ...prev,
   {sender:"user",text:msg}
  ])

  const res = await axios.post(
   "http://127.0.0.1:8001/chat",
   {name,message:msg}
  )

  setChat(prev=>[
   ...prev,
   {sender:"ira",text:res.data.reply}
  ])

  setMsg("")
 }

 return(
  <div style={styles.container}>

   <h2 style={{color:"white"}}>IRA 💕</h2>

   <AnimeAvatar/>

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

   <input
    value={msg}
    onChange={e=>setMsg(e.target.value)}
    placeholder="Talk to IRA..."
    style={styles.input}
   />

   <button onClick={send} style={styles.btn}>
    Send 💌
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