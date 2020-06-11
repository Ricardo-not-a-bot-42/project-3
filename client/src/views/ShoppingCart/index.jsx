import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import CartItem from './../../components/CartItem';
import { cartTotalPrice, cartMealTotal } from './../../helpers/cartTotalPrice';
import formatPrice from './../../helpers/format-price';
import generateKey from './../../helpers/randomKeyGen';

class ShoppingCartView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const totalMeals = cartMealTotal(this.props.cart);
    const totalPrice = cartTotalPrice(this.props.cart);
    const color_five = totalMeals >= 5 ? 'green' : 'red';
    const color_ten = totalMeals >= 10 ? 'green' : 'red';
    return (
      <div>
        <h2>Your Shopping Cart</h2>
        {(this.props.cart.length &&
          this.props.cart.map((item) => {
            return (
              <CartItem {...item} add={this.props.add} key={generateKey()} />
            );
          })) || <p>Your cart is empty</p>}
        <h3>Order Details</h3>
        <div className='order-details'>
          <div className='total'>
            <div>Total Meals: {totalMeals}</div>
            <div>{formatPrice(totalPrice.initialPrice)}</div>
          </div>

          <div className='discount'>
            <div style={{ color: color_five }}>
              Get 10% off when ordering 5+ meals:
            </div>
            <div style={{ color: color_five }}>
              -{formatPrice(totalPrice.tenMealDiscount)}
            </div>
          </div>

          <div className='discount'>
            <div style={{ color: color_ten }}>
              Get 15% off when ordering 10+ meals:
            </div>
            <div style={{ color: color_ten }}>
              -{formatPrice(totalPrice.fifteenMealDiscount)}
            </div>
          </div>

          <div className='total-final'>
            <div>{formatPrice(totalPrice.totalPrice)}</div>
          </div>
          <div>
            {(this.props.cart.length && (
              <Link className='bottom-linkAsButton ' to='/checkout'>
                Procceed to Checkout
              </Link>
            )) || (
              <Link className='bottom-linkAsButton' to='/freezer'>
                Return to freezer
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCartView;
