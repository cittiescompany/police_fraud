import react, { useState } from 'react'
import Style from "../Signin/style.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { adminUrl } from '../../../BackendUrl';
import { message } from "antd"

const AdminSignup = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => {
      setLoading(true)
      console.log("response")
      axios.post(`${adminUrl}user/login`, { ...data, identity: data.email }).then((_resp: any) => {
        console.log(_resp)
        if (_resp.data.status) {
          messageApi.success(_resp.data.message)
          localStorage.setItem("token", _resp.data.token)
          nav("/admin/dashboard")

        } else {
          messageApi.error(_resp.data.message)
        }
      }).catch((_error) => {
        messageApi.error(_error.message)
      }).finally(() => {
        setLoading(false)
      })
    },
    validationSchema: yup.object({
      email: yup.string().required("Identity(Email or phone number) is required"),
      password: yup.string().required("Password is required"),
    })
  })

  return (

    <section id={Style.section}>
      <main className='relative rounded-md'>
        {contextHolder}
        <img src='/assets/police.jpg' alt='newImage' className='rounded' />
        <h1 className="text-3xl absolute top-[40%] max-sm:text-[1.2rem] right-[25%] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 mb-4">
          War against Crime
        </h1>
      </main>
      <main className='mt-3 z-50'>
        <h1 className=' text-xl text-center text-blue-400'>Login</h1>
        <div className="inputBox mb-0  mt-3"
          style={{
            borderColor: formik.touched?.email ? formik.errors?.email ? "red" : '' : ''
          }}  >
          <input required={true}
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text" className='text-dark'
          />
          <span>Identity</span>
        </div>
        <span className='text-danger text-center' style={{
          fontSize: '0.85rem',
          display: formik.touched?.email ? formik.errors?.email ? 'block' : 'none' : 'none'
        }}>{formik.errors.email}</span>

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
        }} disabled={loading} style={{ opacity: loading ? '0.5' : "1" }}>submit</button>
        <main>
          <p className='text-[0.8rem]'>
            Dont have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className='text-[0.8rem]'>
            <Link to="/forgot-password">Forget Password?</Link>
          </p>
        </main>
      </main>
    </section >
  )

}
export default AdminSignup