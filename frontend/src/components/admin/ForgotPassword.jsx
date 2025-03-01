import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "rohan36@gmail.com") {
      navigate("/ResetPassword");
    } else {
      setError("Invalid email address");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Forgot Password</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter Your Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;