import React, { Component } from 'react';
import { editProfile, loadUser } from './../../../services/authentication';
import './style.scss';

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      contact: ''
    };
    console.log('this.props.user', this.props.user);
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, email, address, contact, creditCardToken } = this.state;
    editProfile({
      name,
      email,
      address,
      contact
    })
      .then((user) => {
        this.props.updateUser(user);
        this.props.history.push('/profile');
      })
      // .then(console.log('props.setState after update', this.setState.user))
      .catch((error) => console.log(error));
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    console.log('user did mount', this.props.user);
    const user = this.props.user;
    this.setState({
      name: user.name,
      email: user.email,
      address: user.address,
      contact: user.contact,
      creditCardToken: user.creditCardToken,
      loaded: true
    });
  }

  render() {
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
              <button className="bottom-button">Submit Changes</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default ProfileEditView;
