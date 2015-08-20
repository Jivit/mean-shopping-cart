var cart = [];

app.controller('HomeController', ['$scope', '$location', '$http', '$cookies' function ($scope, $location, $http, $cookies) {
  $http.get('/teas.json').then(function (results) {
    $scope.teas = results.data;
    $scope.categories = results.data.reduce(function (prev, curr) {
      return prev.concat(curr.categories);
    }, []).filter(function(category, i, arr) {
      return arr.indexOf(category) == i;
    })
  }, function (err) {
    console.log(err);
  });
  $scope.cart = cart;
  $scope.goToCart = function () {
    $location.path('/cart');
  }
  $scope.addToCart = function () {
    if($cookies.get('cart_id')) {
      //use existing cart if it exists
      var userCart = $cookies.get('cart_id')
      $http.get('/carts/'+userCart).then(function (cart) {
        var item = {};
        item = this.tea;
        item.quantity = this.quantity ? this.quantity : 1;
        cart.items.push(item);
        return cart;
      }).then(function (cart) {
        $http.post('/carts/'+cart._id, {cart});
      });
    } else {
      //create new cart
      $http.post('/carts', {cart}).then(function () {
        
      })
    }
  }
}]);

app.controller('CartController', ['$scope', function ($scope) {
  $scope.cart = cart;
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
