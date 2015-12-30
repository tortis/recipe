angular.module('RecipeControllers').controller('dashCtrl', [
    '$scope',
    '$location',
    '$modal',
    '$http',
    function($scope, $location, $modal, $http) {
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
                size: 'lg',
                resolve: {
                    r: function() { return r; }
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
