import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LandingPage = () => {
  const text = "Discover, bid, and own timeless antiques from around the world.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (!isDeleting && index < text.length) {
      
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
    } else if (!isDeleting && index === text.length) {
     
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && index > 0) {
      
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, 50);
    } else if (isDeleting && index === 0) {
      
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);

  return (
    <div className="vh-100 vw-100 d-flex flex-column">
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="text-light">Vintage</span>
            <span className="text-success">Bids</span>
            <span className="px-1">
              <img src="src/images/hammer-icon-white.png" height="20rem" width="20rem" alt="Logo" />
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/SignUp">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AdminLogin">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="bg-primary text-white text-center py-5 w-100">
        <div className="container-fluid">
          <h1>Welcome to Vintage Auctions</h1>
          <p className="lead typing-text">
            {displayText}
            <span className="cursor">|</span>
          </p>
          <Link to="/SignUp" className="btn btn-light btn-lg">Get Started</Link>
        </div>
      </header>
      <section className="flex-grow-1 d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <h2 className="text-center mb-4 mt-3">Featured Auctions</h2>
        <div className="row g-4 w-100 px-5">
          {[  
            {
              title: "ArtX Flower Vase Art",
              price: "₹10000",
              img: "https://img.freepik.com/free-photo/vintage-red-vase-with-red-orange-peonies-front-old-wall_181624-13939.jpg?t=st=1740142796~exp=1740146396~hmac=a713c213737d0c54a8a8b1d3ad8033ab7b7be45847be955271f0e60399d5f0cc&w=1800"
            },
            {
              title: "Vintage Pocket Watch",
              price: "₹150000",
              img: "https://img.freepik.com/free-photo/closeup-shot-vintage-pocket-watch-black-surface_181624-21863.jpg?t=st=1740143049~exp=1740146649~hmac=a72e272b9c21f5868f1421feed58625e7236df91aef70b62a26d00ec8fbcbd0c&w=1380"
            },
            {
              title: "Austin-Healey 3000",
              price: "₹20000000",
              img: "https://img.freepik.com/free-photo/old-fashioned-chrome-car-vintage-elegance-driving-through-rural-sunset-landscape-generated-by-artificial-intelligence_24640-131029.jpg?t=st=1740142355~exp=1740145955~hmac=8da2320a39dece2a37bbef1505fe402024cb8fe098c8a62159b2a5f7d8673482&w=2000"
            }
          ].map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card p-3 shadow-sm h-100">
                <img src={item.img} className="card-img-top" alt={item.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Starting Bid: {item.price}</p>
                  <Link to="/Login" className="btn btn-primary w-100">Bid Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-dark text-white text-center py-3 w-100 fix-bottom">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
