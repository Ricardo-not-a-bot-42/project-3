import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import { signOut } from './../../services/authentication';
import {
  createSubscription,
  checkSubscription,
  cancelSubscription,
} from './../../services/orders';

const ProfileView = (props) => {
  console.log('props', props);
  const singOutAndLiftUserState = () => {
    signOut()
      .then(() => {
        props.emptyCart();
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
            <div className='profile-details input text-align-left'>
              <div>
                <strong> Full Name:</strong> {props.user.name}
              </div>
              <div>
                <strong> E-mail:</strong> {props.user.email}
              </div>
              <div>
                <strong> Delivery Address:</strong> {props.user.address}
              </div>
              <div>
                <strong> Contact Number:</strong> {props.user.contact}
              </div>

              <div>
                {props.user.creditCardToken && (
                  <div>
                    <strong> Credit Card:</strong>{' '}
                    {props.user.creditCardToken.paymentMethod.card.brand.toUpperCase()}{' '}
                    •••• •••• ••••{' '}
                    {props.user.creditCardToken.paymentMethod.card.last4}
                  </div>
                )}
              </div>
            </div>

            <div className='buttons-links'>
              <div className='profile-buttons'>
                <Link
                  className='linkAsButton page-buttons-links'
                  to='/profile/edit'
                >
                  Edit <br /> Profile
                </Link>
                <Link
                  className='linkAsButton page-buttons-links'
                  to='/profile/past-orders'
                >
                  View Past Orders
                </Link>
              </div>
              <div className='subscription-promo-link'>
                <h3>Weekly Freezer Drop-Off</h3>
                <h2>
                  <strong>One subscription, weekly meals</strong>
                  <div>
                    <strong> Subscription status:</strong>{' '}
                    {(props.user.subscribed && 'Subscribed') ||
                      'Not Subscribed'}
                  </div>
                  <Link
                    className='linkAsButton page-buttons-links'
                    to='/profile/subscription'
                  >
                    View Subscription
                  </Link>
                </h2>

                <strong></strong>
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={singOutAndLiftUserState} className='bottom-button'>
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
