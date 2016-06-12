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
            $scope.patch = angular.copy(recipe);
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

		$scope.addTag = function(tag) {
            if ($scope.curTag == '') return;
            $scope.patch.tags.push(tag);
            $scope.curTag = '';
		};

        $scope.save = function() {
            console.log('Recipe: %O', $scope.recipe);
            console.log('Patch: %O', $scope.patch);
            $scope.recipe = $scope.patch;
            $scope.patch = angular.copy($scope.recipe);
            console.log('Recipe after copy: %O', $scope.recipe);
            Recipe.save($scope.patch, function(r) {
                console.log('test');
                $scope.editing = false;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.cancel = $modalInstance.close;
    }
]);
