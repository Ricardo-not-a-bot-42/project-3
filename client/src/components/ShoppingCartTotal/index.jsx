import React from 'react';
import { listCartMeals } from './../../services/meals';
import formatPrice from './../../helpers/format-price';
import { cartTotalPrice } from './../../helpers/cartTotalPrice';

function ShoppingCartTotal(props) {
  const cart = props.cart;
  const totalPrice = cartTotalPrice(cart);
  return <div>{formatPrice(totalPrice.totalPrice)}</div>;
}

export default ShoppingCartTotal;
