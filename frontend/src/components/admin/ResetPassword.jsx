import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      alert("Password reset successfully");
      navigate("/AdmnLogin");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Reset Password</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
