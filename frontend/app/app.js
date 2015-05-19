'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.recipes',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.version',
    'restangular',
    'myApp.auth',
    'myApp.User'
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/auth'});
        RestangularProvider.setBaseUrl('http://localhost:8001');
        RestangularProvider.setRequestSuffix('/');

    }]);
