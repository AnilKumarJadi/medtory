import React from 'react'
import {useNavigate} from 'react-router-dom'



const NotFound = () => {
const navigate=useNavigate();
  return (
    <>
    <h3>Not Found.......</h3>
    <button onClick={()=>navigate('/')}>Back to Home</button>
    </>
  )
}

export default NotFound