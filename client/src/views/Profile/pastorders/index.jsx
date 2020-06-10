import React, { Component } from 'react';
import { listOrders } from './../../../services/orders';

class PastOrdersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  getOrders = () => {
    listOrders().then((orders) => {
      this.setState({
        orders,
      });
    });
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    console.log(this.state.orders);
    return <div></div>;
  }
}

export default PastOrdersView;
