import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Ensure token is removed
    localStorage.removeItem("adminInfo"); // Clear admin info
    navigate("/"); // Redirect to login page
  };
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");
  
      if (!token) {
        console.error("Unauthorized: No token found");
        navigate("/"); // Redirect to login page
        return;
      }
  
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
  
        const [usersResponse, auctionsResponse] = await Promise.all([
          axios.get("http://localhost:4036/api/users/users", config),
          axios.get("http://localhost:4036/api/auctions/", config),
        ]);
  
        console.log("Users Data:", usersResponse.data);
        console.log("Auctions Data:", auctionsResponse.data);
  
        setStats({
          totalUsers: usersResponse.data.length,
          totalAuctions: auctionsResponse.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err.response?.data || err);
        if (err.response?.status === 401) {
          console.error("Session expired. Redirecting to login.");
          localStorage.removeItem("adminToken");
          navigate("/");
        }
      }
    };
  
    fetchStats();
  }, []);  
  return (
    <div className="bg-dark text-white d-flex flex-column p-4" style={{ width: "250px", minHeight: "100vh" }}>
      <h4>Admin Panel</h4>
      <ul className="list-unstyled flex-grow-1">
        <li>
          <button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/AdminDashboard")}>
            Dashboard
          </button>
        </li>
        <li>
          <button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/ViewAuctions")}>
            View Auctions
          </button>
        </li>
        <li>
          <button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/ViewUsers")}>
            View Users
          </button>
          <button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/PostAuction")}>
            Post Auction
          </button>
        </li>
      </ul>
      <button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const AdmDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalAuctions: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("Unauthorized: No token found");
        navigate("/"); // Redirect to login page
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usersResponse, auctionsResponse] = await Promise.all([
          axios.get("http://localhost:4036/api/users/users", config),
          axios.get("http://localhost:4036/api/auctions/", config),
        ]);

        setStats({
          totalUsers: usersResponse.data.length,
          totalAuctions: auctionsResponse.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err.response?.data || err);
        if (err.response?.status === 401) {
          console.error("Session expired. Redirecting to login.");
          localStorage.removeItem("adminToken");
          navigate("/");
        }
      }
    };

    fetchStats();
  }, [navigate]); // Dependency array ensures function runs on component mount

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="card p-3 shadow">
        <h4>Total Users: {stats.totalUsers}</h4>
        <h4>Total Auctions: {stats.totalAuctions}</h4>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="d-flex min-vw-100 min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <AdmDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
