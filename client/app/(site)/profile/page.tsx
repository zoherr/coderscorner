'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Hero from '@/components/Hero'
import Feature from '@/components/Features'
import FunFact from '@/components/FunFact'
import Integration from '@/components/Integration'
import CTA from '@/components/CTA'
import FAQ from '@/components/FAQ'
import Testimonial from '@/components/Testimonial'
import Contact from '@/components/Contact'
import Blog from '@/components/Blog'
import Heading from '@/app/utils/heading'
import Profile from '@/components/profile/profile'
import { useSelector } from 'react-redux'
import Header from '@/components/Header'

type Props = {}

const page: FC<Props> = (props) => {
  const { user } = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login")

  return (
    <div>
      <Protected>
        <Profile user={user} />
        <Heading
          title={`${user.name}`}
          description="Elevate your programming skills, solve challenges, and unlock the world of coding possibilities.made by SMB innovation"
          keywords="smb innovation,smb innov,zoher rangwala,Zoher Rangwala,Zoher R,Coder's Corner,coder's corner,coder's-corner"
        />

      </Protected>

    </div>
  )
}

export default page;