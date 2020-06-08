import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const NavBar = () => {
  return (
    <div className="navbar">
      <img className="company-logo" src="/companyLogo.png" alt="company-logo" />
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/join-us">Join Us</Link>
      </div>
    </div>
  );
};

export default NavBar;
