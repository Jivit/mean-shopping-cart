var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  user_id: String,
  items: Array
})


/*

items: [{
item_id: String
item_qty: integer
},]

*/
