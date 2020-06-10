import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CartItem from './../../components/CartItem';
import { cartTotalPrice, cartMealTotal } from './../../helpers/cartTotalPrice';
import formatPrice from './../../helpers/format-price';

class ShoppingCartView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const totalMeals = cartMealTotal(this.props.cart);
    const totalPrice = cartTotalPrice(this.props.cart);
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        {(this.props.cart.length && (
          <Link to='/checkout'>Procceed to Checkout</Link>
        )) || <button disabled>Procceed to Checkout</button>}
        {(this.props.cart.length &&
          this.props.cart.map((item) => {
            return <CartItem {...item} add={this.props.add} />;
          })) || <h3>Your cart is empty</h3>}
        <h1>Order Details</h1>
        <h2>Total Meals: {totalMeals}</h2>
        <h2>Initial Price: {formatPrice(totalPrice.initialPrice)}</h2>
        <h3>
          Get 10% off when ordering 5+ meals: -
          {formatPrice(totalPrice.tenMealDiscount)}
        </h3>
        <h3>
          Get 15% off when ordering 10+ meals: -
          {formatPrice(totalPrice.fifteenMealDiscount)}
        </h3>
        <h2>Final Price: {formatPrice(totalPrice.totalPrice)}</h2>
      </div>
    );
  }
}

export default ShoppingCartView;
