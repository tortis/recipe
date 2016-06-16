var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('authenticateController', [
    '$scope',
    '$window',
    '$http',
    '$modalInstance',
    function($scope, $window, $http, $modalInstance) {
        $scope.login = function() {
            $http.post('/api/authenticate', {password: $scope.password})
            .then(function(response) {
                var token = response.data.token;
                $window.localStorage.setItem('token', token);
                $modalInstance.close(true);
            })
            .catch(function(error) {
                if (error.status >= 400 && error.status < 500) {
                    $scope.error = "Incorrect password";
                } else {
                    $scope.error = "Oops, server error.";
                }
            });
        };

        $scope.close = function() {
            $modalInstance.close(false);
        };
    }
]);
