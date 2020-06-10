import React, { Component } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';

import formatPrice from './../../helpers/format-price';
import { cartTotalPrice } from './../../helpers/cartTotalPrice';
import { createOrder } from './../../services/orders';

const STRIPE_PUBLIC_KEY =
  'pk_test_51GsQBUF1yLVpeRpUg5evAiOWKNoS28XDt0TfrQKi8HYKrvPG2m8WUQODeiCuDY4XAvQ91BvaZDN6N9BAx7F8yUEP00CgFS2eH4';

const STRIPE_INPUT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'sans-serif',
    },
    invalid: {
      color: '#c23d4b',
    },
  },
};

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      contact: this.props.user.contact,
      address: this.props.user.address,
    };
    this.stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }

  createOrder = (token) => {
    const address = this.state.address;
    const cart = this.props.cart.map((item) => {
      return {
        quantity: item.quantity,
        meal: item.meal._id,
      };
    });
    return createOrder({ address, cart, token })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFormSubmission = (event, stripe, elements) => {
    event.preventDefault();
    const { name, email, contact, address } = this.state;
    let creditCardToken = '';
    if (this.props.user.creditCardToken) {
      creditCardToken = this.props.user.creditCardToken.paymentMethod.id;
      this.createOrder(creditCardToken);
    } else {
      stripe
        .createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        })
        .then((data) => {
          console.log(data);
          creditCardToken = data.paymentMethod.id;
          this.createOrder(creditCardToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const totalPrice = cartTotalPrice(this.props.cart);
    return (
      <div>
        <h1>Checkout</h1>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form
                onSubmit={(event) =>
                  this.handleFormSubmission(event, stripe, elements)
                }
              >
                <button>Submit</button>
                <h3>Delivery Recipient</h3>
                <label htmlFor='name-input'>Name</label>
                <input
                  type='text'
                  id='name-input'
                  name='name'
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <label htmlFor='email-input'>Email</label>
                <input
                  type='text'
                  id='email-input'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <label htmlFor='contact-input'>Contact</label>
                <input
                  type='text'
                  id='contact-input'
                  name='contact'
                  value={this.state.contact}
                  onChange={this.handleInputChange}
                />
                <label htmlFor='address-input'>Address</label>
                <input
                  type='text'
                  id='address-input'
                  name='address'
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
                <h3>Payment Method</h3>
                {(this.props.user.creditCardToken && (
                  <h1>
                    Card:
                    {this.props.user.creditCardToken.paymentMethod.card.brand.toUpperCase()}
                    {this.props.user.creditCardToken.paymentMethod.card.last4}
                  </h1>
                )) || <CardElement options={STRIPE_INPUT_OPTIONS} />}
              </form>
            )}
          </ElementsConsumer>
        </Elements>
        <h2>Final Amount: {formatPrice(totalPrice.totalPrice)}</h2>
      </div>
    );
  }
}

export default CheckoutView;