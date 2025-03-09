import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post("http://localhost:4036/api/admin/login", {
        email,
        password,
      });
  
      console.log("Backend Response:", response.data); // Debugging
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token
        localStorage.setItem("adminInfo", JSON.stringify(response.data.admin)); // Store admin details
        localStorage.setItem("role", "admin");
        console.log("Login successful, token stored!");
        navigate("/AdminDashboard"); // Redirect to admin dashboard
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      setError(error.response?.data?.message || "Something went wrong. Try again.");
    }
  };
  

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Admin Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p className="mt-3 text-center">
            <button 
              type="button" 
              className="btn btn-link p-0" 
              onClick={() => navigate("/ForgotPassword")}
            >
              Forgot Password?
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
