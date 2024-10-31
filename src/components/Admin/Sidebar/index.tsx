import React from "react";
import Style from "./style.module.css";
import { ImProfile } from "react-icons/im";
import { GrProjects } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { FaPeopleGroup, FaRegFolderClosed } from "react-icons/fa6";
import { FaBriefcase, FaSignOutAlt, FaFlag } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { BiSolidUserAccount } from "react-icons/bi";
import { TbMessageReport, TbReportSearch } from "react-icons/tb";
import { MdDashboard, MdOutlineNoAccounts } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { AiOutlineAudit } from "react-icons/ai";

interface obj {
  text: string;
  icons: any;
  link: string;
  click?: any;
}

const data = [
  {
    text: "Dashboard",
    icons: <MdDashboard size={20} />,
    link: "/admin/dashboard/",
  },
  {
    text: "petition console",
    icons: <TbReportSearch size={20} />,
    link: "/admin/dashboard/petition",
  },
  {
    text: "Post No Debit Request",
    icons: <FaRegFolderClosed size={20} />,
    link: "/admin/dashboard/post-no-debit",
  },
  {
    text: "UnFreeze Requests",
    icons: <MdOutlineNoAccounts size={20} />,
    link: "/admin/dashboard/unfreeze",
  },
  {
    text: "Document verification",
    icons: <GrProjects size={20} />,
    link: "/admin/dashboard/verify",
  },
  {
    text: "Bank account validation",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard/bank-account",
  },
  {
    text: "Audit Trail",
    icons: <AiOutlineAudit size={20} />,
    link: "/admin/dashboard/audit-trail",
  },
  {
    text: "Bank statement",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard/bank-statement  ",
  },
  {
    text: "Phone call log",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard",
  },
  {
    text: "Arrest warrant",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard/warant-arrest",
  },
  {
    text: "Whatsapp family and friends",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard",
  },
  {
    text: "Social media tracking",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard",
  },
  {
    text: "Conference (Zoom) meeting with officers",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dashboard",
  },
  {
    text: "Legal console",
    icons: <FaBriefcase size={20} />,
    link: "/admin/legal-console",
  },
  {
    text: "Dispatch driver",
    icons: <FaBriefcase size={20} />,
    link: "/admin/dispatch-driver",
  },
  {
    text: "Request for cab",
    icons: <FaBriefcase size={20} />,
    link: "/admin/request-cab",
  },
  {
    text: "Report fraud",
    icons: <FaBriefcase size={20} />,
    link: "/admin/report-fraud",
  },
  {
    text: "Order food",
    icons: <FaBriefcase size={20} />,
    link: "/admin/order-food",
  },
  {
    text: "Health (Hospital)",
    icons: <FaBriefcase size={20} />,
    link: "/admin/health-hospital",
  },
  {
    text: "Cell Daily attendance",
    icons: <FaBriefcase size={20} />,
    link: "/admin/daily-attendance",
  },
  {
    text: "Log Out",
    icons: <CiLogout size={20} />,
    link: "/admin/daily-attendance",
    click: (nav: any) => {
      localStorage.removeItem("Authorization");
      nav("/admin/", { replace: true });
    },
  },
];
const data1 = [
  {
    text: "Post No Debit",
    icons: <GrProjects size={20} />,
    link: "/bank/dashboard/post-not-debit",
  },
  {
    text: "UnFreeze Request",
    icons: <BiSolidUserAccount size={20} />,
    link: "/bank/dashboard/unfreeze",
  },
  {
    text: "Report Fraud",
    icons: <TbMessageReport size={20} />,
    link: "/bank/dashboard",
  },
  {
    text: "Flag Account",
    icons: <FaFlag size={20} />,
    link: "/bank/dashboard",
  },
  {
    text: "Log Out",
    icons: <CiLogout size={20} />,
    link: "/admin/daily-attendance",
    click: (nav: any) => {
      localStorage.removeItem("Authorization");
      nav("/admin/", { replace: true });
    },
  },
];

const LargeScreenSidebar = ({ toggle }: any) => {
  return (
    <nav
      className={`${Style.Navbar} bg-[#FFFFFF] w-full max-h-screen overflow-y-scroll shadow pb-[30px] -webkit-scrollbar:w-[20px]`}
    >
      <Links toggle={toggle} />
    </nav>
  );
};

export default LargeScreenSidebar;

const activeStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? "blue" : "#FFF",
  transform: `scale(${isActive ? "1.001" : "1"})`,
  color: isActive ? "#8e8ee6" : "rgb(48, 45, 45)",
  transition: isActive ? `ease-out 0.5s` : "",
});

export const Links = ({ toggle }: any) => {
  const { admin } = useSelector((state: any) => state.admin);
  const nav = useNavigate();

  return (
    <main className="m-h-[90%] w-full list-none flex flex-col gap-1">
      {(admin.isOfficer ? data : data1).map((item: obj, index: number) => (
        <button
          data-bs-dismiss="offcanvas"
          id={Style.linkButton}
          onClick={() => (item.click ? item.click(nav) : undefined)}
          key={index}
          aria-label="Close"
          className="hover:bg-[blue]  hover:text-[#fff] border-2  text-[0.8rem] m-h-[10%] bg-[#FAFAFA] px-5 py-1 md:p-5 "
        >
          <NavLink
            to={item.link}
            className="w-full grid no-underline py-3 md:py-4  text-xs grid-cols-[20%_80%]  text-transparent  font-normal bg-transparent"
            style={({ isActive }) => activeStyle(isActive)}
            key={index}
          >
            <span data-bs-dismiss="offcanvas" aria-label="Close">
              {item.icons}
            </span>
            {toggle ? (
              <span data-bs-dismiss="offcanvas" aria-label="Close">
                {item.text}
              </span>
            ) : (
              <></>
            )}
          </NavLink>
        </button>
      ))}
    </main>
  );
};
