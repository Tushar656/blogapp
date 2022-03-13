import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/context'
import { Sidebar } from '../../src/sidebar/Sidebar'
import './Setting.css'
import axios from "axios"

export default function Setting() {
    const {user, dispatch} = useContext(Context)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("");
    const [success, setSuccess] = useState(false)

    const PF = "http://localhost:5000/images/"

    useEffect(() => {
      const getUserData = async()=>{
          const res = await axios.get("/user/"+user._id);
          setUsername(res.data.username);
          setEmail(res.data.email);
          console.log(res.data.username);
      }
      getUserData();
    }, [user])
    

    const submitHendler = async(e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            email,
            username,
            password
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePicture = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){}
        }
        try{
            const res = await axios.put("/user/"+user._id, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data});
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"});
        }
    }

    const deleteHendler = async()=>{
        try{
            await axios.delete("/user/"+user._id, {data: {userId: user._id}}) 
            dispatch({type: "LOGOUT"});
            window.location.replace("/register")
        }catch(err){}
    }

  return (
    <div className='settings'>
        <div className="settingwraper">
            <div className="updlt">
                <div className="updateacc">Update Your Account</div>    
                <div className="deleteacc" onClick={deleteHendler}>Delete Account</div>    
            </div>  
            <form className="settingform" onSubmit={submitHendler}>
               <label>Profile Picture</label>
               <div className="settingPP">
                    <img src={file ? URL.createObjectURL(file) : PF+user.profilePicture} alt="" className="settingimg" />   
                    <label htmlFor="pictureinput">
                        <i className="far fa-user-circle"></i>    
                    </label>
                </div>
                <input type="file" id='pictureinput' style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])}/>

                <label>Username</label>
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="text" onChange={(e)=> setPassword(e.target.value)}/>
                <button className="settingSubmit">Update</button>
            </form>  
            {success && <span className='success'>Profile has been Updated Successfully...</span>}
        </div>
        <Sidebar/>
    </div>
  )
}
