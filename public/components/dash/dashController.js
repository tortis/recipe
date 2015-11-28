angular.module('RecipeControllers').controller('DashCtrl', ['$scope', 'Recipe',
    function($scope, Recipe) {
        $scope.recipes = Recipe.query(function() {
        });
    }
]);
