import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewAuctions = () => {
  const [auctions, setAuctions] = useState([]);

  // Fetch auctions from the database
  useEffect(() => {
    fetch("/api/auctions") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => setAuctions(data))
      .catch((err) => console.error("Error fetching auctions:", err));
  }, []);

  // Approve auction (move to live section for users)
  const approveAuction = async (id) => {
    try {
      const response = await fetch(`/api/auctions/approve/${id}`, { method: "PUT" });
      if (response.ok) {
        setAuctions(auctions.filter((auction) => auction._id !== id)); // Remove from admin panel
      }
    } catch (error) {
      console.error("Error approving auction:", error);
    }
  };

  // Reject auction (delete from DB)
  const deleteAuction = async (id) => {
    try {
      const response = await fetch(`/api/auctions/${id}`, { method: "DELETE" });
      if (response.ok) {
        setAuctions(auctions.filter((auction) => auction._id !== id)); // Remove from UI
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return (
    <div className="container mt-4 min-vw-100 min-vh-100">
      <h2>All Auctions</h2>

      {/* Pending Auctions */}
      <h3 className="mt-4">Pending Auctions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Starting Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.filter(a => a.status === "Pending").map((auction) => (
            <tr key={auction._id}>
              <td>{auction.itemName}</td>
              <td>{auction.startingPrice}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => approveAuction(auction._id)}>Approve</button>
                <button className="btn btn-danger" onClick={() => deleteAuction(auction._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAuctions;
