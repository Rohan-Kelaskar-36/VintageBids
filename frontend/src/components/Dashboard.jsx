import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dummyCoins, setDummyCoins] = useState(0);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    console.log("Stored userInfo from localStorage:", storedUserInfo); // Debugging
  
    if (!storedUserInfo) {
      console.error("No userInfo found in localStorage. Redirecting...");
      navigate("/login");
      return;
    }
  
    try {
      const parsedUserInfo = JSON.parse(storedUserInfo);
  
      // No need to check parsedUserInfo.user; it's already the user object
      if (parsedUserInfo && parsedUserInfo.name) {
        setUser(parsedUserInfo);
        setDummyCoins(parsedUserInfo.dummyCoins ?? 0); // Ensure dummyCoins is set
      } else {
        console.error("Invalid user data structure in localStorage:", parsedUserInfo);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      navigate("/login");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="vh-100 vw-100 d-flex flex-column bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Dashboard">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
            <span className="px-1">
              <img src="src/images/hammer-icon-white.png" height="20rem" width="20rem" alt="Logo" />
            </span>
          </Link>
          <div className="mx-3 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/")}>Home</button>
            <button className="btn text-light bg-danger btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="mb-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3">
        <h2 className="mt-5 text-center mb-4">Welcome, {user.name}!</h2>
        <div className="text-dark mx-3">Balance coins: {dummyCoins}</div>

        <div className="row g-4 w-100 m-0 px-5">
          {/* Live Auctions */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>Live Auctions</h4>
              <p>Browse and bid on antiques</p>
              <button className="btn btn-success w-100" onClick={() => navigate("/LiveAuctions")}>
                View Auctions
              </button>
            </div>
          </div>

          {/* My Items */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>My Items</h4>
              <p>Check items you have won.</p>
              <button className="btn btn-info w-100" onClick={() => navigate("/ViewMyItems")}>
                View My Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
