import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/list.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedAuctions = data.map(auction => ({
          ...auction,
          timeRemaining: calculateTimeRemaining(auction.closingTime),
        }));

        
        const storedMyItems = JSON.parse(localStorage.getItem("myItems")) || [];
        
        
        const availableAuctions = updatedAuctions.filter(
          (auction) => !storedMyItems.some((item) => item.id === auction.id)
        );

        setAuctions(availableAuctions);
        setMyItems(storedMyItems);
      })
      .catch((error) => console.error("Error fetching auction data:", error));

    
    const interval = setInterval(() => {
      setAuctions(prevAuctions =>
        prevAuctions.map(auction => ({
          ...auction,
          timeRemaining: calculateTimeRemaining(auction.closingTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
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

 
  const handleBid = (id) => {
    const bidAmount = prompt("Enter your bid amount:");

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Invalid bid amount!");
      return;
    }

    setAuctions((prevAuctions) =>
      prevAuctions.map((auction) =>
        auction.id === id && parseInt(bidAmount) > auction.currentBid
          ? { ...auction, currentBid: parseInt(bidAmount), highestBidder: "You" }
          : auction
      )
    );
  };

  
  useEffect(() => {
    const checkAuctionWinners = () => {
      setAuctions((prevAuctions) => {
        const wonItems = prevAuctions.filter(
          (auction) => auction.timeRemaining === "Auction Ended" && auction.highestBidder === "You"
        );

        if (wonItems.length > 0) {
          const updatedMyItems = [...myItems, ...wonItems];

         
          localStorage.setItem("myItems", JSON.stringify(updatedMyItems));
          setMyItems(updatedMyItems);

          
          return prevAuctions.filter((auction) => !wonItems.includes(auction));
        }
        return prevAuctions;
      });
    };

    const interval = setInterval(checkAuctionWinners, 1000);
    return () => clearInterval(interval);
  }, [auctions, myItems]);

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

      
      <div className="container py-4">
        <h2 className="text-center mb-4">Live Auctions</h2>
        <div className="row">
          {auctions.map((auction) => (
            <div key={auction.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={auction.image}
                  className="card-img-top"
                  alt={auction.itemName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.itemName}</h5>
                  <p className="card-text">{auction.description}</p>
                  <p><strong>Current Bid:</strong> ₹{auction.currentBid}</p>
                  <p><strong>Highest Bidder:</strong> {auction.highestBidder ? auction.highestBidder : "No bid yet"}</p>
                  <p><strong>Time Remaining:</strong> {auction.timeRemaining}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary w-100" onClick={() => handleBid(auction.id)}>
                    Place a Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
          {auctions.length === 0 && <p className="text-center">No live auctions available.</p>}
        </div>
      </div>

      <div className="container py-4">
        <h2 className="text-center mb-4">View My Items</h2>
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
                  <p><strong>Winning Bid:</strong> ₹{item.currentBid}</p>
                  <p><strong>Won By:</strong> You</p>
                </div>
              </div>
            </div>
          ))}
          {myItems.length === 0 && <p className="text-center">You haven't won any items yet.</p>}
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LiveAuctions;
