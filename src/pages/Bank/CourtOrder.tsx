import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button } from "./../Admin/NewPetition";
import { useGetData } from "./../../content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { FcDocument } from "react-icons/fc";
import { message } from "antd";
import { adminUrl } from "./../../BackendUrl";
const include = ["cover_letter", "court_order"];
const className = `px-3 py-3 text-left text-[0.7rem] font-medium text-gray-600 capitalize tracking-wider`;
const thData =
  `Date, Court Order, Police Cover letter, Bank Name, PND Status,Comment`.split(
    ","
  );

const CouterOrder = () => {
  const [open, setOpen] = useState("");
  const [data] = useGetData(`${adminUrl}user/post_no_bill/all`);
  const [acctName, setAcctName] = useState("");
  const [modalState, setModalState] = useState("");

  return (
    <section className="container">
      <div className="overflow-x-auto bg-white mt-6 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              {thData.map((val: any, index: any) => (
                <th className={`${className}`}>{val}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data &&
              data.data?.map((val: any, index: any) => (
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    {val.date}
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    <Button onClick={() => setModalState(val.court_order)} />
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    <Button onClick={() => setModalState(val.cover_letter)} />
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    {val.bank_name}
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    pending
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap"></td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap"></td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap"></td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!modalState}
        closable={true}
        onCancel={() => setModalState("")}
        footer={[]}
        width={800}
        bodyStyle={{ height: "800px", zIndex: 100000 }}
      >
        <iframe
          src={modalState}
          width="100%"
          height="100%"
          title="PDF Viewer"
        />
      </Modal>
    </section>
  );
};

export default CouterOrder;
