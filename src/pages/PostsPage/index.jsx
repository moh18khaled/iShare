import React from 'react'
import Header from './Header'
import Companies from './Companies'
import Categories from './Categories'
import PostCard from './PostCard'

const PostsPage = () => {
  return (
    <div className='bg-[#F9F9F9]'>
      <Header />
      <Companies />
      <Categories />
      <PostCard />
    </div>
  )
}

export default PostsPage
