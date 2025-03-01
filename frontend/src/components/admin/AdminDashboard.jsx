import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white d-flex flex-column p-4" style={{ width: "250px", minHeight: "100vh" }}>
      <h4>Admin Panel</h4>
      <ul className="list-unstyled flex-grow-1">
        <li><button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/AdminDashboard")}>Dashboard</button></li>
        <li><button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/ViewAuctions")}>View Auctions</button></li>
        <li><button className="btn btn-outline-light w-100 mt-2" onClick={() => navigate("/ViewUsers")}>View Users</button></li>
      </ul>
      <button className="btn btn-danger w-100 mt-2 "onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};


const AdmDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalAuctions: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

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
