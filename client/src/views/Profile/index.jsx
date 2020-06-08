import React, { Component } from 'react';
import './style.scss';

class ProfileView extends Component {
  render() {
    return (
      <div>
        <h2>Your Profile</h2>
        <form>
          <label htmlFor="full-name-input">Full Name</label>
          <input
            id="full-name-input"
            name="full-name"
            type="full-name"
            placeholder="Full Name"
            value=""
            onChange=""
          />

          <label htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="E-mail"
            value=""
            onChange=""
          />

          <label htmlFor="delivery-input">Delivery Address</label>
          <input
            id="delivery-input"
            name="delivery"
            type="delivery"
            placeholder="Delivery Addess"
            value=""
            onChange=""
          />

          <label htmlFor="contact-input">Contact Number</label>
          <input
            id="contact-input"
            name="contact"
            type="contact"
            placeholder="911 111 111"
            value=""
            onChange=""
          />

          <label htmlFor="payment-input">Payment Method</label>
          <input
            id="payment-input"
            name="payment"
            type="payment"
            placeholder="Payment Method"
            value=""
            onChange=""
          />
          <div className="profile-buttons">
            <button>Edit Profile</button>
            <button>Past Orders</button>
          </div>

          <button className="bottom-button">Logout</button>
        </form>
      </div>
    );
  }
}

export default ProfileView;
