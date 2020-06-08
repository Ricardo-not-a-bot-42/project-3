const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [String],
  },
  category: {
    type: String,
    enum: ['Meat', 'Fish', 'Dessert', 'Fast-food'],
  },
  price: {
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
  },
  ratings: {
    type: Number,
  },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
