import axios from 'axios';

import getRecommendation from './../helpers/collaborativeFiltering';

const baseMealsService = axios.create({
  baseURL: '/api/meals/',
});

const baseAuthService = axios.create({
  baseURL: '/api/authentication/',
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

const listRecommendedMeals = (user) => {
  return baseAuthService.get('/list').then((users) => {
    console.log(user, users.data.list);
    const recommendations = getRecommendation(user, users.data.list);
    console.log(recommendations);
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

const createNewMeal = (body) => {
  console.log(body.name);
  return baseMealsService
    .post(`/create`, body)
    .then((response) => {
      const data = response.data;
      const meal = data.meal;
      return Promise.resolve({ ...meal });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const editMeal = (id, body) => {
  console.log(body);
  return baseMealsService
    .post(`/${id}/edit`, body)
    .then((response) => {
      const data = response.data;
      const meal = data.meal;
      return Promise.resolve({ ...meal });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const deleteMeal = (id) => {
  return baseMealsService
    .post(`/${id}/delete`)
    .then((response) => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const setRating = (id, body) => {
  console.log('rate', body);
  return baseMealsService
    .post(`/${id}/addRating`, { body })
    .then((response) => {
      const data = response.data;
      const meal = data.meal;
      return Promise.resolve({ ...meal });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export {
  listAllMeals,
  listPopularMeals,
  listRecommendedMeals,
  listSingleMeal,
  createNewMeal,
  editMeal,
  deleteMeal,
  setRating,
};
