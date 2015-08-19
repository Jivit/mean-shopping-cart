var app = angular.module("shoppingCart", ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeController'
    })
    .when('/cart', {
      templateUrl: 'partials/cart',
      controller: 'CartController'
    })
    .otherwise({redirectTo: '/'});
}]);
