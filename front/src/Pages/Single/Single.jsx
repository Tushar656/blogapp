import React from 'react'
import './Single.css'
import { Sidebar } from '../../src/sidebar/Sidebar'
import SinglePost from '../../src/Singlepost/SinglePost'

export default function Single() {
  return (
    <div className='Single'>
        <SinglePost/>
        <Sidebar/>
    </div>
  )
}
