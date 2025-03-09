import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:4036/api/auth/login", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // ✅ Clear any old user data before storing the new login
        localStorage.clear();

        // ✅ Store new login details under a single key
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));

        alert("Login successful!");
        navigate("/Dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 min-vw-75 bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-9 col-11">
          <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <p className="text-danger text-center">{error}</p>}
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

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="d-flex justify-content-between mt-3">
                <Link to="/signup">Sign Up</Link>
                <button className="btn btn-link p-0" onClick={() => navigate("/UserForgotPassword")}>
                  Forgot Password?
                </button>
              </div>

              <div className="text-center mt-2">
                <button className="btn btn-link p-0" onClick={() => navigate("/")}>
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
