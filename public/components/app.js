var RecipeApp = angular.module('RecipeApp', [
    'ui.bootstrap',
    'ngRoute',
    'RecipeControllers',
    'recipe.edit',
    'recipe.tags'
]);

RecipeApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
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

        $httpProvider.interceptors.push('TokenInterceptor');
    }
]);

RecipeApp.run(['$rootScope', 'recipeListMgr',
    function($rootScope, RLM) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            RLM.load();
        });
    }
]);

RecipeApp.factory('TokenInterceptor', ['$window', function($window) {
    return {
        request: function(config) {
            var token = $window.localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    };
}]);

var RecipeControllers = angular.module('RecipeControllers', ['ui.bootstrap', 'ngResource']);

RecipeControllers.controller('mainCtrl', [
    '$scope',
    '$window',
    '$location',
    '$http',
    '$modal',
    'recipeListMgr',
    function($scope, $window, $location, $http, $modal, RLM) {
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

        var loadAuthentication = function() {
            var token = $window.localStorage.getItem('token');
            if (!token) return;
            var pieces = token.split('.');
            var tokenBody = JSON.parse(atob(pieces[1]));
            var exp = tokenBody.exp;
            if ((Date.now() / 1000) < exp) {
                $scope.authenticated = true;
            }
        };
        loadAuthentication();

        $scope.authenticate = function() {
            $modal.open({
                templateUrl: '/components/shared/authenticate/authenticate-view.html',
                controller: 'authenticateController',
                animation: true,
                size: 'sm'
            })
            .result.then(function(success) {
                if (success) {
                    $scope.authenticated = true;
                }
            });
        };

        $scope.openChangePassword = function() {
            $modal.open({
                templateUrl: '/components/shared/changepassword/change-password-view.html',
                controller: 'changePasswordController',
                animation: true,
                size: 'sm'
            }).result.then(function() {});
        };

        $scope.signout = function() {
            $scope.authenticated = false;
            $window.localStorage.removeItem('token');
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
