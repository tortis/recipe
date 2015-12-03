var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('detailCtrl', ['$scope', '$location', '$modalInstance', 'Recipe', 'r',
    function($scope, $location, $modalInstance, Recipe, r) {
        // Use the list data until the full recipe is loaded
        $scope.recipe = r;
        $scope.deleteConfirm = false;
        $scope.editing = false;

        Recipe.get({}, r, function(recipe) {
            for (var i = 0; i < recipe.instructions.length; i++) {
                recipe.instructions[i].contentPieces = recipe.instructions[i].content.split('\n');
            }
            $scope.recipe = recipe;
        }, function(err) {
            console.log(err);    
        });

        $scope.delete = function() {
            $scope.deletedRName = $scope.recipe.name;
            if ($scope.deleteConfirm) {
                $scope.recipe.$delete(function() {
                    $scope.deleted = true;
                }, function(err) {
                    console.log(err);
                });
            } else {
                $scope.deleteConfirm = true;
            }
        };

        $scope.print = function() {
            $scope.cancel();
            $location.path('/print/'+r.linkName);
        };

        $scope.cancel = $modalInstance.close;
    }
]);
