import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetcher, useGetData } from "../../../content";
import { adminUrl } from "../../../BackendUrl";
import { message, Modal } from "antd";
import axios from "axios";
import conveter from "number-to-words";
import Table from "./Table";
import { update_petition } from "../../../Redux/Admin.slice";
import { useSelector } from "react-redux";
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
  const { petition }: any = useSelector((state: any) => state.admin);

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
    console.log(Number(state.amount));
    if (!state.depart) return message.warning("Department is required");
    if (!state.amount)
      return message.warning("Amount involved in the case is required");
    if (!state.file) return message.warning("File the case is required");
    const form = new FormData();
    Object.entries(state).map(([key, val]: any) => {
      form.set(key, val);
    });
    const newPet = Number(petition.total_amount) + Number(state.amount);

    setload(true);
    await axios
      .post(`${adminUrl}user/petition/create`, form)
      .then((res) => {
        if (res.data.status) {
          setModalState("");
          getAllData();

          update_petition(newPet);
          messageApi.success("Succesfuly created a petition");
          // Object.entries(state).map(([key, val]: any) => {
          //   setState((prev: any) => ({ ...prev, [key]: "" }));
          // });
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
        width={modalState != "open" ? 800 : 600}
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
                    className="z-10 bg-white max-h-[20px] "
                  >
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Department"
                    sx={{
                      border: "none",
                      "& .MuiSelect-select": {
                        border: "none", // Remove border from the select input
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Remove border from the outline
                      },
                    }}
                    name="bank"
                    value={state.bank}
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
                <input
                  required={true}
                  type="number"
                  value={state.amount}
                  onWheel={(e: any) => e.currentTarget.blur()}
                  name="email"
                  onChange={(e: any) =>
                    setState((prev: any) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  className="text-dark"
                />
                <span>Amount involved </span>
              </div>
              <span
                className={`text-gray text-center ${
                  state.amount ? "block" : "hidden"
                }`}
              >
                {conveter.toWords(Number(state.amount))} naira
              </span>
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
        <Table data={allData} state={setModalState} />
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
