'use strict';

angular.module('myApp.user', [])

    .service('user', function (Restangular, $q, $location, $rootScope) {
        var user = {};
        user.info = {
            id: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            recipes: ''
        };


        user.registration = function (user_info) {
            var deferred = $q.defer();

            Restangular.one(user.urls.register_user).customPOST(user_info).then(function (data) {
                var credentials = {
                    username: user_info.username,
                    password: user_info.password
                };

                user.login(credentials).then(function() {
                    deferred.resolve();
                });
            }, function (error) {
                deferred.reject(error)
            });

            return deferred.promise;
        };


         user.getInfo = function () {
            var deferred = $q.defer();

            Restangular.one(user.urls.get_user_info).customGET().then(function (data) {
                user.info = data;
                $rootScope.$broadcast("user-updated");
                deferred.resolve();
            }, function (error) {
                deferred.reject(error)
            });

            return deferred.promise;
        };

         user.login = function (credentials) {
            var deferred = $q.defer();

            Restangular.one(user.urls.get_token).customPOST(credentials).then(function (data) {
                sessionStorage.setItem(user.token_name, data.token);
                Restangular.setDefaultHeaders({Authorization: 'Token ' + data.token});
                user.getInfo().then(function () {
                    deferred.resolve();
                });
            }, function (error) {

                deferred.reject(error)
            });

            return deferred.promise
        };

        user.logout = function () {
            user.info = {
                id: '',
                name: ''
            };
            sessionStorage.removeItem(user.token_name);
            Restangular.setDefaultHeaders({Authorization: ''});
            $location.path('/login');
        };
        //USER CONSTANTS
        user.token_name = 'auth-token';
        user.urls = {
            get_token: 'api-token-auth/',
            get_user_info: 'get-user-info/',
            register_user: 'register-user/'
        };

        return user
    });






