var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('detailCtrl', ['$scope', '$location', '$modalInstance', 'Recipe', 'r',
    function($scope, $location, $modalInstance, Recipe, r) {
        // Use the list data until the full recipe is loaded
        // $scope.recipe = r;
        $scope.deleteConfirm = false;
        $scope.editing = false;
        $scope.recipe = r;

        $scope.startEditing = function() {
            $scope.editing = true;
        };

        $scope.stopEditing = function() {
            $scope.editing = false;
        };

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

        $scope.save = function() {
            console.log('Recipe after copy: %O', $scope.recipe);
            Recipe.save($scope.recipe.mod, function(r) {
                $scope.recipe = $scope.recipe.mod;
                for (var i = 0; i < $scope.recipe.instructions.length; i++) {
                    $scope.recipe.instructions[i].contentPieces = $scope.recipe.instructions[i].content.split('\n');
                }
                $scope.editing = false;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.cancel = $modalInstance.close;
    }
]);
