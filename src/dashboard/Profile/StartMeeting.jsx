import React, { useContext, useEffect ,useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../App'

const StartMeeting = () => {
    const param =useParams()
    const {liveLink} =useContext(AppContext)
    const [source,setSource]=useState("")

    useEffect(()=>{
        if(liveLink){
           setSource(liveLink)
        }
        else if(localStorage.getItem("role") ==="instructor" && !liveLink){
setSource("http://localhost:3001/")
        }

    },[])
  return (
    <div className="start-meeting">
          <iframe
        src={source} 
        allowFullScreen
          allow="camera; microphone; fullscreen ; clipboard-read; clipboard-write"
        title="Embedded Page"
      ></iframe>
    </div>
  )
}

export default StartMeeting