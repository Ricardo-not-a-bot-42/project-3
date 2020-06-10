const { Router } = require('express');
const orderRouter = new Router();
const Meal = require('./../models/meals');

const stripe = require('stripe');

const stripeInstance = stripe(
  'sk_test_51GsQBUF1yLVpeRpUgETu6AQTsuJKXDo0sBVpkrZNo0PBiC5yvJE9KNyDitvwM0rwoh0h3agArukOCZG3LXDszL4600pbB1aqkt'
);

orderRouter.post('/create', (req, res, next) => {
  console.log(req.body);
  const { address, token, cart } = req.body;

  const mealIds = cart.map((item) => item.meal);
  console.log(mealIds);
  let customer;
  let total;

  Meal.find({ _id: mealIds })
    .then((meals) => {
      let totalAmount = meals.reduce((sum, meal) => {
        const quantity = cart.find((item) => item.meal === meal._id.toString())
          .quantity;
        return sum + meal.price.amount * quantity;
      }, 0);
      console.log('Total: ', totalAmount);
      const mealAmount = meals.reduce((acc, meal) => {
        const quantity = cart.find((item) => item.meal === meal._id.toString())
          .quantity;
        return acc + quantity;
      }, 0);
      let tenMealDiscountValue = 0;
      let fifteenMealDiscountValue = 0;
      if (mealAmount >= 5) {
        tenMealDiscountValue = totalAmount * 0.1;
        totalAmount -= tenMealDiscountValue;
      }
      if (mealAmount >= 10) {
        fifteenMealDiscountValue = totalAmount * 0.15;
        totalAmount -= fifteenMealDiscountValue;
      }

      total = {
        amount: Math.round(totalAmount * 100),
        currency: 'EUR',
      };
      console.log(total);
      return stripeInstance.customers.create();
    })
    .then((document) => {
      customer = document;
      return stripeInstance.paymentMethods.attach(token, {
        customer: customer.id,
      });
    })
    .then((method) => {
      console.log(total.amount);
      return stripeInstance.paymentIntents.create({
        customer: customer.id,
        payment_method: token,
        amount: total.amount,
        currency: total.currency,
        error_on_requires_action: true,
        confirm: true,
        save_payment_method: true,
      });
    })
    .then((intent) => {
      console.log(intent);
      res.json({});
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = orderRouter;
