import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (assuming token is stored in localStorage)
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
