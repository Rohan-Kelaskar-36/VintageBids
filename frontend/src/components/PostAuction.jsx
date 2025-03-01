import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PostAuction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    startingBid: "",
    closingTime: "",
    image: null, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const auctionData = new FormData();
    auctionData.append("itemName", formData.itemName);
    auctionData.append("description", formData.description);
    auctionData.append("startingBid", formData.startingBid);
    auctionData.append("closingTime", formData.closingTime);
    if (formData.image) {
      auctionData.append("image", formData.image);
    }

    console.log("Auction Details:", auctionData);

    alert("Auction posted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Dashboard">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
          </a>
          <div className="mx-3 d-flex gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate("/Dashboard")}>Dashboard</button>
            <button className="btn btn-outline-light" onClick={() => navigate("/")}>Home</button>
            <button className="btn text-light bg-danger btn-outline-light" onClick={() => navigate("/")}>Logout</button>
          </div>
        </div>
      </nav>

    
      <div className="card shadow p-4 w-50 mt-5 mb-5 min-vw-100">
        <h2 className="text-center mb-4">Post an Auction</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input type="text" name="itemName" className="form-control" placeholder="Enter item name" value={formData.itemName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" rows="3" placeholder="Enter item description" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Starting Bid ($)</label>
            <input type="number" name="startingBid" className="form-control" placeholder="Enter starting bid" value={formData.startingBid} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Closing Time</label>
            <input type="datetime-local" name="closingTime" className="form-control" value={formData.closingTime} onChange={handleChange} required />
          </div>

         
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Post Auction</button>
        </form>
      </div>

      
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PostAuction;
