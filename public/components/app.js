var RecipeApp = angular.module('RecipeApp', ['ngRoute', 'RecipeControllers']);

RecipeApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/components/dash/dashView.html',
            controller: 'DashCtrl',
            reloadOnSearch: false,
        })
        .otherwise({
            templateUrl: '/components/errors/notFoundView.html'
        });
    }
]);

RecipeApp.run(['$rootScope', 'recipeListMgr',
    function($rootScope, RLM) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            RLM.load();
        });
    }
]);

var RecipeControllers = angular.module('RecipeControllers', ['ui.bootstrap', 'ngResource']);

RecipeControllers.controller('mainCtrl', [
    '$scope',
    '$location',
    '$modal',
    'recipeListMgr',
    function($scope, $location, $modal, RLM) {
        document.getElementById('search').focus();
        $scope.openNewRecipe = function() {
            $modal.open({
                templateUrl: '/components/shared/new_recipe/newRecipeView.html',
                controller: 'newRecipeCtrl',
                animation: true,
                size: 'lg'
            })
            .result.then(function() {});
        };

        $scope.search = function(q) {
            $location.search('q', q);
            $location.search('page', null);
        };

        $scope.clear = function() {
            $scope.q = '';
            $location.search('q', null);
        }
    }
]);

RecipeControllers.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})
