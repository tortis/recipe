var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.factory('Recipe', ['$resource',
    function($resource) {
        var Recipe = $resource('/api/recipes/:id', {
            id: '@_id'
        }, {
            print: {
                method: 'GET',
                url: '/api/recipes/:id/print'
            },
            meta: {
                method: 'GET',
                url: '/api/recipes/meta'
            }
        });

        return Recipe;
    }
]);
