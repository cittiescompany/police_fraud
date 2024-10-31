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
import { FaPeopleGroup, FaRegFolderClosed, FaNairaSign } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { MdOutlineReport, MdOutlineCases } from "react-icons/md";
import { adminUrl } from "../../../BackendUrl";
import { useGetData } from "../../../content";

const AdminDashboard = () => {
  const { admin }: any = useSelector((state: any) => state.admin);
  return (
    <section className="">
      <main>
        <div className=" grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          <Card
            color={"#3A769E"}
            icon={<MdOutlineCases />}
            text={"Petitions"}
            number={admin?.petition?.total_petitions_count || 0}
          />
          <Card
            color={"#3A769E"}
            text={"Total Amount Of Petitions"}
            icon={<FaNairaSign />}
            number={`N ${Number(
              admin?.petition?.total_amount
            ).toLocaleString()}`}
          />
          <Card
            color={"#3A769E"}
            text={"Post No Debit"}
            icon={<FaRegFolderClosed />}
            number={admin?.petition?.total_post_no_debit || 0}
          />
          <Card
            color={"#3A769E"}
            text={"Activated Post No Debit"}
            icon={<MdOutlineReport />}
            number={admin?.petition?.total_activated_post_no_debit || 0}
          />
          <Card
            color={"#00FF9C"}
            text={"Rejected Post No Debit"}
            icon={<BiAddToQueue />}
            number={admin?.petition?.total_rejected_post_no_debit || 0}
          />
        </div>
      </main>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"></main>
    </section>
  );
};

export default AdminDashboard;
