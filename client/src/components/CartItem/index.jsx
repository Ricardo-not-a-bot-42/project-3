import React from 'react';
import formatPrice from './../../helpers/format-price';

function CartItem(props) {
  console.log(props);
  return (
    <div>
      <div className='cart-item-info'>
        <img src='' alt='' />
        <div className='cart-item-name-price'>
          <h3>{props.meal.name}</h3>
          <h3>{formatPrice(props.meal.price)}</h3>
        </div>
      </div>
      <div className='cart-item-quantity'>
        <button onClick={() => props.add(props.meal, props.quantity - 1)}>
          -
        </button>
        <h3>Qty: {props.quantity}</h3>
        <button onClick={() => props.add(props.meal, props.quantity + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
