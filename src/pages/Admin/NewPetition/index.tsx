import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetcher, useGetData } from "../../../content";
import { adminUrl } from "../../../BackendUrl";
import { message, Modal } from "antd";
import axios from "axios";
const ranges = [
  "20m-44m",
  "50m-99m",
  "100m-299m",
  "300m-499m",
  "500m-1.4B",
  "1.5B-50B",
];
const className = `px-3 py-3 text-left text-[0.7rem] font-medium text-gray-600 capitalize tracking-wider`;
const thData = [
  "Date",
  "Case ID",
  "Department",
  "Amount involved in the case",
  "Pettion",
  "CP Status",
  "Edit invitation Letter",
  "Share via Whatsapp",
  "Reassign",
];
const NewPetition = () => {
  const [data] = useGetData(`${adminUrl}user/get_all_departs`);
  const [allData, setAllData] = useState([]);
  const [modalState, setModalState] = useState("");
  const [state, setState] = useState<any>({ depart: "", amount: "" });
  const [load, setload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const getAllData = async () => {
    try {
      const data = await fetcher(`${adminUrl}user/petition/all`);
      if (data.status) {
        setAllData(data.data);
      }
    } catch (error) {
      console.log("fail");
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!state.depart) return message.warning("Department is required");
    if (!state.amount)
      return message.warning("Amount involved in the case is required");
    if (!state.file) return message.warning("File the case is required");
    const form = new FormData();
    Object.entries(state).map(([key, val]: any) => {
      form.set(key, val);
    });
    setload(true);
    await axios
      .post(`${adminUrl}user/petition/create`, form)
      .then((res) => {
        if (res.data.status) {
          setModalState("");
          getAllData();
          messageApi.success("Succesfuly created a petition");
        } else {
          messageApi.error("Fail to create");
        }
      })
      .catch((error: any) => {
        messageApi.error("Fail to create");
      })
      .finally(() => {
        setload(!true);
      });
  };

  return (
    <section>
      {contextHolder}
      <Modal
        open={!!modalState}
        closable={true}
        onCancel={() => setModalState("")}
        footer={[]}
        width={modalState != "open" ? 800 : undefined}
        bodyStyle={modalState != "open" ? { height: "800px" } : {}}
      >
        {modalState == "open" ? (
          <div className="mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md w-full ">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
              New Petition
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox mb-0  mt-3 p-0 ">
                <FormControl
                  sx={{
                    border: "none",
                  }}
                  fullWidth
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    className="bg-white "
                    sx={{
                      zIndex: 9999,
                    }}
                  >
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Department"
                    sx={{
                      border: "none",
                    }}
                    name="bank"
                    onChange={(e) =>
                      setState((prev: any) => ({
                        ...prev,
                        depart: e.target.value,
                      }))
                    }
                    className="py-1"
                  >
                    {data?.data?.map((val: any, index: number) => (
                      <MenuItem value={val} key={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="inputBox mb-0  mt-3 p-0 ">
                <FormControl
                  sx={{
                    border: "none",
                  }}
                  fullWidth
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    className="bg-white "
                    sx={{
                      zIndex: 9999,
                    }}
                  >
                    Total amount involved
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Total amount involved"
                    sx={{
                      border: "none",
                    }}
                    name="bank"
                    className="py-1"
                    onChange={(e) =>
                      setState((prev: any) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  >
                    {ranges.map((val: any, index: number) => (
                      <MenuItem value={val} key={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <FileUpload
                handleFile={(e: any) => {
                  setState((prev: any) => ({ ...prev, file: e }));
                }}
              />
              <button
                type="submit"
                disabled={load}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <iframe
            src={modalState}
            width="100%"
            height="100%"
            title="PDF Viewer"
          />
        )}
      </Modal>

      <div className=" mx-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Petitions</h2>
          <button
            onClick={() => setModalState("open")}
            className="
         px-4 py-2
        bg-blue-500
        text-white font-medium text-sm
        rounded-md shadow-sm
        transform transition duration-200 ease-in-out
        hover:bg-blue-600 hover:shadow
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        active:bg-blue-700
    "
          >
            New petition
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                {thData.map((val: any, index: any) => (
                  <th className={`${className}`}>{val}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allData &&
                allData?.map((val: any, index: any) => (
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      {getFullDateTime(val.date)}
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      {val.Id}
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      {val.department}
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      {val.amount}
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      <Button onClick={() => setModalState(val.file)} />
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      <ThreeDotMenu />
                    </td>

                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      <Button isDownload={true} onClick={() => {}} />
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      share
                    </td>
                    <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                      action
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default NewPetition;

function FileUpload({ handleFile }: any) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      handleFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col my-3 items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md">
        <label className="block mb-2 text-[0.8rem] font-medium text-gray-700 text-center">
          Attach the complaint petition
        </label>

        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md tracking-wide border border-blue-400 cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors duration-300 ease-in-out"
          >
            <svg
              className="w-7 h-7 text-blue-500 mb-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 7.22L10 14.1 3.12 7.22 4.53 5.81 9 10.28V0h2v10.28l4.47-4.47 1.41 1.41z" />
              <path d="M0 16h20v2H0z" />
            </svg>
            <span className="mt-2 text-[0.75rem] leading-normal text-gray-600">
              {selectedFile ? selectedFile : "Select a file"}
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 text-center text-[0.75rem] text-green-600">
            Selected File: {selectedFile}
          </div>
        )}
      </div>
    </div>
  );
}

function getFullDateTime(data: any) {
  const now = new Date(data);
  const day = String(now.getDate()).padStart(2, "0"); // Day of the month (01-31)
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed (01-12)
  const year = now.getFullYear(); // Full year (e.g., 2024)
  const hours = String(now.getHours()).padStart(2, "0"); // Hours (00-23)
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Seconds (00-59)
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return `${formattedDate}`;
}

const ThreeDotMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full focus:outline-none hover:bg-gray-200"
      >
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
      <div
        className={`z-40 absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 transition-opacity duration-200 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
          Approve
        </span>
        <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
          See me in my office
        </span>
        <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
          Additional Info
        </span>
      </div>
    </div>
  );
};

export const Button = ({ onClick, isDownload }: any) => {
  if (isDownload) {
    return (
      <button className="download-button">
        <div className="docs">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="css-i6dzq1"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Docs
        </div>
        <div className="download">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="css-i6dzq1"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
      </button>
    );
  }
  return (
    <button onClick={onClick} className="Documents-btn">
      <span className="folderContainer">
        <svg
          className="fileBack"
          width="100"
          height="90"
          viewBox="0 0 146 113"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
            fill="url(#paint0_linear_117_4)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_117_4"
              x1="0"
              y1="0"
              x2="72.93"
              y2="95.4804"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8F88C2"></stop>
              <stop offset="1" stop-color="#5C52A2"></stop>
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="filePage"
          width="60"
          height="70"
          viewBox="0 0 88 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>
          <defs>
            <linearGradient
              id="paint0_linear_117_6"
              x1="0"
              y1="0"
              x2="81"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white"></stop>
              <stop offset="1" stop-color="#686868"></stop>
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="fileFront"
          width="160"
          height="79"
          viewBox="0 0 160 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
            fill="url(#paint0_linear_117_5)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_117_5"
              x1="38.7619"
              y1="8.71323"
              x2="66.9106"
              y2="82.8317"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#C3BBFF"></stop>
              <stop offset="1" stop-color="#51469A"></stop>
            </linearGradient>
          </defs>
        </svg>
      </span>
      <p className="text-view">View</p>
    </button>
  );
};
