app.factory('ShoppingCart', function () {
  var ShoppingCart = {};
  var ShoppingCart.shoppingCart = [];

  ShoppingCart.newCart = function () {
    //TODO create cookie here?
  }

  ShoppingCart.addItem = function(obj) {
    ShoppingCart.shoppingCart.push(obj);
  };

  ShoppingCart.editItem = function(name) {
    // TODO
  };

  ShoppingCart.removeItem = function(index) {
    // TODO
  };

  return ShoppingCart;
})

app.factory('')
