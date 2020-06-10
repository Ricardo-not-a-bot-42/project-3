import React from 'react';
import { listCartMeals } from './../../services/meals';
import formatPrice from './../../helpers/format-price';

function ShoppingCartTotal(props) {
  const cart = props.cart;
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.meal.price.amount * item.quantity,
    0
  );
  const totalPrice = {
    amount: totalAmount,
    currency: 'EUR',
  };
  return <div>{formatPrice(totalPrice)}</div>;
}

export default ShoppingCartTotal;
