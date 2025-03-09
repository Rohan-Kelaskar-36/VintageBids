import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming you store the role in localStorage

  return token && userRole === "admin" ? children : <Navigate to="/AdminLogin" />;
};

export default AdminRoute;
