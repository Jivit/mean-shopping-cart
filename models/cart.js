var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  user_id: String,
  items: Array
})

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
/*

items: [{
item_id: String
item_qty: integer
},]

*/
