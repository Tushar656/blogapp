import React, { useContext, useEffect, useState } from 'react'
import './Singlepost.css'
import axios from "axios"
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../Context/context';

export default function SinglePost() {
  const PF = "http://localhost:5000/images/"
  const location = useLocation();
  const [post, setPost] = useState({})
  // console.log(location.pathname.split("/")[2]);
  const postId = location.pathname.split("/")[2];
  const {user} = useContext(Context)

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatenote, setUpdatenote] = useState(false);

  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axios.get("/post/"+postId);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [postId])

  const hendalDelete = async() =>{
    try{
      await axios.delete("/post/"+postId, {data: {username: user.username}});
      window.location.replace("/")
    }catch(err){}
  }

  const updateHendler = async() =>{
    try{
      await axios.put("/post/"+postId, {title, desc, username: user.username});
      setUpdatenote(false);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='SinglePost'>
      {post.PostPicture && <img src={PF + post.PostPicture} alt="" className="singlepostimg" />}
        <div className="singlepostinfo">
          {
            post.username === user?.username &&(
              <div className="editsection">
                <i className="fa-solid fa-trash-can" onClick={hendalDelete}></i>  
                <i className="fa-solid fa-pen-to-square" onClick={()=> setUpdatenote(true)}></i>
              </div>
            )
          }
          {
            updatenote ? 
            <input type="text" 
              className="singlePostTitleinput" 
              autoFocus={true} 
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            /> : (
              <span className="singlePostTitle">{title}</span>
            )
          }
          <div className="authdate">
            <div className="athr">Author: 
              <Link className='link' to={`/?user=${post.username}`}><b>{post.username}</b></Link>
            </div>
            <div className="singleposttime">{new Date(post.createdAt).toDateString()}</div>
          </div>

          {
            updatenote ? 
            <textarea type="text"
            className='postDescPinput'
              autoFocus={true} 
              value={desc}
              onChange={(e)=>{setDesc(e.target.value)}}
            /> : (
              <p className='postDescP'>{desc}</p>
            )
          }
          <button 
            className={`${updatenote ? 'postupdatebtn' : 'postupdatebtn noneclass'}`}
            onClick={updateHendler}
            >Update</button>
        </div>
    </div>
  )
}
