import React, { Component } from 'react';
import { listOrders } from './../../../services/orders';
import generateKey from './../../../helpers/randomKeyGen';

import OrderItem from './../../../components/OrderItem';

class PastOrdersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loaded: false,
    };
  }
  getOrders = () => {
    listOrders().then((orders) => {
      console.log('orders: ', orders);
      this.setState({
        orders,
        loaded: true,
      });
    });
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    return (
      <div>
        {this.state.loaded && (
          <div>
            <h2>Past Orders</h2>
            {this.state.orders.map((order) => {
              return <OrderItem order={order} key={generateKey()} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default PastOrdersView;
