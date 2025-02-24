'use client'
import BlogDetailPage from '@/components/Admin/Blog/BlogDetailPage'
import React from 'react'

type Props = {}

const Page = ({params}:any) => {
  return (
    <div className='w-full'>
      <BlogDetailPage id={params.id} />
    </div>
  )
}

export default Page