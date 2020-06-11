import React, { Component } from 'react';
import {
  createSubscription,
  checkSubscription,
  cancelSubscription,
} from './../../../services/orders';
import { updateSubscription } from './../../../services/authentication';
import CartItem from './../../../components/CartItem';
import './style.scss';

class SubscriptionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.user.subscribed,
      subscriptionMeals: [],
    };
  }

  updateSubMealList = () => {
    this.setState({
      subscriptionMeals: this.props.user.subscriptionMeals,
    });
  };

  componentDidMount = () => {
    this.updateSubMealList();
  };

  render() {
    return (
      <div>
        {(this.state.subscribed && (
          <div>
            <h2>Subscribed</h2>
            <div className='subscription-details'>
              <div>
                <strong>Subscribed on: </strong>
                {new Date(
                  this.props.user.subscription.created * 1000
                ).toDateString()}
              </div>
              <div>
                <strong>Next payment on: </strong>
                {new Date(
                  this.props.user.subscription.ends * 1000
                ).toDateString()}
              </div>
            </div>
            <button
              className='bottom-button'
              onClick={() => {
                cancelSubscription().then((user) => {
                  console.log(user);
                  this.setState({
                    subscribed: user.subscribed,
                  });
                  this.props.updateUser(user);
                });
              }}
            >
              Cancel Subscription
            </button>
            <div>
              <h2>
                Meals to Deliver - {this.props.user.subscriptionMeals.length}/10
              </h2>
              {this.props.user.subscriptionMeals.map((meal) => {
                return (
                  <div className='order-info'>
                    <img src={meal.photoUrl} alt='' />
                    <div className='cart-item-name-price'>
                      <div>{meal.name}</div>
                    </div>
                    <div className='cart-item-quantity linkAsButton'>
                      <button
                        className='add-remove-button'
                        onClick={() =>
                          updateSubscription(meal).then((user) => {
                            this.props.updateUser(user);
                            this.setState({
                              subscriptionMeals: user.subscriptionMeals,
                            });
                          })
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )) || (
          <div>
            <h2>Weekly Freezer Drop-Off</h2>
            <div className='weekle-freezer'>
              <div>
                For just 50€, pick and choose 10 meals to be delivered at the
                beggining of the following week, and cancel anytime.
              </div>
              <div>
                Feel free to contact us for any questions you might have!
              </div>
            </div>
            <button
              onClick={() =>
                createSubscription().then((user) => {
                  this.props.updateUser(user);
                  this.setState({
                    subscribed: user.subscribed,
                  });
                })
              }
            >
              Subscribe! 50€
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default SubscriptionView;
