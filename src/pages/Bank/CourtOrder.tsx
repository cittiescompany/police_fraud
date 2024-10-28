import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
// import { Button } from "./../Admin/NewPetition";
import { useGetData } from "./../../content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { FcDocument } from "react-icons/fc";
import { message } from "antd";
import { adminUrl } from "./../../BackendUrl";
import Table from "./Table";
const include = ["cover_letter", "court_order"];
const className = `px-3 py-3 text-left text-[0.7rem] font-medium text-gray-600 capitalize tracking-wider`;
const thData =
  `Date,ID, Court Order, Police Cover letter, Account Number, PND Status,Action`.split(
    ","
  );

const CouterOrder = () => {
  const [open, setOpen] = useState("");
  const [acctName, setAcctName] = useState("");
  const [modalState, setModalState] = useState("");
  const [data, setData] = useState([]);

  const Fetch = async () => {
    try {
      const res = await axios.get(`${adminUrl}user/post_no_bill/all`);
      setData(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetch();
  }, []);
  const update = async (data: any) => {
    try {
      const res = await axios.put(`${adminUrl}user/post_no_bill/update/`, data);
      Fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Table data={data} update={update} setState={setModalState} />

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

const HamburgerMenu = ({ update, data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  const updateStatus = (e: any) => {
    update({
      status: e,
      id: data.unique_id,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="block  focus:outline-none">
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 12h.01M12 12h.01M18 12h.01"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-20 top-[-20px] right-0 bg-white shadow-lg rounded-md w-48 py-2">
          {["Freeze", "Rejected"].map((item, index) => (
            <button
              onClick={() =>
                updateStatus(item == "Freeze" ? "activated" : "rejected")
              }
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default CouterOrder;
