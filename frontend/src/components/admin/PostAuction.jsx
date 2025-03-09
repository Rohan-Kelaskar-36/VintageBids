import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const [error, setError] = useState(null);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in to post an auction.");
      navigate("/Login");
      return;
    }
  
    const auctionData = new FormData();
    auctionData.append("title", formData.itemName); // Changed itemName -> title
    auctionData.append("description", formData.description);
    auctionData.append("startingBid", Number(formData.startingBid));
    auctionData.append("closingTime", formData.closingTime);
    if (formData.image) {
      auctionData.append("imageUrl", formData.image);

    }
  
    try {
      for (let pair of auctionData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.post(
        "http://localhost:4036/api/auctions/",
        auctionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        alert("Auction posted successfully!,Pending Approval");
        navigate("/AdminDashboard");
      }
    } catch (error) {
      console.error("Error posting auction:", error.response);
      setError(error.response?.data?.message || "Failed to post auction.");
    }
  };
  

  return (
    <div className="container-fluid min-vh-100 min-vw-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 w-75 mt-5 mb-5">
        <h2 className="text-center mb-4">Post an Auction</h2>
        {error && <p className="text-danger text-center">{error}</p>}
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
    </div>
  );
};

export default PostAuction;
