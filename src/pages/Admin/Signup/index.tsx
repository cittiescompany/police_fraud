import react, { useState } from 'react'
import Style from "../Signin/style.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { adminUrl } from '../../../BackendUrl';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Modal, message } from 'antd';
import { useGetData } from '../../../content'
import Loader from '../../../components/Loader';

const AdminSignup = (): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [rank, setRank] = useState('');
    const [otpAndDirect, setotpAndDirect] = useState<any>({ otp: "", directLine: "", rank: "" })
    const [otp, setOtp] = useState("")
    const [open, setOpen] = useState(false);
    const [newData, setNewData] = useState({})
    const [data] = useGetData(`${adminUrl}user/get_all_ranks`)

    const handleChange = (event: SelectChangeEvent) => {
        setotpAndDirect((prev: any) => ({ ...prev, [event?.target?.name]: event.target.value }))
    };
    const handleOk = async () => {
        if (!otpAndDirect.otp || otpAndDirect.otp.length < 3) return messageApi.warning("Invalid otp")
        if (!otpAndDirect.directLine) return messageApi.warning("Direct line is required")
        try {

            setLoading(true)
            const response = await axios.post(`${adminUrl}user/register`, { ...newData, ...otpAndDirect })
            console.log(response)
            if (response.data.status) {
                messageApi.success("success");
                nav("/signin")
            } else {
                messageApi.error(response.data.message)
            }
        } catch (error: any) {
            console.log(error.response.data.message)
            messageApi.error(error.response.data.message)
        }
        finally {
            setLoading(!true)
        }
    }
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            password: '',

        },
        onSubmit: (data) => {
            if (!otpAndDirect.rank) {
                messageApi.open({
                    type: 'warning',
                    content: 'Your Rank is required',
                });
                return
            };
            setNewData({ last_name: data.lastname, first_name: data.firstname, email: data.email, phone: data.phonenumber, password: data.password, })
            setOpen(true)
        },
        validationSchema: yup.object({
            firstname: yup.string().required("First Name is required"),
            lastname: yup.string().required("Last Name is required"),
            email: yup.string().required("Email addres is required"),
            phonenumber: yup.string().required("Phone Number is required"),
            password: yup.string().required("Password is required"),
        })
    })

    if (!data) return (<Loader />)
    return (

        <section id={Style.section}>
            <main className='relative'>
                <img src='/assets/police.jpg' className='' alt='newImage' />
                <h1 className="text-3xl absolute top-[40%] max-sm:text-[1.2rem] right-[25%] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 mb-4">
                    War against Crime
                </h1>

            </main>
            <main className='z-50'>
                {contextHolder}
                <h1 className=' text-lg text-center text-blue-400'>Register Now</h1>
                <div className="inputBox mb-0"
                    style={{
                        borderColor: formik.touched?.firstname ? formik.errors?.firstname ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='firstname'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                        type="text" className='text-dark'
                    />
                    <span>First Name</span>
                </div>
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.firstname ? formik.errors?.firstname ? 'block' : 'none' : 'none'
                }}>{formik.errors.firstname}</span>


                <div className="inputBox mb-0  mt-3"
                    style={{
                        borderColor: formik.touched?.lastname ? formik.errors?.lastname ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='lastname'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className='text-dark'
                    />
                    <span>Last Name</span>
                </div>
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.lastname ? formik.errors?.lastname ? 'block' : 'none' : 'none'
                }}>{formik.errors.lastname}</span>


                <div className="inputBox mb-0  mt-3"
                    style={{
                        borderColor: formik.touched?.email ? formik.errors?.email ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="email" className='text-dark'
                    />
                    <span>Email address</span>
                </div>
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.email ? formik.errors?.email ? 'block' : 'none' : 'none'
                }}>{formik.errors.email}</span>


                <div className="inputBox mb-0 mt-3"
                    style={{
                        borderColor: formik.touched?.phonenumber ? formik.errors?.phonenumber ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='phonenumber'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className='text-dark'
                    />
                    <span>Phone Number</span>
                </div>
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.phonenumber ? formik.errors?.phonenumber ? 'block' : 'none' : 'none'
                }}>{formik.errors.phonenumber}</span>

                <div className="inputBox mb-0 mt-3 p-0 ">
                    <FormControl sx={{}} fullWidth size="small" >
                        <InputLabel id="demo-select-small-label">Ranks</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={rank}
                            label="rank"
                            renderValue={otpAndDirect.rank}
                            name='rank'
                            className='py-1'
                            onChange={handleChange}
                        >
                            {
                                data?.data?.map((val: any, index: number) => (
                                    <MenuItem value={val.name}>{val.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                {/* <div className="inputBox mb-0 mt-3 p-0 ">
                    <FormControl sx={{}} fullWidth size="small" >
                        <InputLabel id="demo-select-small-label">Ranks</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={rank}
                            label="ranke"
                            className='py-1'
                            onChange={handleChange}
                        >
                            {
                                policeRanks.map((val: string, index: number) => (

                                    <MenuItem value={val}>{val}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div> */}
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.phonenumber ? formik.errors?.phonenumber ? 'block' : 'none' : 'none'
                }}>{formik.errors.phonenumber}</span>

                <div className="inputBox mb-0 mt-3"
                    style={{
                        borderColor: formik.touched?.password ? formik.errors?.password ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className='text-dark'
                    />
                    <span>Password</span>
                </div>
                <span className='text-danger text-center' style={{
                    fontSize: '0.85rem',
                    display: formik.touched?.password ? formik.errors?.password ? 'block' : 'none' : 'none'
                }}>{formik.errors.password}</span>

                <button className={`${Style.button} mt-4`} onClick={() => {
                    formik.handleSubmit()
                }} disabled={loading} style={{ opacity: loading ? '0.5' : "1" }}>Continue</button>
                <main>
                    <p className='text-[0.8rem]'>Already have an account? <Link to='/'>Login here</Link></p>
                </main>

                <Modal
                    title="AUTHORISE OTP"
                    open={open}
                    closable={false}
                    onCancel={() => setOpen(false)}
                    footer={[

                    ]}

                >

                    <div className="inputBox mb-0 mt-3 p-0  ">
                        <FormControl sx={{}} fullWidth size="small" >
                            <InputLabel id="demo-select-small-label bg-white z-[999]">Direct line</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={rank}
                                label="Direct Line"
                                name="directLine"
                                renderValue={otpAndDirect.directLine}
                                className='py-1'
                                onChange={handleChange}
                            >
                                {
                                    data?.data?.map((val: any, index: number) => (
                                        <MenuItem value={val.name}>{val.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="inputBox mb-0 mt-3"  >
                        <input required={true}
                            name='otp'
                            onChange={handleChange}
                            type="text" className='text-dark'
                        />
                        <span>OTP</span>
                    </div>

                    <button className={`${Style.button} mt-4 mx-auto block`} onClick={() => { handleOk() }} disabled={loading} style={{ opacity: loading ? '0.5' : "1" }}>Submit</button>
                </Modal>

            </main>
        </section >
    )

}
export default AdminSignup

const policeRanks = [
    "Police Officer",            // Entry-level rank
    "Senior Police Officer",     // Slightly above Police Officer
    "Corporal",                  // First supervisory rank
    "Sergeant",                  // Non-commissioned officer
    "Staff Sergeant",            // Senior non-commissioned officer
    "Warrant Officer",           // Senior supervisory rank
    "Inspector",                 // Junior officer rank
    "Senior Inspector",          // Mid-level officer rank
    "Chief Inspector",           // Senior officer rank
    "Superintendent",            // First management rank
    "Senior Superintendent",     // Senior management rank
    "Chief Superintendent",      // Higher management rank
    "Assistant Commissioner",    // Junior executive rank
    "Deputy Commissioner",       // Mid-level executive rank
    "Commissioner",              // Senior executive rank
    "Assistant Chief Constable", // Executive rank in some regions
    "Deputy Chief Constable",    // Senior executive rank
    "Chief Constable",           // Highest rank in some police forces
    "Deputy Inspector General",  // Senior executive rank in some regions
    "Inspector General",         // Very senior rank in some regions
    "Deputy Director General",   // Higher executive rank
    "Director General"           // Highest rank in many regions
];
