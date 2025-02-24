'use client'
import React from 'react'
import CreateCourse from '@/components/Admin/Course/CreateCourse'
import Blog from '@/components/Blog'
import Blogs from '@/components/Admin/Blog/blogs'
type Props = {}

const BlogPage = (props: Props) => {
  return (
    <div>
        <Blogs />
    </div>
  )
}

export default BlogPage