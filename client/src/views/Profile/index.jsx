import React, { Component } from 'react';
import './style.scss';

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
      {props.user && (
        <>
          <div className="input">
            <strong> Full Name:</strong> {props.user.name}
          </div>
          <div className="input">
            <strong> E-mail:</strong> {props.user.email}
          </div>
          <div className="input">
            <strong> Delivery Address:</strong> {props.user.address}
          </div>
          <div className="input">
            <strong> Contact Number:</strong> {props.user.contact}
          </div>
          <div className="input">
            <strong> Credit Card:</strong> {props.user.creditCardToken}
          </div>

          <div className="profile-buttons">
            <button>Edit Profile</button>
            <button>Past Orders</button>
          </div>
        </>
      )}

      <button onClick={singOutAndLiftUserState} className="bottom-button">
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
