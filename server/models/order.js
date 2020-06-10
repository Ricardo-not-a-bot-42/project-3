const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Meal',
        },
        quantity: {
          type: Number,
        },
      },
    ],
    total: {
      amount: { type: Number },
      currency: {
        type: String,
      },
    },
    address: {
      type: String,
    },
    payment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated',
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
