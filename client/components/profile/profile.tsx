'use client'
import React, { useState } from 'react'
import { FC } from 'react'
import SidebarProfile from '../Sidebar/sidebarprofile'
import { useLogOutQuery } from '@/redux/features/Auth/authApi'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileInfo from '../profileinfo/profile-info'
UserCourseInfo
import UserCourseInfo from '../profileinfo/UserCourseInfo'

type Props = {
  user: any
}

const profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar)
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false
  });
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect("/");
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="overflow-hidden py-25   ">
      <div className='' >
        <SidebarProfile user={user} active={active} avatar={avatar} setActive={setActive} logOutHandler={logOutHandler} />
      </div>
      {

        active === 2 && (
          <div className='py-10'>
            <UserCourseInfo user={user}  />
          </div>
        )
      }

      {

        active === 1 && (
          <div className='py-10'>
            <ProfileInfo user={user} avatar={avatar} />
          </div>
        )
      }
    </div>
  )
}

export default profile