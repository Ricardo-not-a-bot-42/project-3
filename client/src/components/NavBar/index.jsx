import React from 'react';
import { Link } from 'react-router-dom';

import { signOut } from './../../services/authentication';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="company-logo" src="/companyLogo.png" alt="company-logo" />
      </Link>

      {(!props.user && (
        <>
          <div className="links">
            <Link to="/login">Login</Link>
            <Link to="/join-us">Join Us</Link>
          </div>
        </>
      )) || (
        <>
          <div className="links">
            <Link to="/profile">{props.user.name}'s Profile</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
