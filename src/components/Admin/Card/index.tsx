import React from "react";
import { useSelector } from "react-redux";

const Card = ({ color, text, number, icon }: any) => {
  return (
    <section className="w-full ">
      {true ? (
        <div className=" flex cursor-pointer bg-blue-500  text-center w-full items-center py-4  transition-all justify-around text-white shadow-2xl rounded-lg ease-out duration-1000">
          <div className="text-3xl ">{icon}</div>
          <div>
            <p className="text-[0.8rem]">{text}</p>
            <h3 className="text-[1rem]">{number}</h3>
          </div>
        </div>
      ) : (
        <div
          className="loader7798876 h-full py-4 relative w-full rounded-xl mb-[10px]"
          style={{ background: color }}
        >
          <div className=" w-full h-full relative">
            <div className=" rounded-[50%] bg-[#cacaca] w-[50px] h-[50px]"></div>
            <div className=" bg-[#cacaca] absolute top-[10px] left-[58px] h-[20px] w-2/5 rounded-[20px]"></div>
            <div className=" bg-[#cacaca] absolute top-[34px] w-[150px] left-[58px] h-[10px]"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Card;
