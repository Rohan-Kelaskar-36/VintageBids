import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get("http://localhost:4036/api/auctions", config);

        if (Array.isArray(response.data)) {
          setAuctions(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setAuctions([]);
        }
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setAuctions([]);
      }
    };

    fetchAuctions();
  }, []);

  const approveAuction = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(`http://localhost:4036/api/auctions/approve/${id}`, {}, config);

      if (response.status === 200) {
        alert("Auction Approved!");
        setAuctions((prev) =>
          prev.map((auction) =>
            auction._id === id ? { ...auction, status: "Live" } : auction
          )
        );
      }
    } catch (error) {
      console.error("Error approving auction:", error);
    }
  };

  const deleteAuction = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.delete(`http://localhost:4036/api/auctions/${id}`, config);

      if (response.status === 200) {
        alert("Auction Rejected!");
        setAuctions(auctions.filter((auction) => auction._id !== id));
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div className="container mt-4 min-vw-100 min-vh-100">
      <h2>All Auctions</h2>

      {/* Pending Auctions */}
      <h3 className="mt-4">Pending Auctions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Starting Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.filter((a) => a.status === "Pending").map((auction) => (
            <tr key={auction._id}>
              <td>
                <img
                  src={`http://localhost:4036${auction.imageUrl}`} // No need to append '/uploads/'
                  alt={auction.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => openImageModal(`http://localhost:4036${auction.imageUrl}`)}
                />
              </td>
              <td>{auction.title}</td>
              <td>{auction.startingBid} Coins</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => approveAuction(auction._id)}>Approve</button>
                <button className="btn btn-danger" onClick={() => deleteAuction(auction._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Live Auctions (Approved) */}
      <h3 className="mt-4">Approved Auctions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Starting Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.filter((a) => a.status === "Approved").map((auction) => (
            <tr key={auction._id}>
              <td>
                <img
                  src={`http://localhost:4036${auction.imageUrl}`} // No need to append '/uploads/'

                  alt={auction.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => openImageModal(`http://localhost:4036${auction.imageUrl}`)}
                />
              </td>
              <td>{auction.title}</td>
              <td>{auction.startingBid} Coins</td>
              <td>
                <button className="btn btn-success">Approved</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedImage && (
        <div className="modal show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }} onClick={closeModal}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Enlarged" className="img-fluid" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctions;
