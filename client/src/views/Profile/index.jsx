import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import { signOut } from './../../services/authentication';

const ProfileView = (props) => {
  console.log('props', props);
  const singOutAndLiftUserState = () => {
    signOut()
      .then(() => {
        props.updateUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        {props.user && (
          <>
            <div className="input text-align-left">
              <strong> Full Name:</strong> {props.user.name}
            </div>
            <div className="input text-align-left">
              <strong> E-mail:</strong> {props.user.email}
            </div>
            <div className="input text-align-left">
              <strong> Delivery Address:</strong> {props.user.address}
            </div>
            <div className="input text-align-left">
              <strong> Contact Number:</strong> {props.user.contact}
            </div>
            <div className="input text-align-left">
              <strong> Credit Card:</strong> {props.user.creditCardToken}
            </div>

            <div className="profile-buttons">
              <Link className="linkAsButton" to="/profile/edit">
                Edit Profile
              </Link>
              <button>Past Orders</button>
            </div>
          </>
        )}
      </div>

      <button onClick={singOutAndLiftUserState} className="bottom-button">
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
