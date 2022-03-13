import React, { useEffect, useState } from 'react'
import './sidebar.css'
import axios from "axios"
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  const [cats, setCats] = useState([])

  useEffect(()=>{
    const getCats = async()=>{
      const res = await axios.get("/cat");
      // console.log(res);
      setCats(res.data);
    }
    getCats();
  }, [])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <div className="sidebarTitle">About me</div>
        <img src="/assets/post2.jpg" alt="" className="sidebarimg" />
        <div className="sidebardesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti officiis aut dolores accusantium magnam quas, assumenda ducimus ad alias voluptates voluptatem consequatur quos quod natus.</div>
      </div>

      <div className="sidebarItem">
      <div className="sidebarTitle">Catagories</div>
        <ul className='sidebarList'>
          {cats.map((c)=>(
            <Link className='link' to={`/?cat=${c.name}`} key={c._id}>
              <li className="sidebarlistitems">{c.name}</li>
            </Link>
          ))}
          {/* <li className="sidebarlistitems">Life</li>
          <li className="sidebarlistitems">Music</li>
          <li className="sidebarlistitems">Style</li>
          <li className="sidebarlistitems">Sport</li>
          <li className="sidebarlistitems">Tech</li>
          <li className="sidebarlistitems">Cinema</li> */}
        </ul>
      </div>

      <div className="sidebarItem">
      <div className="sidebarTitle">Follow Us</div>
        <div className="sidebarsocial">
          <i className="fa-brands fa-facebook-square"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram-square"></i>
          <i className="fa-brands fa-github"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>
  )
}
