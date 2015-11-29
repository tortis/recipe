var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('newRecipeCtrl', ['$scope', '$modalInstance', 'Recipe',
    function($scope, $modalInstance, Recipe) {
        $scope.nr = { 
            tags: [],
            ingredients: [{list: []}],
            instructions: [{content: ''}]
        };

        $scope.ni = {};

        // Load metadata
        $scope.meta = Recipe.meta(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('meta: %O', $scope.meta);
            }
        });

		$scope.addTag = function(tag) {
            if ($scope.curTag == '') return;
            $scope.nr.tags.push(tag);
            $scope.curTag = '';
		};

        $scope.addSection = function() {
            // TODO
        };

        $scope.addIngredient = function(ingIndex, ni) {
            if (ni.name == null || ni.qty == null || ni.unit == null) {
                //TODO: Show an error message to the user
                return;
            }
            $scope.nr.ingredients[ingIndex].list.push(ni);
            $scope.ni = {};
			document.getElementById('ing-qty').focus();
        };

        $scope.save = function() {
            console.log('saving new recipe: %O', $scope.nr);
            var r = new Recipe($scope.nr);
            r.$save(function() {
                $scope.done = true;
                $scope.error = undefined;
            }, function(err) {
                // TODO: Handle this error message
                $scope.error = "There was a problem saving the recipe.";
                console.log(err);    
            });
        };

        $scope.cancel = $modalInstance.close;
    }
]);
