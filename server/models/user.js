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
  creditCardToken: {
    type: Object,
    default: {},
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
