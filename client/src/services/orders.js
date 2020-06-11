import axios from 'axios';

const baseOrderService = axios.create({
  baseURL: '/api/order',
});

const createOrder = (data) => {
  return baseOrderService
    .post('/create', data)
    .then((response) => {
      const order = response.data.order;
      return Promise.resolve(order);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listOrders = () => {
  return baseOrderService.get('/list').then((response) => {
    return Promise.resolve(response.data.orders);
  });
};

const createSubscription = () => {
  return baseOrderService.post('/create-subscription').then((response) => {
    const user = response.data.user;
    return Promise.resolve(user);
  });
};
const cancelSubscription = () => {
  return baseOrderService.post('/cancel-subscription').then((response) => {
    const user = response.data.user;
    return Promise.resolve(user);
  });
};

const checkSubscription = () => {
  return baseOrderService.post('/check-subscription').then((response) => {
    if (response.data.user) {
      const user = response.data.user;
      return Promise.resolve(user);
    }
  });
};

export {
  createOrder,
  listOrders,
  createSubscription,
  checkSubscription,
  cancelSubscription,
};
