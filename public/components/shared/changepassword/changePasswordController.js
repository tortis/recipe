var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.controller('changePasswordController', [
    '$scope',
    '$http',
    '$modalInstance',
    function($scope, $http, $modalInstance) {
        $scope.pw = {};
        $scope.changepw = function() {
            $scope.error = null;
            if (!$scope.pw.newpassword) {
                $scope.error = "Please provide a new password";
                return;
            }
            if ($scope.pw.newpassword != $scope.pw.newpasswordConfirm) {
                $scope.error = "The passwords do not match";
                return;
            }

            $http.post('/api/changepassword', {newpassword: $scope.pw.newpassword})
            .then(function(response) {
                $scope.success = true;
            })
            .catch(function(error) {
                $scope.error = "Oops, server error.";
            });
        };

        $scope.close = function() {
            $modalInstance.close();
        };
    }
]);
