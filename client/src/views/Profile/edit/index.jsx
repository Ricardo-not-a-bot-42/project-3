import React, { Component } from 'react';
import { editProfile } from './../../../services/authentication';

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      contact: '',
      creditCardToken: ''
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, email, address, contact, creditCardToken } = this.state;
    editProfile({
      name: '',
      email: '',
      address: '',
      contact: '',
      creditCardToken: ''
    }).then((user) => {
      console.log(user);
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <h2>Your Profile</h2>
        {this.props.user && (
          <>
            <form onSubmit={this.handleFormSubmission}>
              <label htmlFor="name-input">Full Name</label>
              <input
                id="name-input"
                name="name"
                type="name"
                placeholder="Full Name"
                value={this.props.user.name}
                onChange={this.handleInputChange}
              />

              <label htmlFor="email-input">E-mail</label>
              <input
                id="email-input"
                name="email"
                type="email"
                placeholder="E-mail"
                value={this.props.user.email}
                onChange={this.handleInputChange}
              />

              <label htmlFor="address-input">Delivery Address</label>
              <input
                id="address-input"
                name="address"
                type="address"
                placeholder="Delivery Address"
                value={this.props.user.address}
                onChange={this.handleInputChange}
              />

              <label htmlFor="contact-input">Contact Number</label>
              <input
                id="contact-input"
                name="contact"
                type="contact"
                placeholder="911 111 111"
                value={this.props.user.contact}
                onChange={this.handleInputChange}
              />

              <label htmlFor="creditCardToken-input">Credit Card</label>
              <input
                id="creditCardToken-input"
                name="creditCardToken"
                type="creditCardToken"
                placeholder="creditCardToken Method"
                value={this.props.user.creditCardToken}
                onChange={this.handleInputChange}
              />

              <button className="bottom-button">Submit Changes</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default ProfileEditView;
