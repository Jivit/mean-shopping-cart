app.controller('HomeController', ['$scope', '$location', '$http', '$cookies', function ($scope, $location, $http, $cookies) {
  $http.get('/teas').then(function (results) {
    $scope.teas = results.data;
    $scope.categories = results.data.reduce(function (prev, curr) {
      return prev.concat(curr.categories);
    }, []).filter(function(category, i, arr) {
      return arr.indexOf(category) == i;
    })
  }, function (err) {
    console.log(err);
  });
  if($cookies.get('cart_id')){
    $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
      $scope.cart = cart.data;
    })
  } else {
    $scope.cart = {items: []}
  }
  $scope.goToCart = function () {
    $location.path('/cart');
  }
  $scope.addToCart = function () {
    var item = {};
    item.item_id = this.tea._id;
    item.quantity = this.quantity ? this.quantity : 1;
    if($cookies.get('cart_id')) {
      //use existing cart if it exists
      $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
        cart.data.items.push(item);
        return cart.data;
      }).then(function (cart) {
        return $http.post('/carts/'+cart._id, {cart});
      }).then(function (cart) {
        $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
          $scope.cart = cart.data;
        })
      });
    } else {
      //create cart for user and save id in cookie
      $http.post('/carts', {item}).then(function (cart) {
        $cookies.put('cart_id', cart.data._id);
        $scope.cart = cart.data;
      })
    }
  }
}]);

app.controller('CartController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
  $scope.qtyForm = false;
  $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
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
      return [cart, total]
    })
  }, function (err) {
    $scope.cart = {};
  }).then(function (cartData) {
    $scope.cart = cartData[0]
    $scope.total = cartData[1]
  })
  $scope.showEdit = false;
  $scope.removeItem = function () {
    $scope.total = $scope.total - (this.item.quantity * this.item.info.price * .01);
    $scope.cart.splice($scope.cart.indexOf(this.item), 1);
    var updatedCart = $scope.cart.map(function (e) {
      return {item_id: e.item_id, quantity: Number(e.quantity)};
    });
    $http.post('/carts/' + $cookies.get("cart_id") + '/removeitem', {updatedCart})
  }
  $scope.editQty = function () {
    this.qtyForm = !this.qtyForm;
  }
  $scope.updateQty = function () {

  }
}]);
