'use strict';

describe('myApp.recipes module', function() {

    beforeEach(module('myApp.recipes'));

    describe('RecipesCtrl controller', function () {
        var $scope, ctrl, Restangular;

        beforeEach(inject(function ($controller, $rootScope, _Restangular_) {
            $scope = $rootScope.$new();
            Restangular = _Restangular_;
            ctrl = $controller('RecipesCtrl', {$scope: $scope, Restangular: Restangular});
        }));

        it('RecipesCtrl should be defined', function(){
            expect(ctrl).toBeDefined()
        })
    });
});