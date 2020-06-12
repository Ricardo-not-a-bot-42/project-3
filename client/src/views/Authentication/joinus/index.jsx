import React, { Component } from 'react';
import { joinUs } from './../../../services/authentication';

import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import './style.scss';

const STRIPE_PUBLIC_KEY =
  'pk_test_51GsQBUF1yLVpeRpUg5evAiOWKNoS28XDt0TfrQKi8HYKrvPG2m8WUQODeiCuDY4XAvQ91BvaZDN6N9BAx7F8yUEP00CgFS2eH4';

const STRIPE_INPUT_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      color: '#424770',
      fontFamily: 'sans-serif'
    },
    invalid: {
      color: '#8e8b8c'
    },
    '::placeholder': {
      color: '#87bbfd'
    }
  }
};

class AuthenticationJoinUsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      contact: '',
      addPaymentInfo: false,
      password: ''
    };
    this.stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }

  //   handleInputChange = ({target: {name, value}}) => {
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  togglePaymentAdd = () => {
    this.setState({
      addPaymentInfo: !this.state.addPaymentInfo
    });
  };

  handleFormSubmission = (event, stripe, elements) => {
    event.preventDefault();
    const { name, email, address, contact, password } = this.state;
    if (this.state.addPaymentInfo) {
      stripe
        .createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)
        })
        .then((data) => {
          const creditCardToken = data;
          console.log(creditCardToken);
          return joinUs({
            name,
            email,
            address,
            contact,
            creditCardToken,
            password
          });
        })
        .then((user) => {
          this.props.updateUser(user);
          this.props.history.push('/profile');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return joinUs({
        name,
        email,
        address,
        contact,
        password
      })
        .then((user) => {
          this.props.updateUser(user);
          this.props.history.push('/profile');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <h2>Join Us!</h2>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={(event) => this.handleFormSubmission(event, stripe, elements)}>
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

                <label htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="Strong Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                {(this.state.addPaymentInfo && (
                  <div className="payment-method">
                    <label htmlFor="creditCardToken-input">Credit Card</label>
                    <CardElement options={STRIPE_INPUT_OPTIONS} />
                    <button onClick={this.togglePaymentAdd}>Cancel Credit Card Submission</button>
                  </div>
                )) || <button onClick={this.togglePaymentAdd}>Add payment method</button>}

                <button className="final-button">Register and continue</button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default AuthenticationJoinUsView;
