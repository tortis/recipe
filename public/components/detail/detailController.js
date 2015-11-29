var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('detailCtrl', ['$scope', '$modalInstance', 'Recipe', 'r',
    function($scope, $modalInstance, Recipe, r) {
        // Use the list data until the full recipe is loaded
        $scope.recipe = r;

        Recipe.get({}, r, function(recipe) {
            $scope.recipe = recipe;
        }, function(err) {
            console.log(err);    
        });

        $scope.cancel = $modalInstance.close;
    }
]);
