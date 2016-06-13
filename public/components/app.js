var RecipeApp = angular.module('RecipeApp', [
    'ui.bootstrap',
    'ngRoute',
    'RecipeControllers',
    'recipe.edit',
    'recipe.tags'
]);

RecipeApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/components/dash/dashView.html',
            controller:  'dashCtrl'
        })
        .when('/search', {
            templateUrl: '/components/search/searchView.html',
            controller: 'searchCtrl',
            reloadOnSearch: false,
        })
        .when('/print/:id', {
            templateUrl: '/components/print/printView.html',
            controller: 'printCtrl'
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
    '$http',
    '$modal',
    'recipeListMgr',
    function($scope, $location, $http, $modal, RLM) {
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
            $location.path('/search');
            $location.search('q', q);
            $location.search('page', null);
        };

        $scope.clear = function() {
            $scope.q = '';
            $location.search('q', null);
            $location.search('page', null);
        }

        $scope.getNames = function(pre) {
            return $http.get('/api/recipes/typeahead/'+pre).then(function(resp) {
                return resp.data.map(function(v) {return v.name});
            });
        };
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
