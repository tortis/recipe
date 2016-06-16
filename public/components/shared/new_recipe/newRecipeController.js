var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('newRecipeCtrl', ['$scope', '$http', '$modalInstance', 'Recipe',
    function($scope, $http, $modalInstance, Recipe) {
        $scope.save = function(recipe) {
            $scope.errors = {};
            var valid = true;
            if (recipe.name == "") {
                $scope.errors.name = "You must provide a name";
                valid = false;
            }
            if (recipe.author == "") {
                $scope.errors.author = "You must provide an author";
                valid = false;
            }
            if (recipe.category == "") {
                $scope.errors.category = "You must provide a category";
                valid = false;
            }
            if (!valid) return;

            $http.post('/api/recipes', recipe)
            .then(function(result) {
                $scope.done = true;
                $scope.newRecipeName = recipe.name;
            })
            .catch(function(error) {
                alert("There was a problem saving the recipe.");
            });
        };
        $scope.cancel = $modalInstance.close;
    }
]);
