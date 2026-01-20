import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login(){
  const [name,setName] = useState("")
  const nav = useNavigate()

  return(
    <div style={{color:"white",textAlign:"center",marginTop:"100px"}}>
      <h1>Welcome to IRA 💖</h1>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={e=>setName(e.target.value)}
        style={{padding:"10px"}}
      />

      <br/><br/>

      <button
        onClick={()=>nav("/chat",{state:{name}})}
        style={{padding:"10px"}}
      >
        Start Chat
      </button>
    </div>
  )
}