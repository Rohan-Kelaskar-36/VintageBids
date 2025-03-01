import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Check if the email exists in the database
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/check-email", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

      if (data.exists) {
        setIsEmailValid(true);
      } else {
        alert("Email not found! Please enter a valid email.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  // Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successful! Please log in.");
        navigate("/login");
      } else {
        alert("Error resetting password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Reset Password</h2>

        {!isEmailValid ? (
          // Step 1: Enter Email
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter your email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Verify Email</button>
          </form>
        ) : (
          // Step 2: Enter New Password
          <form onSubmit={handleResetPassword}>
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
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Reset Password</button>
          </form>
        )}

        <div className="text-center mt-3">
          <button className="btn btn-link p-0" onClick={() => navigate("/login")}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default UserForgotPassword;
