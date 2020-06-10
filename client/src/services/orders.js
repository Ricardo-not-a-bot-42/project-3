import axios from 'axios';

const baseOrderService = axios.create({
  baseURL: '/api/order',
});

const createOrder = (data) => {
  return baseOrderService
    .post('/create', data)
    .then((response) => {
      const responseBody = response.data;
      console.log(responseBody);
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listOrders = () => {
  return baseOrderService.get('/list').then((response) => {
    console.log(response);
    return Promise.resolve();
  });
};

const createSubscription = () => {
  return baseOrderService.post('/create-subscription').then((response) => {
    console.log(response);
    return Promise.resolve();
  });
};
const cancelSubscription = () => {
  return baseOrderService.post('/cancel-subscription').then((response) => {
    console.log(response);
    return Promise.resolve();
  });
};

const checkSubscription = () => {
  return baseOrderService.post('/check-subscription').then((response) => {
    console.log(response);
    return Promise.resolve();
  });
};

export {
  createOrder,
  listOrders,
  createSubscription,
  checkSubscription,
  cancelSubscription,
};
