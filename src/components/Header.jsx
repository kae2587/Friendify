import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../assets/logo.png';

const Header = ({ onLogout }) => {
  // const handleGenerateClick = () => {
  //   window.location.href = "/generate-matches"; topArtists={topArtists}
  // };

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (location.pathname === "/generate-matches") {
      navigate("/"); // go home
    } else {
      navigate("/generate-matches");
    }
  };

  const handleFriendClick = () => {
    window.location.href = "/";
  }

  return (
    <div className="header-banner">
      <div className="header-left">
        <button className="logo-button" onClick={handleFriendClick}>
          <img 
            src={logo}
            alt="Friendify"
            className="logo"
          />
        </button>
      </div>
      <div className="header-right">
        <button className="header-button" onClick={handleNavigation}>{location.pathname === "/generate-matches" ? "Go to Home" : "Generate Matches"}</button>
        <button className="header-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
