import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [dummyCoins, setDummyCoins] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Parse JSON
const userId = userInfo?._id; // Access _id safely
 // Ensure correct user ID
  const userName = localStorage.getItem("name"); // Store user name

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is stored
        if (!userId || !token) {
          console.error("Missing userId or token!");
          return;
        }

        // console.log("Fetching user with ID:", userId);
      
        const response = await axios.get(`http://localhost:4036/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User coins:", response.data.dummyCoins);
        setDummyCoins(response.data.dummyCoins);
      } catch (error) {
        console.error("Error fetching user coins:", error.response?.data || error.message);
      }
    };

    fetchUserCoins();
  }, [userId]); // Depend on `userId` to avoid unnecessary re-fetching

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("http://localhost:4036/api/auctions/");
const approvedAuctions = response.data
  .filter((auction) => auction.status === "Approved")
  .map((auction) => ({
    ...auction,
    timeRemaining: calculateTimeRemaining(auction.closingTime),
    highestBidder: auction.highestBidderName || "No bid yet", // ✅ Use highestBidderName
  }));

setAuctions(approvedAuctions);

      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchAuctions();

    const interval = setInterval(() => {
      setAuctions((prevAuctions) =>
        prevAuctions.map((auction) => ({
          ...auction,
          timeRemaining: calculateTimeRemaining(auction.closingTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []); // ✅ Fetch auctions once on component mount

  const calculateTimeRemaining = (closingTime) => {
    const now = new Date();
    const closingDate = new Date(closingTime);
    const difference = closingDate - now;

    if (difference <= 0) return "Auction Ended";

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleBid = async (id) => {
    const bidAmount = prompt("Enter your bid amount:");
    if (!bidAmount || isNaN(bidAmount) || parseInt(bidAmount) <= 0) {
      alert("Invalid bid amount!");
      return;
    }

    const auction = auctions.find((auction) => auction._id === id);
    if (!auction) {
      alert("Auction not found!");
      return;
    }

    if (parseInt(bidAmount) <= auction.startingBid) {
      alert("Your bid must be higher than the current bid!");
      return;
    }

    if (dummyCoins < parseInt(bidAmount)) {
      alert("Insufficient coins!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4036/api/auctions/${id}/bid`,
        { bidAmount: parseInt(bidAmount), userId, userName },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Ensure authentication
      );

      alert("Bid placed successfully!");
      setAuctions((prevAuctions) =>
        prevAuctions.map((auction) =>
          auction._id === id
            ? { ...auction, startingBid: parseInt(bidAmount), highestBidder: userName }
            : auction
        )
      );

      setDummyCoins((prevCoins) => prevCoins - parseInt(bidAmount)); // Deduct coins
    } catch (error) {
      console.error("Error placing bid:", error);
      alert(error.response?.data?.message || "Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-light">
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

      <div className="container py-4">
        <h2 className="text-center mb-4">Live Auctions</h2>
        <div className="row">
          {auctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={`http://localhost:4036${auction.imageUrl}`} className="card-img-top" alt={auction.itemName} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{auction.itemName}</h5>
                  <p><strong>Item Name:</strong> {auction.title}</p>
                  <p><strong>Current Bid:</strong> ₹{auction.startingBid}</p>
                  <p><strong>Highest Bidder:</strong> {auction.highestBidder || "No bid yet"}</p>
                  <p><strong>Time Remaining:</strong> {auction.timeRemaining}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary w-100" onClick={() => handleBid(auction._id)}>Place a Bid</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAuctions;
