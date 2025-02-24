'use client'
import React from 'react'
import CreateCourse from '@/components/Admin/Course/CreateCourse'
import EditCourse from '@/components/Admin/Course/EditCourse'
import Link from 'next/link'
import { style } from '@/app/styles/style'
type Props = {}

const page = ({params}) => {
  const id = params.id

  return (
    <div className='my-[100px]'>
        <Link href={`/admin`} >
            <button className={`${style.button} w-12`}>Back</button></Link>
        <EditCourse id={id}/>
    </div>
  )
}

export default page