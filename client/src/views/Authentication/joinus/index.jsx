import React, { Component } from 'react';
import { joinUs } from './../../../services/authentication';

class AuthenticationJoinUsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      contact: '',
      creditCardToken: '',
      password: ''
    };
  }

  //   handleInputChange = ({target: {name, value}}) => {
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, email, address, contact, creditCardToken, password } = this.state;
    // console.log(name, email, address, contact, creditCardToken, password);

    joinUs({ name, email, address, contact, creditCardToken, password })
      .then((user) => {
        this.props.updateUser(user);
        this.props.history.push('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>Join Us!</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="name-input">Full Name</label>
          <input
            id="name-input"
            name="name"
            type="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="address-input">Delivery Address</label>
          <input
            id="address-input"
            name="address"
            type="address"
            placeholder="Delivery Address"
            value={this.state.address}
            onChange={this.handleInputChange}
          />

          <label htmlFor="contact-input">Contact Number</label>
          <input
            id="contact-input"
            name="contact"
            type="contact"
            placeholder="911 111 111"
            value={this.state.contact}
            onChange={this.handleInputChange}
          />

          <label htmlFor="creditCardToken-input">Credit Card</label>
          <input
            id="creditCardToken-input"
            name="creditCardToken"
            type="creditCardToken"
            placeholder="Credit Card"
            value={this.state.creditCardToken}
            onChange={this.handleInputChange}
          />

          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="Strong Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button className="bottom-button">Register and continue</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationJoinUsView;
