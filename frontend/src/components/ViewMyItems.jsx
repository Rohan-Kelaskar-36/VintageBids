import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewMyItems = () => {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  
  useEffect(() => {
    const fetchMySoldItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await axios.get("http://localhost:4036/api/sold-items/my-items", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMyItems(response.data);
      } catch (error) {
        console.error("Error fetching sold items:", error.response?.data || error.message);
      }
    };

    fetchMySoldItems();
  }, []);

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Dashboard">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
            <span className="px-1">
              <img src="src/images/hammer-icon-white.png" height="20rem" width="20rem" alt="Logo" />
            </span>
          </a>
          <div className="mx-3 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/Dashboard")}>Dashboard</button>
            <button className="btn btn-outline-light" onClick={() => navigate("/")}>Home</button>
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
           {myItems.map((item) => {
  console.log("Image URL:", item.imageUrl);
  return (
    <div key={item._id} className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={`http://localhost:4036/${item.imageUrl}`}
          className="card-img-top"
          alt={item.itemName}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            console.error("Image failed to load:", item.imageUrl);
            e.target.src = "/images/default-placeholder.png"; // Fallback image
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.itemName}</h5>
          <p className="card-text">{item.description}</p>
          <p><strong>Final Price:</strong> ₹{item.soldPrice}</p>
        </div>
      </div>
    </div>
  );
})}

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
