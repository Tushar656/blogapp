import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import axios from "axios"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const clickHendler = async(e) =>{
    e.preventDefault();
    setError(false)
    try{
      const res = await axios.post('/auth/register', {
        username,
        password, 
        email
      })
      res.data && window.location.replace('/login');
    }catch(err){
      setError(true);
    }
  }
  return (
    <div className='register'>
        <h1>Create New Account</h1>
        <form className="loginform" onSubmit={clickHendler}>
            <label>Username</label>    
            <input type="text" placeholder='Enter Your username...' onChange={(e)=> setUsername(e.target.value)}/>
            <label>Email</label>    
            <input type="text" placeholder='Enter Your Email...' onChange={(e)=> setEmail(e.target.value)}/>
            <label>Password</label>    
            <input type="text" placeholder='Enter Your Password...' onChange={(e)=> setPassword(e.target.value)}/>
            <button className="lgnbtn">Register</button>
            <button className="lgnregbtn">
              <Link className='link' to="/login">Login</Link>  
            </button>
            {error && <span style={{color:"tomato", marginTop:"10px"}}><b>Something went wrong!</b></span>}
        </form>
    </div>
  )
}
