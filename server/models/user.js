'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  subscriptionId: {
    type: String,
  },
  subscription: {
    type: Object,
  },
  subscriptionMeals: {
    type: [Object],
    maxlength: 10,
  },
  creditCardToken: {
    type: Object,
    default: {},
  },
  customerId: {
    type: String,
  },
  contact: {
    type: String,
  },
  userType: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
  passwordHash: {
    type: String,
    required: true,
  },
  ratings: {
    type: [String],
  },
});

module.exports = mongoose.model('User', schema);
