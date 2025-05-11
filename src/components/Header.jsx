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




const Header = () => {

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
      <h1 className="logo">FRIENDIFY</h1>
    </button>

      </div>
      <button className="header-button" onClick={handleGenerateClick}>Generate Matches</button>
    </div>
  );
};

export default Header;
