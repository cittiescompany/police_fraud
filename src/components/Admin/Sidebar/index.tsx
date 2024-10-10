import React from 'react'
import Style from './style.module.css';
import { ImProfile } from "react-icons/im"
import { GrProjects } from "react-icons/gr"
import { NavLink } from 'react-router-dom';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa"
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';


interface obj { text: string, icons: any, link: string, click?: any }

const data = [
  { text: "New petition approval console", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/new-petition" },
  { text: "Post No Debit Request", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/court" },
  { text: 'Document verification', icons: <GrProjects size={20} />, link: "/admin/dashboard/verify" },
  { text: "Bank account validation", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/bank-account" },
  { text: "Bank statement", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/bank-statement  " },
  { text: "Phone call log", icons: <FaBriefcase size={20} />, link: "/admin/dashboard" },
  { text: "Arrest warrant", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/warant-arrest" },
  { text: "Whatsapp family and friends", icons: <FaBriefcase size={20} />, link: "/admin/dashboard" },
  { text: "Social media tracking", icons: <FaBriefcase size={20} />, link: "/admin/dashboard" },
  { text: "Conference (Zoom) meeting with officers", icons: <FaBriefcase size={20} />, link: "/admin/dashboard" },
  { text: "Legal console", icons: <FaBriefcase size={20} />, link: "/admin/legal-console" },
  { text: "Dispatch driver", icons: <FaBriefcase size={20} />, link: "/admin/dispatch-driver" },
  { text: "Request for cab", icons: <FaBriefcase size={20} />, link: "/admin/request-cab" },
  { text: "Report fraud", icons: <FaBriefcase size={20} />, link: "/admin/report-fraud" },
  { text: "Order food", icons: <FaBriefcase size={20} />, link: "/admin/order-food" },
  { text: "Health (Hospital)", icons: <FaBriefcase size={20} />, link: "/admin/health-hospital" },
  { text: "Cell Daily attendance", icons: <FaBriefcase size={20} />, link: "/admin/daily-attendance" }
];
const data1 = [
  { text: 'Document verification', icons: <GrProjects size={20} />, link: "/admin/dashboard" },
];



const LargeScreenSidebar = ({ toggle }: any) => {

  return (
    <nav className={`${Style.Navbar} bg-[#FFFFFF] w-full max-h-screen overflow-y-scroll shadow pb-[30px] -webkit-scrollbar:w-[20px]`}>
      <Links toggle={toggle} />
    </nav>
  )
}

export default LargeScreenSidebar;

const activeStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? "blue" : '#FFF',
  transform: `scale(${isActive ? "1.001" : '1'})`,
  color: isActive ? '#8e8ee6' : 'rgb(48, 45, 45)',
  transition: isActive ? `ease-out 0.5s` : '',
})

export const Links = ({ toggle, }: any) => {
  const { admin } = useSelector((state: any) => state.admin)
  console.log(admin)

  return (
    <main className='m-h-[90%] w-full list-none flex flex-col gap-1'>

      {(admin.isOfficer ? data : data1).map((item: obj, index: number) =>
        <button data-bs-dismiss="offcanvas" id={Style.linkButton} onClick={() => item.click ? item.click() : undefined} key={index} aria-label="Close" className='hover:bg-[blue]  hover:text-[#fff] border-2  text-[0.8rem] m-h-[10%] bg-[#FAFAFA] px-5 py-1 md:p-5 '>
          <NavLink to={item.link} className='w-full grid no-underline py-3 md:py-4  text-xs grid-cols-[20%_80%]  text-transparent  font-normal bg-transparent' style={({ isActive }) => activeStyle(isActive)} key={index} >
            <span data-bs-dismiss="offcanvas" aria-label="Close">
              {item.icons}
            </span>
            {toggle ?
              <span data-bs-dismiss="offcanvas" aria-label="Close">
                {item.text}
              </span> :
              <></>}
          </NavLink>
        </button>

      )}
    </main>
  )
}












