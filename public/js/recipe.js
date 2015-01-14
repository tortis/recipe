var recipeApp = angular.module("recipeApp", ['ui.bootstrap']);

recipeApp.controller("recipeCtrl", function($scope) {
	$scope.recipeList = [{id: 1, name:"Chocolate Chip Cake"}, {id: 2, name:"Legs"}, {id: 3, name:"Peanutbutter Balls"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}, {id: 2, name:"Legs"}];
	$scope.open = null;
	$scope.openTop = false;
	$scope.active = null;

	$scope.toggleOpen = function(r, t) {
		r.active = true;
		if ($scope.active && $scope.active != r) {
			$scope.active.active = false;
		}
		$scope.active = r;
		if (r.open) {
			r.open = false;
			$scope.open = null;
			$scope.openTop = false;
		} else {
			r.open = true;

			if ($scope.open) {
				$scope.open.open = false;
			}
			$scope.open = r;
			if (!t) {
				$scope.openTop = true;
			}
		}
	};

	$scope.toggleActive = function(r) {
		if (r.active) {
			r.active = false;
			$scope.active = null;
		} else {
			console.log("Setting " + r.name + " to active");
			r.active = true;
			if ($scope.active) {
				$scope.active.active = false;
			}
			$scope.active = r;
		}
	};
});
