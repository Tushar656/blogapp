import {React} from 'react'
import './Post.css'
import {Link} from "react-router-dom"

export const Post = ({post}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='PostContain'>
        {
          post.PostPicture && <img src={PF + post.PostPicture} alt="" className="postimg" />}
        <div className="postinfo">
          <div className="postCats">
            {
              post.categories.map(p=>(
                <div className="PostCat">{p}</div>  
              ))
            }
          </div> 
          <Link className='link' to={`/post/${post._id}`}>
            <span className="PostTitle">{post.title}</span>
          </Link> 
          <div className="posttime">{new Date(post.createdAt).toDateString()}</div>

          <p>{post.desc}</p>
        </div>
    </div>
  )
}
