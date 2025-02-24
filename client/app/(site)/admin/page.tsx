'use client'
import Heading from '@/app/utils/heading'
import React, { useState } from 'react'
import AdminSidebar from '@/components/Admin/Sidebar/sidebar'
import AdminProtected from '../hooks/adminProtected'
import AdminDashboard from '@/components/Admin/Hero/adminDashboard'
import CoursePage from './create-course/page'
import CoursesPage from './courses/page'
import BlogPage from './Blog/page'
import UserPage from './User/page'
import Team from './Team/page'
import FormData from './Form/page'
import OrderData from './Order/page'
import BlogData from '@/components/Admin/Blog/BlogData'
import OrderDataFailed from './Order/failed'

type Props = {

}

const Page = (props: Props) => {
  const [active, setActive] = useState(11);

  return (

    <div className=' flex h-[200vh]'>
      <AdminProtected>
        <Heading
          title="Admin Dashboard - Coder's Corner"
          description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.made by SMB innovation"
          keywords="smb innovation,smb innov,zoher rangwala,Zoher Rangwala,Zoher R,Coder's Corner,coder's corner,coder's-corner"
        />

        {/* --Admin Sidebar */}
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar active={active} setActive={setActive} />
        </div>
        {/* --Admin Sidebar */}


        {/* --Admin Content */}
        <div className='w-[85%] mt-20 '>

          {

            active === 11 && (
              <div className=''>
                <AdminDashboard />
              </div>
            )
          }


          {

            active === 12 && (
              <div className=''>
                <UserPage />
              </div>
            )
          }

          {

            active === 13 && (
              <div className=''>
                <CoursePage />
              </div>
            )
          }

          {

            active === 14 && (
              <div className=''>
                <CoursesPage />
              </div>
            )
          }

          {

            active === 15 && (
              <div className=''>
                <OrderData />
              </div>
            )
          }

          {

            active === 16 && (
              <div className=''>
                <Team />
              </div>
            )
          }

          {

            active === 17 && (
              <div className=''>
                <BlogPage />
              </div>
            )
          }
          
          {

active === 19 && (
  <div className=''>
    <BlogData />
  </div>
)
}

          {

            active === 18 && (
              <div className=''>
                <FormData />
              </div>
            )
          }

{

active === 20 && (
  <div className=''>
    <OrderDataFailed />
  </div>
)
}


        </div>
        {/* --Admin Content */}
      </AdminProtected>

    </div>
  )
}

export default Page;