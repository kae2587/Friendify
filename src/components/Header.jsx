import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../assets/logo.png';

const Header = ({ onLogout }) => {
  const handleGenerateClick = () => {
    window.location.href = "/generate-matches"; topArtists={topArtists}
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
        <button className="header-button" onClick={handleGenerateClick}>Generate Matches</button>
        <button className="header-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
