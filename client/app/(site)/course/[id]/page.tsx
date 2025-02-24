'use client'
import React from 'react'
import CourseDetailPage from "@/components/Course/CourseDetailPage";

type Props = {}

const Page = ({params}:any) => {
  return (
    <div className='py-20 lg:py-25 xl:py-30'>
      <CourseDetailPage id={params.id} />
    </div>
  )
}

export default Page