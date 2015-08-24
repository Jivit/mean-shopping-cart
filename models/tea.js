var mongoose = require('mongoose');

var teaSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  caffeineScale: Number,
  price: Number,
  inStock: Boolean,
  rating: Number,
  imageUrl: String,
  __v: Number,
  categories: Array
});

var Tea = mongoose.model('Tea', teaSchema, 'teas');

module.exports = Tea;
