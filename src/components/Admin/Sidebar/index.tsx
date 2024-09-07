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


interface obj { text: string, icons: any, link: string, click?: any }

const data: obj[] = [
  { text: 'Dashboard', icons: <GrProjects size={20} />, link: "/admin/dashboard" },
  { text: "Individual ", icons: <ImProfile size={20} />, link: "/admin/dashboard/users/individual-accounts" },
  { text: "Business account", icons: <FaBriefcase size={20} />, link: "/admin/dashboard/users/business-acounts/" },
  { text: "Communities", icons: <FaPeopleGroup size={20} />, link: "/admin/dashboard/communities/" },
  {
    text: "Log Out", icons: <FaSignOutAlt size={20} color='red' />, link: "/", click: () => {
      localStorage.removeItem("adminLoginToken")
    }
  },
]


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

  return (
    <main className='m-h-[90%] w-full list-none flex flex-col gap-1'>

      {data.map((item: obj, index: number) =>
        <button data-bs-dismiss="offcanvas" onClick={() => item.click ? item.click() : undefined} key={index} aria-label="Close" className='hover:bg-[blue] hover:text-[#fff] border-2  text-[16px] m-h-[10%] bg-[#FAFAFA] px-5 py-1 md:p-5 '>
          <NavLink to={item.link} className='w-full grid no-underline py-3 md:py-4 px-2 text-xs grid-cols-[20%_80%]  text-transparent  font-normal bg-transparent' style={({ isActive }) => activeStyle(isActive)} key={index} >
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
      <App />
    </main>
  )
}













const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <b rel="noopener noreferrer" className='py-4'>
        2nd menu item (disabled)
      </b>
    ),
    icon: <SmileOutlined />,
  },
  {
    key: '3',
    label: (
      <b rel="noopener noreferrer" className='py-4'>
        3rd menu item (disabled)
      </b>
    ),
  },

];

const App: React.FC = () => (
  <Dropdown menu={{ items }} arrow placement="topRight" className="custom-dropdown">
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

