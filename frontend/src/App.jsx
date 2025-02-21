import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
  );
}

export default App;
