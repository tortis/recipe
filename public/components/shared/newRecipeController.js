var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('newRecipeCtrl', ['$scope', '$modalInstance', 'Recipe',
    function($scope, $modalInstance, Recipe) {
        $scope.nr = { 
            tags: [],
            sections: [{ingredients: [], instructions: ''}]
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
            $scope.nr.tags.push(tag);
            $scope.curTag = '';
		};

        $scope.addSection = function() {
            $scope.nr.sections.push({name:'Section '+$scope.nr.sections.length+1,ingredients: [], instructions: ''});
        };

        $scope.addIngredient = function(sectionIndex, ni) {
            $scope.nr.sections[sectionIndex].ingredients.push(ni);
            $scope.ni = {};
			document.getElementById('ing-name').focus();
        };

        $scope.save = function() {
            console.log('saving new recipe: %O', $scope.nr);
            $modalInstance.close();
        };

        $scope.cancel = $modalInstance.close;
    }
]);
