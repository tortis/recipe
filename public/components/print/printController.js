var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('printCtrl', ['$scope', '$http', '$routeParams', 'Recipe',
    function($scope, $http, $routeParams, Recipe) {
        Recipe.get({id: $routeParams.id}, function(r) {
            for (var i = 0; i < r.instructions.length; i++) {
                r.instructions[i].contentPieces = r.instructions[i].content.split('\n');
            }
            $scope.recipe = r;
            setTimeout(window.print, 200);
            $http.get('/api/recipes/'+$routeParams.id+'/print')
            .then(function(r) {})
            .catch(function(err) {
                console.log(err.data);
            });
        }, function(err) {
            console.log(err);
        });
    }
]);
