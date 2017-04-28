'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'home',
  'navbar',
  'search',
  'angularGrid'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);
