import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; 
import Login from "./Login"

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", user);
    alert("Sign-up successful! Backend integration pending.");
    navigate("/Login");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center md:min-vw-100 min-vh-100 bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-lg-12 col-md-6 col-sm-8 col-10">
          <div className="card shadow-lg p-4 mx-auto">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                  Sign Up
                </button>
              </form>
              <p className="text-center  mt-3">
                Already have an account? <a className="px-" href="/Login">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
