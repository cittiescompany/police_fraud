import react, { useState } from 'react'
import Style from "../Signin/style.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { adminUrl } from '../../../BackendUrl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Modal, message } from 'antd';
import { useGetData } from '../../../content'
import Loader from '../../../components/Loader';
const officialEmailPattern = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$|hotmail\.com$|live\.com$|icloud\.com$|me\.com$|mac\.com$|aol\.com$|protonmail\.com$|zoho\.com$|mail\.com$|gmx\.com$|yandex\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const AdminSignup = (): JSX.Element => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [otpAndDirect, setotpAndDirect] = useState<{ directLineRank: String | any, directLineEmail: String | any, directLineName: String | any } | any>({ directLineRank: "", directLineEmail: "", directLineName: "" })
    const [open, setOpen] = useState(0);
    const [state, setState] = useState(true)
    const [newData, setNewData] = useState<any>({})
    const [data] = useGetData(`${adminUrl}user/get_all_ranks`)

    const handleChange = (event: SelectChangeEvent) => {
        setotpAndDirect((prev: any) => ({ ...prev, [event?.target?.name]: event.target.value }))
    };
    const handleOk = async () => {
        if (open == 1) {
            if (!otpAndDirect.directLineRank) return messageApi.warning("Direct manager rank is required")
            if (!otpAndDirect.directLineName) return messageApi.warning("Direct manager name is required")
            if (!otpAndDirect.directLineEmail) return messageApi.warning("Direct manager email is required")
            // if (!officialEmailPattern.test(otpAndDirect.directLineEmail)) return messageApi.warning("Direct manager email must be an official email")
        }
        try {
            setLoading(true)
            const rank_id = data.data.find((val: any) => val.rank == newData.rank)


            const response = await axios.post(`${adminUrl}user/${open == 1 ? "create_otp" : "register"}`, { ...otpAndDirect, ...newData, rank_id });
            if (response.data.status) {
                messageApi.success(response.data.message)
                if (open == 2) {
                    nav("/")
                } else {
                    setOpen(2)
                }
            } else {
                messageApi.error(response.data.message)
            }
        } catch (error: any) {
            console.log(error)
            messageApi.error(error.response.data.message || error.message)

        } finally {
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
            setOpen(1)
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
                            value={otpAndDirect.rank}
                            label="rank"
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
                    title="DIRECT MANAGER INFORMATION"
                    open={!!([1, 2].includes(open))}
                    closable={false}
                    onCancel={() => setOpen(0)}
                    footer={[

                    ]}

                >
                    {open == 1 ?
                        <>
                            <div className="inputBox mb-0 mt-3 p-0  ">
                                <FormControl sx={{}} fullWidth size="small" >
                                    <InputLabel id="demo-select-small-label bg-white z-[999]">Direct line</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label="Direct Line"
                                        name="directLineRank"
                                        value={otpAndDirect.directLine}
                                        className='py-1'
                                        onChange={handleChange}
                                    >
                                        {
                                            data?.data?.filter((val: any) => val.index > 7)?.map((val: any, index: number) => (
                                                <MenuItem value={val.name}>{val.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="inputBox mb-0 mt-3"  >
                                <input required={true}
                                    name='directLineName'
                                    onChange={handleChange}
                                    type="text" className='text-dark'
                                />
                                <span>Full name</span>
                            </div>

                            <div className="inputBox mb-0 mt-3"  >
                                <input required={true}
                                    name='directLineEmail'
                                    onChange={handleChange}
                                    type="text" className='text-dark'
                                />
                                <span>Official Email</span>
                            </div>
                        </>
                        : open == 2 ?
                            <>
                                <div className="inputBox mb-0 mt-3"  >
                                    <input required={true}
                                        name='otp'
                                        onChange={handleChange}
                                        type="text" className='text-dark'
                                    />
                                    <span>OTP</span>
                                </div>
                            </> :
                            null}
                    <button className={`${Style.button} mt-4 mx-auto block`} onClick={() => { handleOk() }} disabled={loading} style={{ opacity: loading ? '0.5' : "1" }}>{open == 1 ? "Send OTP" : "Submit"}</button>
                </Modal>

            </main>
        </section >
    )

}
export default AdminSignup

