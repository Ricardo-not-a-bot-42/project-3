import axios from 'axios';

const baseMealsService = axios.create({
  baseURL: '/api/meals/',
});

const listAllMeals = () => {
  return baseMealsService
    .get('/list')
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listPopularMeals = () => {
  return baseMealsService
    .get('/popular')
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { listAllMeals, listPopularMeals };
