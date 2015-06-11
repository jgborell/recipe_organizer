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
    'myApp.user'
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {

        $routeProvider.otherwise({redirectTo: '/recipes'});
        RestangularProvider.setBaseUrl('/api');
        $routeProvider.otherwise({redirectTo: '/auth'});
        RestangularProvider.setRequestSuffix('/');

    }])
    .controller('AppCtrl', function ($scope, user, $location, Restangular) {
        if (sessionStorage.getItem(user.token_name)) {
            var token = sessionStorage.getItem(user.token_name);
            Restangular.setDefaultHeaders({Authorization: 'Token ' + token});
            user.getInfo().then(function () {
                $location.path('/recipes');
            });
        }

        if (user.info.id == '') {
            $location.path('/auth');
        }

        $scope.logout = function () {
            user.logout();
            $scope.user = null;
            $location.path('/auth');
        };

        $scope.$on("user-updated", function () {
            $scope.user = user.info;
        });

        //Locks down all routes. This would require you to log in.
        $scope.$on('$routeChangeStart', function () {
            if ((user.info != null && user.info.id == undefined) || user.info == null) {
                $location.path('/auth');
            }
        });


    });

