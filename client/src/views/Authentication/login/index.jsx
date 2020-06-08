import React, { Component } from 'react';

class AuthenticationLogInView extends Component {
  render() {
    return (
      <div>
        <h2>Returning Customer</h2>
        <form>
          <label htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="E-mail"
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

export default AuthenticationLogInView;
