// app.factory('ShoppingCart', function () {
//   var ShoppingCart = {};
//   var ShoppingCart.shoppingCart = [];
//
//   ShoppingCart.getCart = function () {
//     $http.get('/carts/'+userCart);
//   }
//   ShoppingCart.newCart = function () {
//     //TODO create cookie here?
//   }
//
//   ShoppingCart.addItem = function(obj) {
//     ShoppingCart.shoppingCart.push(obj);
//   };
//
//   ShoppingCart.editItem = function(name) {
//     // TODO
//   };
//
//   ShoppingCart.removeItem = function(index) {
//     // TODO
//   };
//
//   return ShoppingCart;
// })

app.factory('TeasHelper', ['$http', function ($http) {
  var Teas = {};

  Teas.getTeas = function () {
    return $http.get('/teas').then(function (results) {
      teas = results.data;
      categories = results.data.reduce(function (prev, curr) {
        return prev.concat(curr.categories);
      }, []).filter(function(category, i, arr) {
        return arr.indexOf(category) == i;
      })
      return [teas, categories];
    }, function (err) {
      return err;
    });
  }

  return Teas;
}]);
