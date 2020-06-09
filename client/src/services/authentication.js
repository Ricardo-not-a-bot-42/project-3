import axios from 'axios';

const baseAuthenticationService = axios.create({
  baseURL: '/api/authentication',
});

const joinUs = (body) => {
  console.log(body);
  return baseAuthenticationService
    .post('/join-us', body)
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const login = (body) => {
  return baseAuthenticationService
    .post('/login', body)
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const signOut = () => {
  return baseAuthenticationService
    .post('/signout')
    .then((response) => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const loadAuthenticatedUser = () => {
  return baseAuthenticationService
    .get('/profile')
    .then((response) => {
      const data = response.data;
      const user = data.user;
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const listAllUsers = () => {
  return baseAuthenticationService
    .get('/list')
    .then((response) => {
      const data = response.data;
      const users = data.list;
      return Promise.resolve(users);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const addRating = (mealName) => {
  const body = {
    name: mealName,
  };
  return baseAuthenticationService
    .post('/addRating', body)
    .then((response) => {
      const data = response.data;
      // const user = data.user;
      // return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export {
  joinUs,
  login,
  signOut,
  loadAuthenticatedUser,
  addRating,
  listAllUsers,
};
