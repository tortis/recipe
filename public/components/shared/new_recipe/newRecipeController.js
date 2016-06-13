var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('newRecipeCtrl', ['$scope', '$http', '$modalInstance', 'Recipe',
    function($scope, $http, $modalInstance, Recipe) {
        $scope.save = function(recipe) {
            $http.post('/api/recipes', recipe)
            .then(function(result) {
                $scope.done = true;
                $scope.newRecipeName = recipe.name;
                $scope.error = undefined;
            })
            .catch(function(error) {
                $scope.error = "There was a problem saving the recipe.";
                console.log(err);    
            });
        };

        $scope.cancel = $modalInstance.close;
    }
]);
