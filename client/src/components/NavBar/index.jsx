import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCartTotal from './../ShoppingCartTotal';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src="/images/grey_white_logo.png" alt="company-logo" />
      </Link>

      {(!props.user && (
        <>
          <div className="links">
            <Link to="/join-us">Join Us</Link>
            <Link to="/login">Login</Link>
          </div>
        </>
      )) || (
        <>
          <div className="links">
            <div className="profile">
              <Link to="/profile">{props.user.name}'s Profile</Link>
              <Link to="/profile/subscription">
                {props.user.subscribed && (
                  <img className="logo" src="/images/subscribed.png" alt="subscribed" />
                )}
              </Link>
            </div>
            <div className="shopping-cart">
              <img className="logo" src="/images/freezer.png" alt="freezer" />
              <Link to="/shopping-cart">
                <ShoppingCartTotal cart={props.cart} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
