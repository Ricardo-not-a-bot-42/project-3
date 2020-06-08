import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="company-logo" src="/companyLogo.png" alt="company-logo" />
      </Link>
      <div className="links">
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/join-us">Join Us</Link>
      </div>
    </div>
  );
};

export default NavBar;
