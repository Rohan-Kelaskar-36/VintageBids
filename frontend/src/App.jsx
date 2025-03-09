import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PostAuction from "./components/admin/PostAuction";
import LiveAuctions from "./components/LiveAuctions";
import ViewMyItems from "./components/ViewMyItems";
import SoldItems from "./components/SoldItems";
import AdminLogin from "./components/admin/AdminLogin";
import ForgotPassword from "./components/admin/ForgotPassword";
import ResetPassword from "./components/admin/ResetPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import ViewAuctions from "./components/admin/ViewAuctions";
import UserForgotPassword from "./components/UserForgotPassword";
import ViewUsers from "./components/admin/ViewUsers";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PostAuction" element={<PostAuction />} />
        <Route path="/LiveAuctions" element={<LiveAuctions />} />
        <Route path="/ViewMyItems" element={<ViewMyItems />} />
        <Route path="/SoldItems" element={<SoldItems />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/AdminDashboard/*" element={<AdminDashboard />} />
        <Route path="/ViewAuctions" element={<ViewAuctions />} />
        <Route path="/UserForgotPassword" element={<UserForgotPassword/>} />
        <Route path="/ViewUsers" element={<ViewUsers/>} />



      </Routes>
  );
}

export default App;
