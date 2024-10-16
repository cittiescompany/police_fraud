import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useGetData } from "../../../content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { adminUrl } from "../../../BackendUrl";
const include = ["cover_letter", "court_order"];
const className = `px-3 py-3 text-left text-[0.7rem] font-medium text-gray-600 capitalize tracking-wider`;
const thData =
  `Date, Court Order, Police Cover letter, Bank Name, PND Status,Comment`.split(
    ","
  );

const BankAccount = () => {
  const [open, setOpen] = useState("");
  const [data] = useGetData(`https://api.paystack.co/bank`);
  const [acctName, setAcctName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setload] = useState(false);
  const [all, setAll] = useState(undefined);
  const [state, setState] = useState<any>({
    court_order: "",
    cover_letter: "",
    acct: "",
    bank: "",
    acct_name: "",
  });
  const handleChange = ({ target }: any) => {
    console.log(include.includes(target.name));
    setState((prev: any) => ({
      ...prev,
      [target.name]: include.includes(target.name)
        ? target.files[0]
        : target.value,
    }));
  };
  useEffect(() => {
    if (state.acct && state.acct.length > 9 && state.bank) {
      setAcctName("");
      verifyAccountNumber(state.acct, state.bank).then((res) => {
        if (res) {
          setAcctName(res.account_name);
        } else {
          message.error("Invalid account number");
        }
      });
    }
  }, [state.acct, state.bank]);

  const Fetcher = async () => {
    try {
      const res = await axios.get(`${adminUrl}user/post_no_bill/all`);
      setAll(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetcher();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const form = new FormData();
      if (!state.court_order) {
        return messageApi.error("Court order document is required");
      } else if (!state.cover_letter) {
        return messageApi.error("Police Cover letter  is required");
      } else if (!state.acct) {
        return messageApi.error("Account number is required");
      } else if (!state.bank) {
        return messageApi.error("Please select the bank ");
      } else if (!state.suit_number) {
        return messageApi.error("Suit number is required ");
      } else if (!acctName) {
        return messageApi.error("Invalid account number");
      }
      Object.entries({
        ...state,
        acct_name: acctName,
        ...data.data.find((val: any) => val.code == state.bank),
      }).map(([key, val]: any) => {
        form.set(key, val);
      });
      setload(true);
      await axios
        .post(`${adminUrl}user/post_no_bill/create`, form)
        .then((data: any) => {
          messageApi.success("Success");
          Fetcher();
        })
        .catch((err: any) => {
          console.log(err.message);
        })
        .finally(() => {
          setload(false);
        });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <section className="container">
      {contextHolder}
      <form
        className="w-full md:w-3/5 mx-auto bg-white  sm:p-8 rounded-lg shadow-md  p-4"
        onSubmit={handleSubmit}
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div className="text-center">New Post No Debit Request</div>
        <div className=" my-2">
          <FileUpload
            name={"court_order"}
            text="Upload Court Order"
            handleChange={handleChange}
          />
        </div>
        <div className=" my-2">
          <FileUpload
            name={"cover_letter"}
            text="Police cover letter"
            handleChange={handleChange}
          />
        </div>
        <div className="inputBox mb-0 mt-3">
          <input
            name="suit_number"
            type="text"
            onWheel={(e: any) => e.target.blur()}
            onChange={handleChange}
            className="text-dark"
          />
          <span>Suit number</span>
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
              Bank name
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Department"
              sx={{
                border: "none",
              }}
              name="bank"
              onChange={handleChange}
              className="py-1"
            >
              {data?.data?.map((val: any, index: number) => (
                <MenuItem
                  sx={{
                    zIndex: 99999,
                  }}
                  value={val.code}
                  key={val.name}
                >
                  {val.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="inputBox mb-0 mt-3">
          <input
            name="acct"
            type="text"
            onChange={handleChange}
            onWheel={(e: any) => e.target.blur()}
            className="text-dark"
          />
          <span>Account Number</span>
        </div>
        {acctName && (
          <div className="text-center">
            <span>Account Name : </span>
            <span>{acctName}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={load}
          className="w-full mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
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
            {all &&
              all?.map((val: any, index: any) => (
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    {val.date}
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap">
                    {/* {val.court_order} */}
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] whitespace-nowrap"></td>
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
    </section>
  );
};

export default BankAccount;

async function verifyAccountNumber(accountNumber: any, bankCode: any) {
  const paystackSecretKey = "YOUR_SECRET_KEY"; // Replace with your actual Paystack secret key

  try {
    const response = await axios.get("https://api.paystack.co/bank/resolve", {
      params: {
        account_number: accountNumber,
        bank_code: bankCode,
      },
      headers: {
        Authorization: `Bearer sk_test_23bcb06d0d26a28b8216016fde2e30b64211922f`,
      },
    });

    if (response.data.status) {
      console.log("Account verified:", response.data.data);
      return response.data.data;
    } else {
      console.log("Verification failed:", response.data.message);
      return null;
    }
  } catch (error) {
    return null;
  }
}

const FileUpload = ({ name, text, handleChange }: any) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]?.name || "");
    handleChange(event);
    console.log(event.target.files[0]);
  };
  return (
    /* From Uiverse.io by omar49511 */
    <button class="container-btn-file w-100">
      <svg
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 50 50"
      >
        <path
          d="M28.8125 .03125L.8125 5.34375C.339844 
    5.433594 0 5.863281 0 6.34375L0 43.65625C0 
    44.136719 .339844 44.566406 .8125 44.65625L28.8125 
    49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
    50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
    30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
    .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
    6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
    29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
    43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
    13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
    21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
    22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
    15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
    28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
    27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
    14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
    20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"
        ></path>
      </svg>
      {text} {fileName && `(${fileName})`}
      <input class="file" onChange={handleFileChange} name={name} type="file" />
    </button>
  );
};
