// SidebarProfile.tsx
import Image from 'next/image';
import { NAVLINKS } from "./data"
import { motion } from "framer-motion";
import { FaRegEye, FaVideo } from "react-icons/fa";
import React, { FC, useState } from 'react';
import { FaUserNinja } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';

type Props = {
  user: any
  active: number
  avatar: string | null
  setActive: (active: number) => void
  logOutHandler: any
}
const SidebarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {

  return (
    <div className=" w-[60%] 		mx-auto	  flex  border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]  p-3 rounded-md dark:bg-[#1e1e1e] dark:border-black/40 dark:bg-opacity-75">
      <div
        className={`w-full rounded-md flex items-center justify-center px-3  py-4 cursor-pointer ${active === 1 ? "dark:bg-[#3E3E3E] bg-[#adadad]" : "bg-transparent"
          }`}
        onClick={() => setActive(1)}
      >
        <FaUserNinja
          size={20}
          className="cursor-pointer dark:text-white text-black rounded-full"
        />
        {/* <Image
        src={user.avatar || avatar || avatarDefault}
        alt=""
        className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] cursor-pointer rounded-full"
      /> */}
        <h5 className="pl-2 sm:block hidden  mx-1 dark:text-white text-black">
          My Account
        </h5>
      </div>
      {/* <div
        className={`w-full flex rounded-md  items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
          }`}
        onClick={() => setActive(2)}
      >
        <FaRegEye size={20}
          className="cursor-pointer dark:text-white text-black rounded-full" />
        <h5 className="pl-2 sm:block hidden dark:text-white text-black">Change Password</h5>
      </div> */}

      <div
        className={`w-full mx-1 flex rounded-md items-center justify-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
          }`}
        onClick={() => setActive(2)}
      >
        <FaVideo size={20}
          className="cursor-pointer dark:text-white text-black rounded-full" />
        <h5 className="pl-2 sm:block hidden dark:text-white text-black">Enrolled Course</h5>
      </div>
{/* -Admin Dashboard- */}
   {
    user.role === "admin" && (
 
      <Link
      className={`w-full  mx-1 sm:flex hidden rounded-md items-center justify-center px-3 py-4  cursor-pointer ${active === 5 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent "
        }`}
      href={"/admin"}
    >
      <MdAdminPanelSettings  size={20}
        className="cursor-pointer dark:text-white text-black rounded-full " />
      <h5 className="pl-2  dark:text-white sm:block hidden text-black">Admin</h5>
    </Link>

    )
   }
{/* -Admin Dashboard- */}
      <div
        className={`w-full flex rounded-md items-center justify-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
          }`}
        onClick={() => logOutHandler()}
      >
        <IoLogOut size={20}
          className="cursor-pointer dark:text-white text-black rounded-full" />
        <h5 className="pl-2 sm:block hidden dark:text-white text-black">Logout</h5>
      </div>
    </div>

  )

}

export default SidebarProfile;
