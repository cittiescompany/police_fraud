import React, { useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AddToHomeScreen from '../components/AddHomeComp';
import '../App.css'
import AdminSignup from "../pages/Admin/Signup";
import AdminSignin from "../pages/Admin/Signin";
import AdminForgetPassword from "../pages/Admin/ForgetPassword";
import AdminNewpassword from "../pages/Admin/Newpassword";
import AdminDash from "../Layout/AdminDash";
import Dashboard from "../pages/Admin/Dashboard";
import ListOfUsers from "../pages/Admin/ListOfUsers";
import UserDetails from "../pages/Admin/ListOfUsers/User";
import LoginTimes from "../pages/Admin/LoginTime";
import Helmetpage from "../Layout/Helmet";
import CommunityTable from '../pages/Admin/Communities';
import Gallery from '../pages/Admin/Gallery';

const App = () => {

  return (
    <>
      <Routes >
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/" element={<AdminSignin />} />

        {/* <Route path="forgot-password" element={<AdminForgetPassword />} />
        <Route path="new-password" element={<AdminNewpassword />} /> */}

        <Route path="admin/dashboard/*" element={<AdminDash />}>
          <Route index element={<Dashboard />} />
          <Route path='communities' element={<CommunityTable />} />

          <Route path="login-times/*" element={<Outlet />}>
            <Route index element={<LoginTimes />} />
            <Route path=":LoginId" element={<LoginTimes />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Route>

          <Route path="users/:name/*" element={<Outlet />}>
            <Route index element={<ListOfUsers />} />
            <Route path=":userId/*" element={<Outlet />} >
              <Route index element={<UserDetails />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Route>


          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer className='ToastContainer' />
      <AddToHomeScreen />
    </>
  );
};

export default App;
