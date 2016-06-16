angular.module('RecipeControllers').controller('dashCtrl', [
    '$scope',
    '$location',
    '$modal',
    '$http',
    '$q',
    'Recipe',
    function($scope, $location, $modal, $http, $q, Recipe) {
        $http.get('/api/dash').then(function(resp) {
            $scope.favorites = resp.data.favorites;
            $scope.newest = resp.data.newest;
        }).catch(function(err) {
            console.log(err);   
        });

        // TMP measure to show icons
        $scope.imgs = ['asian', 'bread', 'dessert', 'meat', 'salad', 'seafood', 'soup', 'vegetables'];

        $scope.openRecipe = function(r) {
            $modal.open({
                templateUrl: '/components/detail/detailView.html',
                controller: 'detailCtrl',
                animation: true,
                scope: $scope,
                size: 'lg',
                resolve: {
                    r: function() {
                        var deferred = $q.defer();
                        Recipe.get({}, r, function(recipe) {
                            for (var i = 0; i < recipe.instructions.length; i++) {
                                recipe.instructions[i].contentPieces = recipe.instructions[i].content.split('\n');
                            }
                            deferred.resolve(recipe);
                        });
                        return deferred.promise;
                    }
                }
            })
            .result.then(function() {});
        };

        var s = $location.search();
        if (s.r) {
            $scope.openRecipe({linkName: s.r});
        }
    }
]);
