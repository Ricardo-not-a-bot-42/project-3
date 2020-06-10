'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const stripe = require('stripe');

const stripeInstance = stripe(process.env.STRIPE_SECRET);

const routeGuard = require('../middleware/route-guard');

const authenticationRouter = new Router();

authenticationRouter.post('/join-us', (req, res, next) => {
  const { name, email, address, contact, creditCardToken, password } = req.body;
  let customer;
  if (creditCardToken) {
    stripeInstance.customers
      .create()
      .then((document) => {
        customer = document;
        return stripeInstance.paymentMethods.attach(
          creditCardToken.paymentMethod.id,
          {
            customer: customer.id,
          }
        );
      })
      .then((method) => {
        console.log('+', customer);
        return bcryptjs.hash(password, 10);
      })
      .then((hash) => {
        return User.create({
          name,
          email,
          address,
          contact,
          creditCardToken,
          customerId: customer.id,
          passwordHash: hash,
        });
      })
      .then((user) => {
        req.session.user = user._id;
        res.json({ user });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  } else {
    bcryptjs
      .hash(password, 10)
      .then((hash) => {
        return User.create({
          name,
          email,
          address,
          contact,
          passwordHash: hash,
        });
      })
      .then((user) => {
        req.session.user = user._id;
        res.json({ user });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
});

authenticationRouter.post('/login', (req, res, next) => {
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

authenticationRouter.post('/addRating', (req, res, next) => {
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

authenticationRouter.post('/signout', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

authenticationRouter.get('/profile', (req, res, next) => {
  res.json({
    user: req.user || null,
    // if there is a user, we pass a user, if not (undefined) we pass null
  });
});

authenticationRouter.get('/list', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json({
        list: users,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

authenticationRouter.post('/profile/edit', (req, res, next) => {
  const userId = req.user._id;
  console.log('req.user', req.user._id);
  User.findByIdAndUpdate(userId, req.body)
    .then((user) => {
      console.log(user);
      res.json({
        user,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = authenticationRouter;
