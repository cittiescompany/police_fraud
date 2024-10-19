import react, { useState } from "react";
import Style from "../Signin/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { adminUrl } from "../../../BackendUrl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Modal, message } from "antd";
import { useGetData } from "../../../content";
import Loader from "../../../components/Loader";
import { CSSTransition, SwitchTransition } from "react-transition-group";
const officialEmailPattern =
  /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$|hotmail\.com$|live\.com$|icloud\.com$|me\.com$|mac\.com$|aol\.com$|protonmail\.com$|zoho\.com$|mail\.com$|gmx\.com$|yandex\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const BankRegister = (): JSX.Element => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(true);
  const [otp, setOtp] = useState("");
  const [newData, setNewData] = useState<any>({});
  const [data] = useGetData(`https://api.paystack.co/bank`);

  const makeRequest = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${adminUrl}user/${state ? "create_otp_bank" : "register"}`,
        data
      );
      if (res.data.status) {
        if (!state) {
          messageApi.success("Successfully register");
          nav("/?state=bank");
        }
        setState(false);
      } else {
        if (res.data.message == "Phone or email already used") {
          setState(true);
        }
        messageApi.error(res.data.message);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      bank: "",
    },
    onSubmit: async (data) => {
      console.log(data.bank);

      const createdata = {
        isOfficer: false,
        last_name: data.lastname,
        first_name: data.firstname,
        email: data.email,
        phone: data.phonenumber,
        password: data.password,
        directLineEmail: data.email,
        directLineRank: "hh",
        directLineName: "hee",
        bank: data.data.find((val: any) => val.code == data.bank),
      };
      setNewData(createdata);
      await makeRequest(createdata);
    },
    validationSchema: yup.object({
      firstname: yup.string().required("First Name is required"),
      lastname: yup.string().required("Last Name is required"),
      // email: yup.string().required("Email addres is required"),
      email: yup
        .string()
        .required("Email addres is required")
        .matches(
          officialEmailPattern,
          'Email must be an official Gmail address"'
        ),
      phonenumber: yup.string().required("Phone Number is required"),
      password: yup.string().required("Password is required"),
      bank: yup.string().required("Bank is required"),
    }),
  });

  if (!data) return <Loader />;
  return (
    <section id={Style.section}>
      <main className="relative">
        <img
          src="/assets/bankOfficer.jpg"
          className="min-h-[420px] my-auto absolute top-5"
          alt="newImage"
        />
      </main>

      <main className="z-50" style={{ width: "", overflow: "hidden" }}>
        {contextHolder}
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={state ? "first" : "second"}
            timeout={300}
            classNames="slide"
          >
            {state ? (
              <div>
                <h1 className=" text-lg text-center text-blue-400">
                  Register Now
                </h1>
                <div
                  className="inputBox mb-0"
                  style={{
                    borderColor: formik.touched?.firstname
                      ? formik.errors?.firstname
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="text-dark"
                  />
                  <span>First Name</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.firstname
                      ? formik.errors?.firstname
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.firstname}
                </span>

                <div
                  className="inputBox mb-0  mt-3"
                  style={{
                    borderColor: formik.touched?.lastname
                      ? formik.errors?.lastname
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="text-dark"
                  />
                  <span>Last Name</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.lastname
                      ? formik.errors?.lastname
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.lastname}
                </span>

                <div
                  className="inputBox mb-0  mt-3"
                  style={{
                    borderColor: formik.touched?.email
                      ? formik.errors?.email
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    className="text-dark"
                  />
                  <span>Email address</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.email
                      ? formik.errors?.email
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.email}
                </span>

                <div
                  className="inputBox mb-0 mt-3"
                  style={{
                    borderColor: formik.touched?.phonenumber
                      ? formik.errors?.phonenumber
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    name="phonenumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="text-dark"
                  />
                  <span>Phone Number</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.phonenumber
                      ? formik.errors?.phonenumber
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.phonenumber}
                </span>

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
                      Banks
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Bank"
                      sx={{
                        border: "none",
                      }}
                      name="bank"
                      className="py-1"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {data?.data?.map((val: any, index: number) => (
                        <MenuItem value={val.code} key={val.name}>
                          {val.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.bank
                      ? formik.errors?.bank
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik?.errors?.bank}
                </span>

                <div
                  className="inputBox mb-0 mt-3"
                  style={{
                    borderColor: formik.touched?.password
                      ? formik.errors?.password
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="text-dark"
                  />
                  <span>Password</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.password
                      ? formik.errors?.password
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.password}
                </span>

                <button
                  className={`${Style.button} mt-4`}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  disabled={loading}
                  style={{ opacity: loading ? "0.5" : "1" }}
                >
                  Continue
                </button>
                <main>
                  <p className="text-[0.8rem]">
                    Already have an account?{" "}
                    <Link to="/?state=bank">Login here</Link>
                  </p>
                </main>
              </div>
            ) : (
              <div>
                <h1 className=" text-lg text-center text-blue-400">
                  ENTER THE OTP SENT YOUR EMAIL ADDRESS
                </h1>
                <div
                  className="inputBox mb-0"
                  style={{
                    borderColor: formik.touched?.firstname
                      ? formik.errors?.firstname
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  <input
                    required={true}
                    value={otp}
                    onChange={(e: any) => setOtp(e.target.value)}
                    type="text"
                    className="text-dark"
                  />
                  <span>OTP</span>
                </div>
                <span
                  className="text-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    display: formik.touched?.firstname
                      ? formik.errors?.firstname
                        ? "block"
                        : "none"
                      : "none",
                  }}
                >
                  {formik.errors.firstname}
                </span>
                <button
                  className={`${Style.button} mt-4`}
                  onClick={() => {
                    if (!otp) {
                      message.error("OTP is INVALID");
                    } else {
                      makeRequest({ ...newData, otp });
                    }
                  }}
                  disabled={loading}
                  style={{ opacity: loading ? "0.5" : "1" }}
                >
                  Continue
                </button>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>
    </section>
  );
};
export default BankRegister;
