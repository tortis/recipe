var RecipeApp = angular.module('RecipeApp', ['ngRoute', 'RecipeControllers']);

RecipeApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/components/dash/dashView.html',
            controller: 'DashCtrl'
        })
        .otherwise({
            templateUrl: '/components/errors/notFoundView.html'
        });
    }
]);

var RecipeControllers = angular.module('RecipeControllers', ['ui.bootstrap', 'ngResource']);

RecipeControllers.controller('mainCtrl', ['$scope', '$modal',
    function($scope, $modal) {
        $scope.openNewRecipe = function() {
            $modal.open({
                templateUrl: '/components/shared/newRecipeView.html',
                controller: 'newRecipeCtrl',
                animation: true
            })
            .result.then(function() {});
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
