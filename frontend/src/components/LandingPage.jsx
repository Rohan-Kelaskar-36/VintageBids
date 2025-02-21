import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./SignUp";
import Login from "./Login";
import "../App.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            VintageBids
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
                <Link className="nav-link" to="/SignUp">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/post-auction">
                  Post Auction
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Vintage Auctions</h1>
          <p className="lead">
            Discover, bid, and own timeless antiques from around the world.
          </p>
          <Link to="/SignUp" className="btn btn-light btn-lg">
            Get Started
          </Link>
        </div>
      </header>

      {/* Featured Auctions */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Auctions</h2>
        <div className="row d-flex justify-content-center"> {/* Align cards centrally */}
          <div className="col-md-4 mb-4">
            <div className="card h-100"> {/* Ensure consistent height */}
              <img
                src="https://img.freepik.com/free-photo/vintage-red-vase-with-red-orange-peonies-front-old-wall_181624-13939.jpg?t=st=1740142796~exp=1740146396~hmac=a713c213737d0c54a8a8b1d3ad8033ab7b7be45847be955271f0e60399d5f0cc&w=1800"
                className="card-img-top"
                alt="Antique 1"
              />
              <div className="card-body">
                <h5 className="card-title">ArtX paper Flower Vase wall Art</h5>
                <p className="card-text">Starting Bid: $10</p>
                <Link to="/Login" className="btn btn-primary">
                  Bid Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-photo/closeup-shot-vintage-pocket-watch-black-surface_181624-21863.jpg?t=st=1740143049~exp=1740146649~hmac=a72e272b9c21f5868f1421feed58625e7236df91aef70b62a26d00ec8fbcbd0c&w=1380"
                className="card-img-top"
                alt="Antique 2"
              />
              <div className="card-body">
                <h5 className="card-title">Vintage pocket watch</h5>
                <p className="card-text">Starting Bid: $150</p>
                <Link to="/Login" className="btn btn-primary">
                  Bid Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-photo/old-fashioned-chrome-car-vintage-elegance-driving-through-rural-sunset-landscape-generated-by-artificial-intelligence_24640-131029.jpg?t=st=1740142355~exp=1740145955~hmac=8da2320a39dece2a37bbef1505fe402024cb8fe098c8a62159b2a5f7d8673482&w=2000"
                className="card-img-top"
                alt="Antique 3"
              />
              <div className="card-body">
                <h5 className="card-title">Austin-healey 3000</h5>
                <p className="card-text">Starting Bid: $200</p>
                <Link to="/Login" className="btn btn-primary">
                  Bid Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2025 VintageBids. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
