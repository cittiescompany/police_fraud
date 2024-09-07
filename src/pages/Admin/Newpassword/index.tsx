import react, { useState } from 'react'
import Style from "./style.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useGetQuery } from '../../../Hooks'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { adminUrl } from '../../../BackendUrl';
import { toast } from 'react-toastify';

const Newpassword = (): JSX.Element => {
    const [email] = useGetQuery('email', true, '/admin/forgot-password')
    const [loading,setLoading]=useState(false)
    const nav=useNavigate()
    const formik:any=useFormik({
        initialValues:{
            otp:'',
            password:"",
            confirmnewpassword:'',
        },
        onSubmit:(data:any)=>{
            delete data?.confirmnewpassword
            setLoading(true);
            axios.patch(`${adminUrl}reset_password`, { ...data, country_code: '+234',phone_number:email }).then((_resp)=>{
                toast.dismiss()
                toast[_resp.data.status?"success":"error"](_resp.data.message);
                (_resp.data.status&&nav('/signin'))
            }).catch((_error)=>{
                console.log(_error)
                toast.error(_error.message)
            }).finally(()=>{
                setLoading(false);
            })

        },
        validationSchema:yup.object({
            otp:yup.string().required("OTP is required"),
            password:yup.string().required("New password is required"),
            confirmnewpassword:yup.string().required("Confrim New password is required").oneOf([yup.ref('password'), ], 'Passwords must match'),
        })
    })

    return (
        <section id={Style.section}>
            <main>
            </main>
            <main>
                <h1>New password</h1>
                <p>Input the new password you want!!!</p>
                <div className="inputBox mb-0"
                    style={{
                        borderColor: formik.touched?.otp ? formik.errors?.otp ? "red" : '' : ''
                    }} >
                    <input required={true}
                        name='otp'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className='text-dark'
                    />
                    <span>OTP</span>
                </div>
                <span className='text-danger text-center' style={{
                    display: formik.touched?.otp ? formik.errors?.otp ? 'block' : 'none' : 'none'
                }}>{formik.errors.otp}</span>

                <div className="inputBox mb-0"
                    style={{
                        borderColor: formik.touched?.password ? formik.errors?.password ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                        type="text" className='text-dark'
                    />
                    <span>New password</span>
                </div>
                <span className='text-danger text-center' style={{
                    display: formik.touched?.password ? formik.errors?.password ? 'block' : 'none' : 'none'
                }}>{formik.errors.password}</span>



                <div className="inputBox mb-0"
                    style={{
                        borderColor: formik.touched?.confirmnewpassword ? formik.errors?.confirmnewpassword ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='confirmnewpassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                        type="text" className='text-dark'
                    />
                    <span>Confirm password</span>
                </div>
                <span className='text-danger text-center' style={{
                    display: formik.touched?.confirmnewpassword ? formik.errors?.confirmnewpassword ? 'block' : 'none' : 'none'
                }}>{formik.errors.confirmnewpassword}</span>

                <button className={`${Style.button} mt-4`} disabled={loading} style={{
                    opacity:loading?'0.5':"1"
                }} 
                onClick={()=>{
                    formik.handleSubmit()
                }}
                
                >Submit</button>
                <main>
                </main>
            </main>
        </section>
    )

}
export default Newpassword