angular.module('RecipeControllers').controller('DashCtrl', [
    '$scope',
    '$location',
    '$modal',
    'recipeListMgr',
    function($scope, $location, $modal, RLM) {
        RLM.addListener(function() {
            $scope.recipes = RLM.list;
            $scope.stats = RLM.stats;
            var s = $location.search();
            if (!$scope.limit) $scope.limit = 50;
            if (s.q) {
                $scope.q = s.q; 
            } else {
                $scope.q = '';
            }
        });
        RLM.load();

        $scope.imgs = ['asian', 'bread', 'dessert', 'meat', 'salad', 'seafood', 'soup', 'vegetables'];

        $scope.pageChanged = function() {
            $location.search('page', $scope.stats.page);
        }

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
