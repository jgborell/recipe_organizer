'use strict';

angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/auth', {
        templateUrl: 'auth/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/register', {
        templateUrl: 'auth/registration.html',
        controller: 'RegisterCtrl'
      });
}])

.controller('RegisterCtrl', [ 'Restangular', '$scope', 'user', '$location', function(Restangular, $scope, user, $location) {
    $scope.user_info = {};
    $scope.register = function() {
        user.registration($scope.user_info).then(function (){
            $location.path('/recipes')
        }, function() {
               alert("There was a problem. Please try again")
        })
    };
}])

.controller('AuthCtrl', [ 'Restangular', '$scope', 'user', '$location', function(Restangular, $scope, user, $location) {
    $scope.credentials = {
        username: "",
        password: ""
    };
    $scope.login = function() {
        user.login($scope.credentials).then(function (){
            $location.path('/recipes')
        }, function() {
               alert("There was a problem. Please try again")
        })
    };
}]);