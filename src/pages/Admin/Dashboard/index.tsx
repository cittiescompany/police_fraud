import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Style from "./style.module.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Card from "../../../components/Admin/Card";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import { adminUrl } from "../../../BackendUrl";
import { useGetData } from "../../../content";
import { MdOutlineCases } from "react-icons/md";
import { FaNairaSign } from "react-icons/fa6";

const AdminDashboard = () => {
  const { admin }: any = useSelector((state: any) => state.admin);
  console.log(admin);
  return (
    <section className="">
      <main>
        <div className=" grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          <Card
            color={"#3A769E"}
            icon={<MdOutlineCases />}
            text={"Petitions"}
            number={admin?.petition["COUNT(*)"]}
          />
          <Card
            color={"#3A769E"}
            text={"Total Amount Of Petitions"}
            icon={<FaNairaSign />}
            number={`N ${Number(
              admin?.total_petition_amount?.total_amount
            ).toLocaleString()}`}
          />
          <Card
            color={"#3A769E"}
            text={"Posts"}
            icon={<BiAddToQueue />}
            number={0}
          />
          <Card
            color={"#3A769E"}
            text={"Posts"}
            icon={<BiAddToQueue />}
            number={0}
          />
          <Card
            color={"#3A769E"}
            text={"Reports"}
            icon={<MdOutlineReport />}
            number={600}
          />
        </div>
      </main>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"></main>
    </section>
  );
};

export default AdminDashboard;

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: 'top',

//     },
//   },
//   scales: {
//     x: {
//       type: 'category',
//     },
//     y: {
//       type: 'linear',
//       beginAtZero: true,
//     },
//   },
// };

// const LineChart = ({ label, labels = [], vals = [], ...rest }: any) => {
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: label,
//         data: vals,
//         borderColor: 'rgba(153,102,255,1)',
//         borderWidth: 2,
//       },
//     ],
//   };
//   return (<Line data={data} options={options} />
//   )
// };
