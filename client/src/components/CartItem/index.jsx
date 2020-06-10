import React from 'react';
import formatPrice from './../../helpers/format-price';

function CartItem(props) {
  console.log(props);
  return (
    <div className="order-info">
      <img src={props.meal.photoUrl} alt="" />
      <div className="cart-item-name-price">
        <div>{props.meal.name}</div>
        <div>{formatPrice(props.meal.price)}</div>
      </div>
      <div className="cart-item-quantity linkAsButton">
        <button
          className="add-remove-button"
          onClick={() => props.add(props.meal, props.quantity - 1)}
        >
          -
        </button>
        <span className="cart-qtd">{props.quantity}</span>
        <button
          className="add-remove-button"
          onClick={() => props.add(props.meal, props.quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
