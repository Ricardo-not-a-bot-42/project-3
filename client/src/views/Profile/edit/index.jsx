import React, { Component } from 'react';
import { editProfile, loadUser } from './../../../services/authentication';

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      contact: '',
      creditCardToken: '',
    };
    this.id = this.props.user._id;
    console.log('this.props.user', this.props.user);
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, email, address, contact, creditCardToken } = this.state;
    const newUser = {
      name,
      email,
      address,
      contact,
      creditCardToken,
    };
    editProfile(this.id, {
      name,
      email,
      address,
      contact,
      creditCardToken,
    }).then((user) => {
      this.props.updateUser(user);
    });
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    console.log('user did mount', this.props.user);
    loadUser(this.props.user)
      .then((user) => {
        this.setState({
          name: user.name,
          email: user.email,
          address: user.address,
          contact: user.contact,
          creditCardToken: user.creditCardToken,
          loaded: true,
        });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Your Profile</h2>
        {this.props.user && (
          <>
            <form onSubmit={this.handleFormSubmission}>
              <label htmlFor='name-input'>Full Name</label>
              <input
                id='name-input'
                name='name'
                type='name'
                placeholder='Full Name'
                value={this.state.name}
                onChange={this.handleInputChange}
              />

              <label htmlFor='email-input'>E-mail</label>
              <input
                id='email-input'
                name='email'
                type='email'
                placeholder='E-mail'
                value={this.state.email}
                onChange={this.handleInputChange}
              />

              <label htmlFor='address-input'>Delivery Address</label>
              <input
                id='address-input'
                name='address'
                type='address'
                placeholder='Delivery Address'
                value={this.state.address}
                onChange={this.handleInputChange}
              />

              <label htmlFor='contact-input'>Contact Number</label>
              <input
                id='contact-input'
                name='contact'
                type='contact'
                placeholder='911 111 111'
                value={this.state.contact}
                onChange={this.handleInputChange}
              />

              <label htmlFor='creditCardToken-input'>Credit Card</label>
              <input
                id='creditCardToken-input'
                name='creditCardToken'
                type='creditCardToken'
                placeholder='creditCardToken Method'
                value={this.state.creditCardToken}
                onChange={this.handleInputChange}
              />

              <button className='bottom-button'>Submit Changes</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default ProfileEditView;
