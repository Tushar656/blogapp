import React, { useContext, useState } from 'react'
import './Write.css'
import axios from "axios"
import { Context } from '../../Context/context';


export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const {user} = useContext(Context)

    const submitHendler = async(e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.PostPicture = filename;
            try{
                await axios.post("/upload", data);
            }catch(err){}
        }
        try{
            const res = await axios.post("/post", newPost);
            window.location.replace("/post/"+res.data._id)
        }catch(err){

        }
    }
  return (
    <div className='write'>
        {
            file &&(
            <img src={URL.createObjectURL(file)} alt=""
             className='writeimg'/>
        )}
        <form className="writeform" onSubmit={submitHendler}>
            <div className="writeformgrp">
                <label className='addIcon' htmlFor="inputfile">
                    <i className="fa-solid fa-plus"></i>    
                </label>
                <input type="file" id='inputfile'style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])}/>    
                <input type="text" placeholder='Title' className='inputTitle' autoFocus={true} onChange={(e)=> setTitle(e.target.value)}/>    
            </div>  
            <div className="writeformgrp">
                <textarea className="inputDesc" 
                placeholder='Tell Your Story...' 
                type="text"
                onChange={(e)=> setDesc(e.target.value)}></textarea>    
            </div> 
            <button className='writebtn' type='submit'>Publish</button> 
        </form>
    </div>
  )
}
