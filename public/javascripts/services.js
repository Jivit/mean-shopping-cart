app.factory('ShoppingCart', ['$http', '$cookies', function ($http, $cookies) {
  var ShoppingCart = {};

  ShoppingCart.getCart = function (cookie) {
    return $http.get('/carts/' + cookie).then(function (cart) {
      return cart.data;
    });
  }

  ShoppingCart.addItem = function (item, cookie) {
    return $http.get('/carts/' + cookie).then(function (cart) {
      var tmp = true;
      cart.data.items.forEach(function (e) {
        if (e.item_id === item.item_id) {
          e.quantity += Number(item.quantity);
          tmp = false;
        }
      })
      if (tmp === true){
        cart.data.items.push(item);
      }
      return cart.data;
    }).then(function (cart) {
      return $http.post('/carts/'+cart._id, {cart});
    }).then(function (cart) {
      return $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
        return cart.data;
      })
    });
  }

  ShoppingCart.removeItem = function (cart, cookie) {
    cart.splice(cart.indexOf(this.item), 1);
    var updatedCart = cart.map(function (e) {
      return {item_id: e.item_id, quantity: Number(e.quantity)};
    });
    return $http.post('/carts/' + cookie + '/updateitem', {updatedCart})
  }

  ShoppingCart.changeQty = function (cart, cookie) {
    var updatedCart = cart.map(function (e) {
      return {item_id: e.item_id, quantity: Number(e.quantity)};
    });
    return $http.post('/carts/' + cookie + '/updateitem', {updatedCart})
  }

  ShoppingCart.createCart = function (item) {
    return $http.post('/carts', {item}).then(function (cart) {
      $cookies.put('cart_id', cart.data._id);
      return cart.data;
    })
  }

  ShoppingCart.showCart = function (cookie) {
    return $http.get('/carts/' + cookie).then(function (cart) {
      return Promise.all(cart.data.items.map(function (item) {
        return $http.get('/teas/' + item.item_id);
      })).then(function (items) {
        items = items.map(function (item) {
          for (var i = 0; i < cart.data.items.length; i++) {
            if (cart.data.items[i].item_id === item.data._id){
              cart.data.items[i].info = item.data;
              return cart.data.items[i];
            }
          }
        })
        cart = items;
        total = items.reduce(function (prev, curr) {
          return ((curr.info.price * 0.01) * curr.quantity) + prev;
        }, 0);
        return [cart, total];
      })
    }, function (err) {
      return {};
    }).then(function (cartData) {
      return cartData;
    })
  }

  return ShoppingCart;
}]);

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
