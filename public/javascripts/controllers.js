var cart = [];

app.controller('HomeController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
  $http.get('/teas.json').then(function (results) {
    $scope.teas = results.data;
    $scope.categories = results.data.reduce(function (prev, curr) {
      return prev.concat(curr.categories);
    }, []).filter(function(category, i, arr) {
      return arr.indexOf(category) == i;
    })
  }, function (err) {
    console.log(err);
  })
  $scope.cart = cart;
  $scope.goToCart = function () {
    $location.path('/cart');
  }
  $scope.addToCart = function () {
    var item = {};
    item = this.tea;
    item.quantity = this.quantity ? this.quantity : 1;
    cart.push(item);
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
