'use client'
import React from 'react'
import CreateCourse from '@/components/Admin/Course/CreateCourse'
import Courses from '@/components/Admin/courses/Courses'
import AllCourse from '@/components/Admin/courses/Courses'
type Props = {}

const CoursesPage = (props: Props) => {
  return (
    <div>
        <AllCourse />
    </div>
  )
}

export default CoursesPage