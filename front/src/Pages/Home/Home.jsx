import React, { useEffect, useState } from 'react'
import { Header } from '../../src/Header/Header'
import { Posts } from '../../src/posts/Posts'
import { Sidebar } from '../../src/sidebar/Sidebar'
import "./Home.css"
import axios from "axios";
import { useLocation } from 'react-router-dom'

export const Home = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  console.log(location);

  useEffect(()=>{
    const fetchPost = async()=>{
      const allPosts = await axios.get("/post"+location.search);
      // console.log(allPosts.data)
      setPost(allPosts.data);
    }
    fetchPost();
  }, [location])
  return (
    <>
        <Header/>
        <div className="home">
          <Posts posts={post}/>
          <Sidebar/>
        </div>
    </>
  )
}
