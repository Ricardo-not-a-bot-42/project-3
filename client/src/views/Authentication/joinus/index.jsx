import React, { Component } from 'react';

class AuthenticationJoinUsView extends Component {
  render() {
    return (
      <div>
        <h2>Join Us!</h2>
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

          <label htmlFor="delivery-input">Delivery Adress</label>
          <input
            id="delivery-input"
            name="delivery"
            type="delivery"
            placeholder="Delivery Adress"
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

          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="Strong Password"
            value=""
            onChange=""
          />

          <button className="bottom-button">Register and continue</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationJoinUsView;
