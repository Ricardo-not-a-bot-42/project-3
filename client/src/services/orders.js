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
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listOrders = () => {
  return baseOrderService.get('/list').then((response) => {
    console.log(response);
  });
};

export { createOrder, listOrders };
