const { Router } = require('express');
const mealRouter = new Router();
const Meal = require('./../models/meals');

mealRouter.get('/list', (req, res, next) => {
  Meal.find()
    .then((meals) => {
      res.json({
        meals,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

mealRouter.get('/popular', (req, res, next) => {
  Meal.find()
    .sort({ ratings: -1 })
    .then((meals) => {
      res.json({
        meals,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

mealRouter.get('/:id', (req, res, next) => {
  const mealId = req.params.id;
  Meal.findById(mealId)
    .then((meal) => {
      res.json({
        meal,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

mealRouter.post('/create', (req, res, next) => {
  const mealDetails = { ...req.body };
  console.log(req.body);
  Meal.create(mealDetails)
    .then((meal) => {
      console.log(meal);
      res.json({
        meal,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

mealRouter.post('/:id/edit', (req, res, next) => {
  const mealId = req.params.id;
  const mealDetails = { ...req.body };
  console.log(mealDetails);
  Meal.findByIdAndUpdate(mealId, mealDetails)
    .then((meal) => {
      console.log(meal);
      res.json({
        meal,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

mealRouter.post('/:id/delete', (req, res, next) => {
  const mealId = req.params.id;
  Meal.findByIdAndDelete(mealId)
    .then((meal) => {
      console.log(meal);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = mealRouter;
