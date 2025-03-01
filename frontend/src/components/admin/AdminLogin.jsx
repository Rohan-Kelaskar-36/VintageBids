
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "rohan_kelaskar" && password === "rohan_123") {
      navigate("/AdminDashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Admin Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button className="btn btn-link" onClick={() => navigate("/ForgotPassword")}>
              Forgot Password?
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;