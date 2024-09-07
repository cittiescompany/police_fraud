import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Style from "./style.module.css";
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import Card from '../../../components/Admin/Card'
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUsers } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import { MdOutlineReport } from "react-icons/md";
import { adminUrl } from '../../../BackendUrl';
import { useGetData } from '../../../content';
const months: any = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};


const filterData = (data: any, state: any = true): any => {
  const keys: any = []
  const vals: any = []
  Object.entries(data).map(([key, val]: any) => {
    vals.push(val)
    const [year, month] = key.split("-")
    const concatdata = `${year}-${months[month]}`
    keys.push(state ? concatdata : year)
  })
  return { keys, vals }
}
const AdminDashboard = () => {
  const [chartMaYdata, setChartMaYdata] = useState<any>(undefined)
  const [data] = useGetData(`${adminUrl}get_dashboard_data`)
  const [active, setState] = useState('Monthly')
  useEffect(() => {
    setChartMaYdata([])
  }, [data, active])

  return (
    <section className="">
      <main>
        <div className=' grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
          <Card color={"#3A769E"} icon={<FaUsers />} text={"Users"} number={0} />
          <Card color={"#3A769E"} text={"Communties"} icon={<FaPeopleGroup />} number={0} />
          <Card color={"#3A769E"} text={"Posts"} icon={<BiAddToQueue />} number={0} />
          <Card color={"#3A769E"} text={"Posts"} icon={<BiAddToQueue />} number={0} />
          <Card color={"#3A769E"} text={"Reports"} icon={<MdOutlineReport />} number={600} />
        </div>
      </main>
      <main className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        {/* <div className=''>
          <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
            <span className='sm:text-[1.1rem] text-[0.8rem] font-medium '>List of user register {active}</span>
            <div className="flex items-center justify-center  mb-2 bg-gray-100 space-x-4">
              {['Monthly', 'Yearly'].map((val) =>
                <button key={val} onClick={() => setState(val)} className={` bg-gradient-to-r border-[0.22rem] border-[#3b82f6] from-blue-500 to-purple-500 text-${active == val ? "white" : "black-200"}  font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 text-sm`}>
                  {val}
                </button>)}
            </div>
          </div>
          <div className='w-full h-[420px]'>
            <LineChart labels={chartMaYdata ? chartMaYdata?.keys : []} vals={chartMaYdata ? chartMaYdata?.vals : []} label={active} />
          </div>
        </div> */}
        {/* <div className='border h-[500px]'>
          <LineChart />
        </div> */}
      </main>
    </section>
  )
}

export default AdminDashboard






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

