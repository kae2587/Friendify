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
import "./Header.css";

const Header = () => {
  return (
    <div className="header-banner">
      <div className="header-content">
        <h1>FRIENDIFY</h1>
        <button className="header-button">Button</button>
      </div>
    </div>
  );
};

export default Header;
