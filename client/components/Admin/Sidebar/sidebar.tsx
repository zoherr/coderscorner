import React, { FC, useState } from "react";
import "./style.css";
import logo from "./logo.svg";
import { NAVLINKS } from "./data";
import { FaBlogger, FaVideo } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { FaSquarePen } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { GiSkullCrossedBones } from "react-icons/gi";


type Props = {
  active: number
  setActive: (active: number) => void
}

interface NavItem {
  name: string;
  path: string;
  icon: string;
  active: number
}

const AdminSidebar: FC<Props> = ({ active, setActive }) => {
  const [isHover, setIsHover] = useState<boolean>(true);

  return (
    <aside className={`sidebar ${isHover ? "active" : ""} text-black dark:text-white dark:bg-blacksection bg-white pt-28`}>
      {/* <div className="open-btn" onClick={() => setIsHover((prev) => !prev)}>
        <span className="material-symbols-outlined">chevron_right</span>
      </div> */}
      <div className="wrapper">
        <div className="top__wrapper">
          {/* <div className="header">
            <span className="header-logo">
              <img src={logo} alt="" />
            </span>
            <div className="header-details">
              <span className="header-name">Hey, Admin</span>
              <span className="header-email">Admin Dashboard</span>
            </div>
          </div> */}
          {/* <div className="search-box">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input type="text" name="searchBox" placeholder="Search..." />
          </div> */}
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              {/* <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 11 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(11)}
              >
                <IoHome size={20}
                  className="cursor-pointer dark:text-white text-black " />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Home</h5>
              </div> */}

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 12 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(12)}
              >
                <FaUser size={20}
                  className="cursor-pointer dark:text-white text-black rounded-full" />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">User</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 13 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(13)}
              >
                <IoIosCreate size={20}
                  className="cursor-pointer dark:text-white text-black " />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Create Course</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 14 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(14)}
              >
                <FaVideo size={20}
                  className="cursor-pointer dark:text-white text-black " />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Courses</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 15 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(15)}
              >
                <FaFileInvoiceDollar size={20}
                  className="cursor-pointer dark:text-white text-black " />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Payment</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 20 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(20)}
              >
                <GiSkullCrossedBones  size={20}
                  className="cursor-pointer dark:text-white text-black rounded-full" />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Failed Payment</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 16 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(16)}
              >
                <RiTeamFill size={20}
                  className="cursor-pointer dark:text-white text-black rounded-full" />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Our Team</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 17 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(17)}
              >
                <FaBlogger  size={20}
                  className="cursor-pointer dark:text-white text-black rounded-full" />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Create Blog</h5>
              </div>

            

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 19 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(19)}
              >
                <FaSquarePen size={20}
                  className="cursor-pointer dark:text-white text-black rounded-full" />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Blog Data</h5>
              </div>

              <div
                className={`w-full mx-1 flex rounded-md items-center pl-8 px-3 py-4 cursor-pointer ${active === 18 ? "dark:bg-slate-800 bg-slate-400" : "bg-transparent"
                  }`}
                onClick={() => setActive(18)}
              >
                <SiGoogleforms size={20}
                  className="cursor-pointer dark:text-white text-black " />
                <h5 className="pl-2 sm:block hidden dark:text-white text-black">Form Data</h5>
              </div>
            </ul>
          </nav>
        </div>
        {/* <div className="footer">
          <a href="/" className="nav-menu__link">
            <span className="material-symbols-outlined footer-icon">
              logout
            </span>
            <span className="footer-text">Logout</span>
          </a>
        </div> */}
      </div>
    </aside>
  );
}

export default AdminSidebar;
