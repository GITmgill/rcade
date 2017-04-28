'use strict';

angular.module('search', [])
	.controller("redditSearch", [ "$scope", "$http", '$rSearch', function($scope, $http, $rSearch) {

		$scope.search = "all";
		$scope.after;
		$scope.before;
		$scope.loadMore = loadMore;
		$scope.nsfwFilter = "false";

		init();

		$scope.fetch = function() {
            resetView()
            var path = '/r/' + $scope.search;
            getPosts(path);
        }

		function getPosts(path, query) {
			query = query || {};
			var req = $rSearch.getPosts(path, query);
			
			req.then(function successCallback(response) {
				$scope.posts = response.data;
				$scope.after = $scope.posts.data.after;
				$scope.before = $scope.posts.data.before;
			}, function errorCallback(response) {
				console.log(response.status);
			});
			return req;
		}
		function init() {
			$scope.posts = null;
			getPosts('/')
		}
		function loadMore(type) {
            var path = '/r/' + $scope.search;
            var query = {count: 100};
            resetView();
            if (type === 'before') {
                query.before = $scope.before;
            } else {
                query.after = $scope.after;
            }
            getPosts(path, query);
        }

		function resetView() {
			$scope.posts = null;
			$("html, body").animate({ scrollTop: 0 }, "2000");
		}

	}])
	.service('$rSearch', ['$http', function($http) {
		var baseUrl = 'https://www.reddit.com';
		var defaultQuery = {
			raw_json: 1,
			limit: 100
		};

		// service interface
		var service = {
			getPosts: getPosts,
			buildUrl: buildUrl
		};
		
		return service;

		function buildUrl(path, query) {
			var prop;
			var queryString = '.json?';

			// loop through query object and build the querystring
			for (prop in query) {
				queryString += '&' + prop + '=' + query[prop];
			}

			// combine parts to build request URL
			return baseUrl + path + '/' + queryString;

		}

		function getPosts(path, query) {
			// if we don't have a query set it to an empty object
			query = query || {};

			// combine the default query with the user query
			query = angular.extend({}, defaultQuery, query);

			// get the request url
			var url = buildUrl(path, query);
			console.log(url);
			// return the request promise
			return $http({
				method: 'GET',
				url: url
			});
		}
	}])
	.directive('sumSearch', function() {
		return {
			retrict: 'E',
			templateUrl: 'components/search/index.html',
			controller: 'redditSearch'
		};
	});
	