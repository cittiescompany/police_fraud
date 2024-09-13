import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { useGetWindowAvailSize } from '../../../Hooks'
const Nav = ({ setToggle, toggle }: any) => {
  const { admin }: any = useSelector((state: any) => state.admin);
  const { width } = useGetWindowAvailSize()
  const Func = () => setToggle(!toggle);
  return (
    <nav className={`flex items-center sticky justify-between top-0 w-full bg-white border-b border-[#E8E9ED] px-3 z-[333] ${width <= 943 ? 'h-24 min-h-[100px]' : ''}`}>
      <div className='flex justify-evenly items-center gap-8 px-[10px] text-base'>
        <span className='py-[0.6rem] md:text-xl '>Police Fraud Unit</span>
        <button data-bs-toggle={width <= 1275 ? "offcanvas" : ""} className='bg-transparent text-xl' data-bs-target={width <= 1275 ? "#Smallscreensiderbar" : ""}
          aria-controls={width <= 1275 ? "Smallscreensiderbar" : ""}
          onClick={() => {
            (width >= 1275 && Func())
          }}>{width <= 1275 ? <AiOutlineMenu /> : toggle ? <AiOutlineMenu /> : <RxCross2 />}</button>
      </div>
      <div className='grid  justify-around items-center'>
        <span className='text-md'> <BackgroundLetterAvatars name={`${admin?.name}`} /></span>
      </div>

    </nav>
  )
}

export default Nav


function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

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
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
  };
}

export function BackgroundLetterAvatars({ name }: any) {
  return (
    <Avatar {...stringAvatar(name)} />
  );
}