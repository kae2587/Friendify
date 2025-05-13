// import React from "react";
// import "./Header.css";
// //import logo from '../assets/logo.png'; // Optional: only if you have a logo

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="left-section">

//         <h1 className="title">FRIENDIFY <span className="logo-placeholder">(logo here?)</span></h1>
//       </div>
//       <nav className="nav-links">
//         <a href="#">Page</a>
//         <button className="header-button">Button</button>
//       </nav>
//     </header>
//   );
// };

// export default Header;

    
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
