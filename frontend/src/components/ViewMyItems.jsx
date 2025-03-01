import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const ViewMyItems = () => {
   const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const loggedInUser = localStorage.getItem("username") || "You"; 

  useEffect(() => {
    fetch("/list.json") 
      .then((response) => response.json())
      .then((data) => {
        const wonItems = data.filter(
          (item) => item.highestBidder === loggedInUser
        );
        setMyItems(wonItems);
      })
      .catch((error) => console.error("Error fetching auction data:", error));
  }, []);

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Dashboard">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
            <span className="px-1">
              <img
                src="src/images/hammer-icon-white.png"
                height="20rem"
                width="20rem"
                alt="Logo"
              />
            </span>
          </a>
          <div className="mx-3 d-flex gap-3">
            <button className="btn  btn-outline-light" onClick={() => navigate("/Dashboard")}>
            Dashboard
          </button>
          <button className="btn  btn-outline-light" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn text-light bg-danger btn-outline-light" onClick={() => navigate("/")}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="container py-4 min-vh-100">
        <h2 className="text-center mb-4">My Winning Items</h2>
        {myItems.length === 0 ? (
          <p className="text-center">You haven't won any auctions yet.</p>
        ) : (
          <div className="row">
            {myItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.itemName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">{item.description}</p>
                    <p>
                      <strong>Final Price:</strong> ₹{item.currentBid}
                    </p>
                    <p>
                      <strong>Closing Time:</strong>{" "}
                      {new Date(item.closingTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewMyItems;
