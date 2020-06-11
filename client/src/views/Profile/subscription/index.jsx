import React, { Component } from 'react';
import {
  createSubscription,
  checkSubscription,
  cancelSubscription
} from './../../../services/orders';
import './style.scss';

class SubscriptionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.user.subscribed
    };
  }

  render() {
    return (
      <div>
        {(this.state.subscribed && (
          <div>
            <h2>Subscribed</h2>
            <div className="subscription-details">
              <div>
                <strong>Subscribed on: </strong>
                {new Date(this.props.user.subscription.created * 1000).toDateString()}
              </div>
              <div>
                <strong>Next payment on: </strong>
                {new Date(this.props.user.subscription.ends * 1000).toDateString()}
              </div>
            </div>
            <button className="bottom-button" onClick={() => cancelSubscription()}>
              Cancel Subscription
            </button>
          </div>
        )) || (
          <div>
            <h2>Weekly Freezer Drop-Off</h2>
            <div className="weekle-freezer">
              <div>
                For just 50€, pick and choose 10 meals to be delivered at the beggining of the
                following week, and cancel anytime.
              </div>
              <div>Feel free to contact us for any questions you might have!</div>
            </div>
            <button onClick={() => createSubscription()}>Subscribe! 50€</button>
          </div>
        )}
      </div>
    );
  }
}

export default SubscriptionView;
