import React, { useState } from 'react'
import Style from "./Style.module.css"
import Card from '../../components/Admin/Card'
import { Outlet, useNavigate } from 'react-router'
import { adminUrl } from '../../BackendUrl'
import useSwr from 'swr';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch} from 'react-redux'
import { add_users } from '../../Redux/Admin.slice'
import { swrData } from '../../content'

const CardLayout = () => {
  const [token] = useState(localStorage.adminLoginToken);
  const nav = useNavigate();
  const dispatch=useDispatch()
  const Fetcher = (url: string) => {
    if (!token) return nav("/admin/signin")
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((_resp) => {
      if (!_resp.data.status) {
        toast.dismiss()
        toast.error(_resp.data.message)
      }
      if (['Token expired', "unauthorized!!!"].includes(_resp.data.message) && _resp.data.status) {
        nav("/admin/signin")
        localStorage.removeItem("adminLoginToken")
      } else {
        dispatch(add_users(_resp.data.users))
      }

    }).catch((_error: any) => {
      toast.dismiss()
      toast.error(_error.message)
    })
  }
  const {}= useSwr(`${adminUrl}/getallusers`, Fetcher,{ ...swrData("success") });
  return (
    <div className={Style.container}>  
      <main id={Style.MainCard}>
        <Card color={"#3A769E"} text={"Count"} number={600} />
        <Card color={"#C79860"} text='Disbursed' number={300}  />
        <Card color={"#3C8DD6"} text='Pending' number={200}  />
        <Card color={"#93CF96"} text='Queued' number={800}  />
      </main>
      <div id={Style.Outlet}>
      <Outlet /> 
      </div>
    </div>
  )
}

export default CardLayout