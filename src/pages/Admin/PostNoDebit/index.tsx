import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useGetData } from "../../../content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { FcDocument } from "react-icons/fc";
import { message } from "antd";
import { adminUrl } from "../../../BackendUrl";
const include = ["cover_letter", "court_order"];
import Table from "./Table";
const className = `px-3 py-3 text-left text-[0.7rem] font-medium text-gray-600 capitalize tracking-wider`;
const thData =
  `Date, Court Order, Police Cover letter, Bank Name, PND Status,Comment`.split(
    ","
  );

const PostNoDebit = () => {
  const [open, setOpen] = useState("");
  const [data] = useGetData(`https://api.paystack.co/bank`);
  const [acctName, setAcctName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setload] = useState(false);
  const [all, setAll] = useState(undefined);
  const [modalState, setModalState] = useState("");
  const [state, setState] = useState<any>({
    court_order: "",
    cover_letter: "",
    acct: "",
    bank: "",
    acct_name: "",
  });
  const handleChange = ({ target }: any) => {
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
      const res = await axios.get(`${adminUrl}user/post_no_bill/all?type=true`);
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
        type: true,
      }).map(([key, val]: any) => {
        form.set(key, val);
      });
      setload(true);
      await axios
        .post(`${adminUrl}user/post_no_bill/create`, form)
        .then((data: any) => {
          console.log(data);
          messageApi.success(data.data.message);
          Fetcher();
          setModalState("");
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
      <div className="flex justify-end border-red-400 my-3">
        <Button
          type="primary"
          size={"large"}
          onClick={() => setModalState("open")}
        >
          New request
        </Button>
      </div>
      <Table data={all} setState={setModalState} />
      <Modal
        open={!!modalState}
        closable={true}
        onCancel={() => setModalState("")}
        footer={[]}
        width={modalState == "open" ? undefined : 750}
        bodyStyle={modalState == "open" ? undefined : { height: "800px" }}
      >
        {modalState == "open" ? (
          <form
            className="w-full  mx-auto bg-white  sm:p-8  p-4"
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
                  className="z-10 bg-white max-h-[20px]"
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
        ) : (
          <iframe
            src={modalState}
            width="100%"
            height="100%"
            title="PDF Viewer"
          />
        )}
      </Modal>
    </section>
  );
};

export default PostNoDebit;

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
    <button class="container-btn-file w-100">
      <FcDocument />
      {text} {fileName && `(${fileName})`}
      <input class="file" onChange={handleFileChange} name={name} type="file" />
    </button>
  );
};
