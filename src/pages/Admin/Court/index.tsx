import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useGetData } from "../../../content";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { adminUrl } from "../../../BackendUrl";

const BankAccount = () => {
  const [open, setOpen] = useState("");
  const [data] = useGetData(`https://api.paystack.co/bank`);
  const [acctName, setAcctName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useState<any>({
    nin: "",
    file: "",
    acct: "",
    bank: "",
  });
  const handleChange = ({ target }: any) =>
    setState((preva: any) => ({ ...preva, [target.name]: target.name=='file'?target.files[0]:target.value }));
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

  const handleSubmit=()=>{
    try{
        const form =new FormData()
        Object.entries({...state,acct_name:acctName,bankData:data.data.find((val:any)=>val.code==state.bank)}).map(([key,val]:any)=>{
            form.set(key,val)
        })
        axios.post(`${adminUrl}`)

    }catch(err){

    }
  }
  return (
    <section className="container">
      {contextHolder}
      <form
        className="w-full md:w-3/5 mx-auto bg-white  sm:p-8 rounded-lg shadow-md  p-4"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div className="text-center">New Post No Debit Request</div>
        <div className="inputBox mb-0 mt-3">
          <input
            name="password"
            type="file"
            onChange={handleChange}
            onWheel={(e: any) => e.target.blur()}
            className="text-dark"
          />
          <span>Court Order</span>
        </div>
        <div className="inputBox mb-0 mt-3">
          <input
            name="nin"
            type="text"
            onWheel={(e: any) => e.target.blur()}
            onChange={handleChange}
            className="text-dark"
          />
          <span>NIN</span>
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
                <MenuItem value={val.code} key={val.name}>
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
          className="w-full mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
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
