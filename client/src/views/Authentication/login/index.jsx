import React, { Component } from 'react';
import { login } from './../../../services/authentication';

class AuthenticationLogInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email, password } = this.state;
    // console.log(name, email, address, contact, payment, password);

    login({ email, password })
      .then((user) => {
        this.props.updateUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>Returning Customer</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
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

          <button className="bottom-button">Login</button>
        </form>
      </div>
    );
  }
}

export default AuthenticationLogInView;
