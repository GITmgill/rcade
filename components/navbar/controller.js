'use strict';

angular.module('navbar', [])
	.controller("NavbarController", [ "$scope", function($scope) {
		$scope.logo = "r.cade";
	}])
	.directive('navbar', function() {
		return {
			retrict: 'E',
			templateUrl: 'components/navbar/index.html',
			controller: 'NavbarController'
		};
	});
