import React, { Component } from 'react';
import formatPrice from './../../helpers/format-price';
import { listCartMeals } from './../../services/meals';
import generateKey from './../../helpers/randomKeyGen';
import './style.scss';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      meals: null,
      loaded: false
    };
  }

  componentDidMount() {
    const mealIds = this.props.order.cart.map((cartItem) => {
      return cartItem.meal;
    });
    listCartMeals(mealIds).then((meals) => {
      for (let meal of meals) {
        meal.quantity = this.props.order.cart.find((item) => item.meal === meal._id).quantity;
      }
      this.setState({
        meals: meals,
        loaded: true
      });
    });
  }

  toggleExpansion = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    return (
      <div className="order">
        {this.state.loaded && (
          <div className="text-align-left">
            <div className="order-body">
              <div>
                <strong>Ordered on: </strong>{' '}
                {new Date(this.props.order.dateCreated).toDateString()}
              </div>
              <div>
                <strong>Delivered to: </strong> {this.props.order.address}
              </div>
              <div>
                <strong>Items: </strong>
                {this.props.order.cart.length}
              </div>
              <div>
                <strong>Amount: </strong>
                {formatPrice(this.props.order.total)}
              </div>
              <button onClick={this.toggleExpansion}>Order Details</button>
            </div>

            <div className="order-expand">
              {this.state.expanded &&
                this.state.meals.map((meal) => {
                  return (
                    <div className="order-info">
                      <img src={meal.photoUrl} alt="" />
                      <div className="cart-item-name-price">
                        <div>{meal.name}</div>
                        <div>
                          {formatPrice({
                            amount: meal.price.amount * meal.quantity,
                            currency: meal.price.currency
                          })}
                        </div>
                      </div>
                      <div className="cart-item-quantity linkAsButton">
                        <span className="cart-qtd">{meal.quantity}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OrderItem;
