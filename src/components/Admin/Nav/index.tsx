import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useGetWindowAvailSize } from "../../../Hooks";

const Nav = ({ setToggle, toggle }: any) => {
  const { admin }: any = useSelector((state: any) => state.admin);
  const { width } = useGetWindowAvailSize();
  const Func = () => setToggle(!toggle);
  return (
    <nav
      className={`flex items-center sticky justify-between top-0 w-full bg-white border-b border-[#E8E9ED] px-3 z-[333] ${
        width <= 943 ? "h-24 min-h-[100px]" : ""
      }`}
    >
      <div className="flex justify-evenly items-center gap-8 px-[10px] text-base">
        <span className="py-[0.6rem] md:text-xl ">
          {admin.isOfficer ? "Police Fraud Unit" : "Request"}
        </span>
        <button
          data-bs-toggle={width <= 1275 ? "offcanvas" : ""}
          className="bg-transparent text-xl"
          data-bs-target={width <= 1275 ? "#Smallscreensiderbar" : ""}
          aria-controls={width <= 1275 ? "Smallscreensiderbar" : ""}
          onClick={() => {
            width >= 1275 && Func();
          }}
        >
          {width <= 1275 ? (
            <AiOutlineMenu />
          ) : toggle ? (
            <AiOutlineMenu />
          ) : (
            <RxCross2 />
          )}
        </button>
      </div>
      {admin.isOfficer ? (
        <div className="flex gap-1  flex-row justify-around items-center">
          <div className="flex flex-col border p-2 rounded-md shadow-md">
            <span className="text-muted text-[0.78rem]">
              Wallet Balance : <strong> N54,000</strong>
            </span>
            <span className="text-muted text-[0.78rem]">
              Wallet Account Number : <strong>9039948312</strong>{" "}
            </span>
            <span className="text-muted text-[0.78rem]">
              Bank Name: <strong>Wema Bank</strong>{" "}
            </span>
          </div>
          <div className="flex flex-col p-2 rounded-md">
            <span className="text-muted text-[0.78rem]">
              {admin.rankName} {admin.name}
            </span>
            <span className="text-muted text-[0.78rem] text-center ">
              Time login: {formatDate(new Date(admin.timeLogin))}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Nav;

function formatDate(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string = "Damilare") {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    // children: `${"Damilare hhhh".split(' ')[0][0]}${"Damilar jj".split(' ')[1][0]}`.toUpperCase(),
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase(),
  };
}

export function BackgroundLetterAvatars({ name }: any) {
  return <Avatar {...stringAvatar(name)} />;
}
