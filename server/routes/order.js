const { Router } = require('express');
const orderRouter = new Router();
const Meal = require('./../models/meals');
const Order = require('./../models/order');
const User = require('./../models/user');

const stripe = require('stripe');

const stripeInstance = stripe(process.env.STRIPE_SECRET);

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
        amount: Math.round(totalAmount),
        currency: 'EUR',
      };
      console.log(total);
      if (!req.user.customerId) {
        return stripeInstance.customers.create();
      } else {
        return Promise.resolve();
      }
    })
    .then((document) => {
      if (req.user.customerId) {
        return Promise.resolve();
      }
      customer = document;
      return stripeInstance.paymentMethods.attach(token, {
        customer: customer.id,
      });
    })
    .then((method) => {
      let paymentMethod = token;
      let customerId;
      if (req.user.customerId) {
        customerId = req.user.customerId;
        paymentMethod = req.user.creditCardToken.paymentMethod.id;
      } else {
        customerId = customer.id;
      }
      return stripeInstance.paymentIntents.create({
        customer: customerId,
        payment_method: paymentMethod,
        amount: total.amount,
        currency: total.currency,
        receipt_email: req.user.email,
        error_on_requires_action: true,
        confirm: true,
        save_payment_method: true,
      });
    })
    .then((payment) => {
      if (payment.status !== 'succeeded') {
        return Promise.reject(new Error('Payment proccessing failed'));
      } else {
        return Order.create({
          cart: cart,
          total: total,
          payment: payment.id,
          address: address,
          user: req.user._id,
        });
      }
    })
    .then((order) => {
      res.json({
        order,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

orderRouter.post('/create-subscription', (req, res, next) => {
  const { customerId, creditCardToken } = req.user;
  const priceId = 'price_1Gso9DF1yLVpeRpUbyR1kY7i';
  return stripeInstance.customers
    .update(req.user.customerId, {
      invoice_settings: {
        default_payment_method: creditCardToken.paymentMethod.id,
      },
    })
    .then(() => {
      return stripeInstance.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
      });
    })
    .then((subscription) => {
      console.log(subscription);
      const status = subscription.status === 'active' ? true : false;
      const subscriptionId = subscription.id;
      console.log(status);
      return User.findByIdAndUpdate(
        req.user._id,
        {
          subscribed: status,
          subscriptionId,
          subscription: {
            created: subscription.created,
            started: subscription.start_date,
            ends: subscription.current_period_end,
          },
          subscriptionMeals: [],
        },
        { new: true }
      );
    })
    .then((user) => {
      res.json({ user: user });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

orderRouter.post('/check-subscription', (req, res, next) => {
  if (!req.user.subscriptionId) {
    return;
  }
  return stripeInstance.subscriptions
    .retrieve(req.user.subscriptionId)
    .then((subscription) => {
      console.log(subscription);
      const status = subscription.status === 'active' ? true : false;
      if (
        req.user.subscribed !== status ||
        req.user.subscription.ends !== subscription.current_period_end
      ) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            subscribed: status,
            subscription: {
              created: subscription.created,
              started: subscription.start_date,
              ends: subscription.current_period_end,
            },
          },
          { new: true }
        ).then((user) => {
          res.json({ user: user });
        });
      } else {
        res.json({ user: req.user });
      }
    });
});

orderRouter.post('/cancel-subscription', (req, res, next) => {
  stripeInstance.subscriptions
    .del(req.user.subscriptionId)
    .then((subscription) => {
      return User.findByIdAndUpdate(
        req.user._id,
        {
          subscribed: false,
          subscriptionId: null,
          subscription: {},
          subscriptionMeals: [],
        },
        { new: true }
      ).then((user) => {
        res.json({ user: user });
      });
    });
});

orderRouter.get('/list', (req, res, next) => {
  Order.find({ user: req.user._id })
    .then((orders) => {
      console.log(orders);
      res.json({
        orders,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = orderRouter;
