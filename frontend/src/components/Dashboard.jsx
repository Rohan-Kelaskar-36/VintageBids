import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = {
    name: "Rohan Kelaskar",
  };

  const [dummyCoins, setDummyCoins] = useState(10000);

  return (
    <div className="vh-100 vw-100 d-flex flex-column bg-light">
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Dashboard">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
            <span className="px-1">
              <img src="src/images/hammer-icon-white.png" height="20rem" width="20rem" alt="Logo" />
            </span>
          </a>
          <div className="mx-3 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/")}>Home</button>
            <button className="btn text-light bg-danger btn-outline-light" onClick={() => navigate("/")}>Logout</button>
          </div>
        </div>
      </nav>

     
      <div className="mb-5 flex-grow-1 vh-100 w-100 d-flex flex-column align-items-center justify-content-center px-3">
        <h2 className="mt-5 text-center mb-4">Welcome, {user.name}!</h2>
        <div className="text-dark mx-3">Balance coins: {dummyCoins}</div>

        <div className="row g-4 w-100 m-0 px-5">
          
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>Your Auctions</h4>
              <p>No active auctions yet.</p>
              <button className="btn btn-primary w-100" onClick={() => navigate("/PostAuction")}>
                Post an Auction
              </button>
            </div>
          </div>

          
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>Live Auctions</h4>
              <p>Browse and bid on antiques</p>
              <button className="btn btn-success w-100" onClick={() => navigate("/LiveAuctions")}>
                View Auctions
              </button>
            </div>
          </div>

          
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>My Items</h4>
              <p>Check items you have won.</p>
              <button className="btn btn-info w-100" onClick={() => navigate("/ViewMyItems")}>
                View My Items
              </button>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card p-4 shadow-sm h-100">
              <h4>Sold Items</h4>
              <p>Check the items which were sold and posted by you</p>
              <button className="btn btn-primary w-100" onClick={() => navigate("/SoldItems")}>
                View Sold Items
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
