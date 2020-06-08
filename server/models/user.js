'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  CreditCardToken: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
