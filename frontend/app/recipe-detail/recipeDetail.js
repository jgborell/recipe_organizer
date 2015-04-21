'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe-detail/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', '$routeParams', '$location', 'Restangular', function ($scope, $routeParams, $location, Restangular) {
        $scope.recipeId = $routeParams.recipeId;

        $scope.editing = false;

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (recipe) {
            $scope.recipe = recipe;
        });
        $scope.deleteRecipe = function () {
            var confirmation = confirm("Are you sure you want to delete this recipe? This cannot be undone.");
            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                    alert("Your recipe was successfully deleted!");
                    $location.path('/recipes');
                },
                function() {
                    alert("There was a problem deleting the recipe! ¯\_(ツ)_/¯")
                });
            }
        };

        $scope.addIngredientToRecipe = function(ingredientName) {
            if (ingredientName != null) {
                var ingredient = {name: ingredientName};
                $scope.recipe.ingredients.push(ingredient);
                $scope.ingredientName = null;
            }
        };

        $scope.removeIngredientFromRecipe = function(ingredient) {
            var index = $scope.recipe.ingredients.indexOf(ingredient);
            if (index != -1) {
                $scope.recipe.ingredients.splice(index, 1);
            }
        };

        $scope.saveEditedRecipe = function () {
          $scope.recipe.photo = null;
          Restangular.one('recipes', $scope.recipeId).customPUT($scope.recipe).then(function () {
              alert("Your recipe was successfully edited!");
              $scope.editing = false;
          }, function() {
              alert("Something went wrong updating the recipe...  ¯\_(ツ)_/¯")
          });
        };
    }]);