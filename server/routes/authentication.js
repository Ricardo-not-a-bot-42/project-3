'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

router.post('/join-us', (req, res, next) => {
  const { name, email, address, contact, creditCardToken, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        address,
        contact,
        creditCardToken,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/addRating', (req, res, next) => {
  const user = req.user;
  const mealName = req.body.name;
  const userRatings = req.user.ratings;
  if (userRatings.includes(mealName)) {
    userRatings.splice(userRatings.indexOf(mealName), 1);
  } else {
    userRatings.push(mealName);
  }
  User.findByIdAndUpdate(user._id, { ratings: userRatings })
    .then((document) => {})
    .catch((error) => {
      next(error);
    });
});

router.post('/signout', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/profile', (req, res, next) => {
  res.json({
    user: req.user || null
    // if there is a user, we pass a user, if not (undefined) we pass null
  });
});

module.exports = router;
