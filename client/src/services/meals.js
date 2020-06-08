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

const listSingleMeal = (id) => {
  return baseMealsService
    .get(`/${id}`)
    .then((response) => {
      const data = response.data;
      const meal = data.meal;
      return Promise.resolve({ ...meal });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export { listAllMeals, listPopularMeals, listSingleMeal };
