import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import { ToastContainer, toast } from "react-toastify";
import AddToHomeScreen from "../components/AddHomeComp";
import "../App.css";
import AdminSignup from "../pages/Admin/Signup";
import BankRegister from "../pages/Admin/Signup/BankRegister";
import AdminSignin from "../pages/Admin/Signin";
import AdminForgetPassword from "../pages/Admin/ForgetPassword";
import AdminNewpassword from "../pages/Admin/Newpassword";
import AdminDash from "../Layout/AdminDash";
import Dashboard from "../pages/Admin/Dashboard";
import Verify from "../pages/Admin/Verify";
import BankAccount from "../pages/Admin/BankAccount";
import PostNoDebit from "../pages/Admin/PostNoDebit";
import BankStatement from "../pages/Admin/BankStatement";
import WarantArrest from "../pages/Admin/WarantArrest";
import Petition from "../pages/Admin/Petition";
import CourtOrder from "../pages/Bank/PostNoDebit/CourtOrder";

import UnFreeze from "../pages/Admin/UnFreeze";
import AuditTrail from "../pages/Admin/AuditTrail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/signup/bank" element={<BankRegister />} />
        <Route path="/" element={<AdminSignin />} />

        {/* <Route path="forgot-password" element={<AdminForgetPassword />} />
        <Route path="new-password" element={<AdminNewpassword />} /> */}

        <Route path="bank/dashboard/*" element={<AdminDash />}>
          <Route path="post-not-debit" element={<CourtOrder status={true} />} />
          <Route path="unfreeze" element={<CourtOrder status={false} />} />
          <Route
            index
            element={
              <Navigate to="/bank/dashboard/post-not-debit" replace={true} />
            }
          />
        </Route>
        <Route path="admin/dashboard/*" element={<AdminDash />}>
          <Route index element={<Dashboard />} />
          <Route path="verify" element={<Verify />} />
          <Route path="bank-account" element={<BankAccount />} />
          <Route path="post-no-debit" element={<PostNoDebit />} />
          <Route path="bank-statement" element={<BankStatement />} />
          <Route path="warant-arrest" element={<WarantArrest />} />
          <Route path="unfreeze" element={<UnFreeze />} />
          <Route path="petition" element={<Petition />} />
          <Route path="audit-trail" element={<AuditTrail />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer className="ToastContainer" />
      <AddToHomeScreen />
    </>
  );
};

export default App;
