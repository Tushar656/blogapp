import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../Context/context';
import "./topbar.css"

export default function Tobbar() {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"});
  }
  return (
    <>
        <div className="topbar">
            <div className="topleft">
                <Link 
                  to={{pathname: "https://www.facebook.com/profile.php?id=100063886343494"}}
                  className="link"
                  target="_blank"><i className="fa-brands fa-facebook-square"></i>
                </Link>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram-square"></i>
                <Link 
                  to={{pathname: "https://github.com/Tushar656"}}
                  className="link"
                  target="_blank"><i className="fa-brands fa-github"></i>
                </Link>
                <i className="fa-brands fa-linkedin"></i>
            </div>
            <div className="topcenter">
              <ul className="toplist">
                <li className="toplistitem">
                  <Link className='link' to="/">Home</Link>  
                </li>
                <li className="toplistitem">
                  <Link className='link' to="/">About</Link> 
                </li>
                <li className="toplistitem">
                  <Link className='link' to="/">Contact</Link> 
                </li>
                <li className="toplistitem">
                  <Link className='link' to="/write">Write</Link> 
                </li>
                <li className="toplistitem">
                  {user && <Link className='link' to="/login" onClick={handleLogout}>Logout</Link>}
                </li>
              </ul>
            </div>
            <div className="topright">
              {
                user ? (
                  <>
                    <Link to={"/setting"}><img src={PF+user.profilePicture} alt="" /></Link>
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                  </>
                ):(
                  <ul className='toplist'>
                    <li className="toplistitem">
                      <Link className='link' to="/login">Login</Link>  
                    </li>
                    <li className="toplistitem">
                      <Link className='link' to="/register">Register</Link>  
                    </li>
                  </ul>
                )
              }
            </div>
        </div>
    </>
  )
}
