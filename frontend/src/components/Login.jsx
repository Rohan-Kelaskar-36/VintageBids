import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; 

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", user);
    alert("Login successful! (Backend integration pending)");
    navigate("/dashboard"); 
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 min-vw-75 bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-9 col-11">
          <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              {/* Centering the links using Bootstrap Flex Utilities */}
              <div className="d-flex justify-content-between mt-3">
                <a href="/signup">Sign Up</a>
                <button className="btn btn-link p-0" onClick={() => navigate("/UserForgotPassword")}>
                  Forgot Password?
                </button>
              </div>

              {/* Home Button */}
              <div className="text-center mt-2">
                <button className="btn btn-link p-0" onClick={() => navigate("/")}>Home</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
