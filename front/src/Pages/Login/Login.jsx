import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/context';
import './Login.css'
import axios from "axios"

export default function Login() {
  const emailref = useRef();
  const passwordref = useRef();

  const {dispatch, isFetching} = useContext(Context);
  const submitHendlar = async(e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      const res = await axios.post("/auth/login", {
        email: emailref.current.value,
        password: passwordref.current.value,
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
      dispatch({type: "LOGIN_FAILURE"});
    }
  }
  return (
    <div className='login'>
        <h1>Login</h1>
        <form className="loginform" onSubmit={submitHendlar}>
            <label>Email</label>    
            <input type="text" placeholder='Enter Your Email...' ref={emailref}/>
            <label>Password</label>
            <input type="text" placeholder='Enter Your Password...' ref={passwordref}/>
            <button className="lgnbtn" type='submit' disabled={isFetching}>Login</button>
            <button className="lgnregbtn">
                <Link className='link' to="/register">Register</Link> 
            </button>
        </form>
    </div>
  )
}
