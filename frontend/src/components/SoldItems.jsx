import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SoldItems = () => {
  const navigate = useNavigate();

  const loggedInUser = "Rohan Kelaskar";

  const allSoldItems = [
    {
      id: 1,
      itemName: "Vintage Clock",
      winner: "M S Dhoni",
      finalPrice: "₹15,000",
      postedBy: "Rohan Kelaskar",
    },
    {
      id: 2,
      itemName: "Antique Vase",
      winner: "Virat kohli",
      finalPrice: "₹8,500",
      postedBy: "Narasimha Gouda",
    },
    {
      id: 3,
      itemName: "Old Gramophone",
      winner: "Rohit Sharma",
      finalPrice: "₹22,000",
      postedBy: "Rohan Kelaskar",
    },
    {
      id: 4,
      itemName: "Classic Typewriter",
      winner: "Suresh Raina",
      finalPrice: "₹12,000",
      postedBy: "Aditya Singh",
    },
  ];

  const [userSoldItems, setUserSoldItems] = useState([]);

  useEffect(() => {
    const filteredItems = allSoldItems.filter(
      (item) => item.postedBy === loggedInUser
    );
    setUserSoldItems(filteredItems);
  }, [loggedInUser]);

  return (
    <div className="vh-100 vw-100 d-flex flex-column bg-light">
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
            <button
              className="btn  btn-outline-light"
              onClick={() => navigate("/Dashboard")}
            >
              Dashboard
            </button>
            <button
              className="btn  btn-outline-light"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="btn text-light bg-danger btn-outline-light"
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container mt-5 pt-5">
          <h2 className="text-center mb-4">Your Sold Items</h2>

          {userSoldItems.length > 0 ? (
            <div className="row justify-content-center">
              {userSoldItems.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card p-3 shadow-sm mb-3">
                    <h5>{item.itemName}</h5>
                    <p>
                      <strong>Sold Price:</strong> {item.finalPrice}
                    </p>
                    <p>
                      <strong>Winner:</strong> {item.winner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No items sold yet.</p>
          )}
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3 w-100">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SoldItems;
