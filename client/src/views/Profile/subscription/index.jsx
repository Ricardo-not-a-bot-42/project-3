import React, { Component } from 'react';
import {
  createSubscription,
  checkSubscription,
  cancelSubscription,
} from './../../../services/orders';

class SubscriptionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.user.subscribed,
    };
  }

  render() {
    return (
      <div>
        {(this.state.subscribed && (
          <div>
            <h2>Subscribed</h2>
            <h5>
              Subscribed on:{' '}
              {new Date(
                this.props.user.subscription.created * 1000
              ).toDateString()}
            </h5>
            <h5>
              Next payment on:{' '}
              {new Date(
                this.props.user.subscription.ends * 1000
              ).toDateString()}
            </h5>
            <button onClick={() => cancelSubscription()}>
              Cancel Subscription
            </button>
          </div>
        )) || (
          <div>
            <h2>Weekly Freezer Drop-Off</h2>
            <h4>
              For just 50€, pick and choose 10 meals to be delivered at the
              beggining of the following week, and cancel anytime.
            </h4>
            <h4>Feel free to contact us for any questions you might have!</h4>
            <button onClick={() => createSubscription()}>Subscribe! 50€</button>
          </div>
        )}
      </div>
    );
  }
}

export default SubscriptionView;
