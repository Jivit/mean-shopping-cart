var app = angular.module("shoppingCart", ['ngRoute', 'ngAnimate', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/partials/home.html',
      controller: 'HomeController'
    })
    .when('/cart', {
      templateUrl: '/views/partials/cart.html',
      controller: 'CartController'
    })
    .otherwise({redirectTo: '/'});
}]);
