import react, { useState} from 'react'
import Style from "./style.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { adminUrl } from '../../../BackendUrl';
import { toast } from 'react-toastify';

const AdminForgetPassword = (): JSX.Element => {
    const [loading,setLoading]=useState(false);
    const nav=useNavigate();

    const formik=useFormik({
        initialValues:{
            email:'',
        },
        onSubmit:(data)=>{
            setLoading(true);
            axios.post(`${adminUrl}forgot_password`, { phone_number:data.email, country_code: '+234' }).then((_resp)=>{
                toast.dismiss();
                toast[_resp.data.status?"success":"error"](_resp.data.message);
                if(_resp.data.status){
                    nav("/new-password?email="+data.email);
                }
            }).catch((_error)=>{
                toast.error(_error.message)
            }).finally(()=>{
                setLoading(false)
            })
        },
        validationSchema:yup.object({
            email:yup.string().required("Phone number is required")
        })
    })
    return (
        <section id={Style.section}>
            <main>
                <img src='/assets/forgetPassword.svg' alt='newImage' />
            </main>
            <main>
                <h1>Reset password</h1>
                <p>Input Your account Phone number</p>
                <div className="inputBox mb-0"
                    style={{
                        borderColor: formik.touched?.email ? formik.errors?.email ? "red" : '' : ''
                    }}  >
                    <input required={true}
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" className='text-dark'
                    />
                    <span>Phone number</span>
                </div>
                <span className='text-danger text-center' style={{
                    display: formik.touched?.email ? formik.errors?.email ? 'block' : 'none' : 'none'
                }}>{formik.errors.email}</span>

                <button className={`${Style.button} mt-4`} disabled={loading} onClick={()=>{
                    formik.handleSubmit()
                }} style={{opacity:loading?'0.5':'1'}}>Submit</button>
                <main>
                    <p>Already have an account? <Link to='/signin'>Login here</Link></p>
                </main>
            </main>
        </section>
    )

}
export default AdminForgetPassword