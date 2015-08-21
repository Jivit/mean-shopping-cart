var mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.MONGOLAB_URI);

module.exports.Teas = require('./tea');
module.exports.Carts = require('./cart');
