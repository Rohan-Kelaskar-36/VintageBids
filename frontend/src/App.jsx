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
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/admin/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route
        path="/Dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/PostAuction"
        element={
          <AdminRoute>
            <PostAuction />
          </AdminRoute>
        }
      />
      <Route
        path="/LiveAuctions"
        element={
          <PrivateRoute>
            <LiveAuctions />
          </PrivateRoute>
        }
      />
      <Route
        path="/ViewMyItems"
        element={
          <PrivateRoute>
            <ViewMyItems />
          </PrivateRoute>
        }
      />
      <Route path="/SoldItems" element={<SoldItems />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/AdminDashboard/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />      
      <Route path="/ViewAuctions" element={<AdminRoute><ViewAuctions/></AdminRoute>} />      <Route path="/UserForgotPassword" element={<UserForgotPassword />} />
      <Route path="/ViewUsers" element={<AdminRoute><ViewUsers /></AdminRoute>} />    </Routes>
  );
}

export default App;
