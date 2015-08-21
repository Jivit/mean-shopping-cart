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

app.controller('CartController', ['$scope', function ($scope) {
  $http.get('/carts/' + $cookies.get('cart_id')).then(function (cart) {
    $scope.cart = cart.data;
  })
  $scope.showEdit = false;
  $scope.total = cart.reduce(function (prev, curr) {
    return ((curr.price * 0.01) * curr.quantity) + prev;
  }, 0);
  $scope.removeItem = function () {
    cart.splice(cart.indexOf(this.item), 1);
  }
  $scope.editQty = function () {
    console.log('you should probably write some code here...');
  }
}]);
