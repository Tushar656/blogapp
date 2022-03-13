import { Post } from '../Post/Post'
import './posts.css'

export const Posts = ({posts}) => {
  return (
    <div className='post'>
      {
        posts.map((p)=>(
          <Post post={p}/>  
        ))
      } 
    </div>
  )
}
