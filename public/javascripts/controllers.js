
angular.module('opsjitsu',[]).
    factory('Snippets', function() {
    	return {
    		list: function($http) {
    			console.log("/list");
    			return $http.get('/list');
    		},
    		create: function($http, snippet) {
    			console.log("/create " + snippet.body);
    			return $http.post("/create", snippet);
    		},
    		delete: function($http, snippet) {
    			console.log("/delete " + snippet._id);
    			return $http.get("/delete/" + snippet._id, snippet);
    		}
    	}
    }).
    config(function($routeProvider) {
    	$routeProvider.
    		when('/', {controller:SnippetListCtrl, templateUrl:'/partials/list'}).
    		when('/new', {controller:SnippetCreateCtrl, templateUrl:'/partials/create'}).
	      	otherwise({redirectTo:'/'});
    }).
	directive('snippetBodyHighlighter', function () {
	    return {
	      restrict: 'A',
	      template: '<pre><code ng-bind-html-unsafe="snippetBody"></code></pre>',
	      scope: {
	        snippetBody: '='
	      },
	      link: function (scope, elem, attrs) {
	      	scope.snippetBody = hljs.highlightAuto(scope.snippetBody).value;
	      }
	  }
	})
     
function SnippetListCtrl($scope, $http, Snippets) {
	Snippets.list($http).success(function (data){
		console.log("ctrl init list");
		$scope.snippets = data;
	}).then(function(){
		$scope.list = function(){
			console.log("list");
			Snippets.list($http).success(function (data){
				console.log("list success");
				$scope.snippets = data;
			});	
		};

		$scope.create = function(){
			console.log("create");
			Snippets.create($http, $scope.snippet).
				success(function(data){
					console.log("create success");
					$scope.list();
				});
		};

		$scope.delete = function(){
			console.log("delete " + this.snippet._id);
			Snippets.delete($http, this.snippet).
				success(function(data){
					console.log("delete success");
					$scope.list();
				});
		}
	});
}

function SnippetCreateCtrl($scope, $http, Snippets) {
	
};


// var opsjitsu = angular.module('opsjitsu', []);

// opsjitsu.
// 	controller("SnippetListCtrl", function($scope, $http) {
// 		$http.get('/list').success(function(data) {
// 			console.log("list success " + data.length);
// 			$scope.snippets = data;
// 		});

// 		$scope.delete = function(snippet){
// 			snippet.snippetBody = "foo";
// 			console.log('delete '+ snippet._id);
// 		};

// 	}).
// 	directive('snippetButton', function($q, $http, $templateCache) {
// 		return {
// 			restrict: 'A',
// 			template: 	'<button type="button" class="btn btn-default btn-md" ng-click="delete()">'+
// 							'<span class="glyphicon {{glyphiconValue}}"></span>'+
// 						'</button>',	
// 			scope: {
// 				snippetId: '=',
// 				glyphiconValue: '@',
// 				click: '@'
// 			},
// 			controller: function ($scope, $http) {
// 				$scope.snippetDelete = function(snippetId){
// 					console.log('/delete/'+snippetId);
// 					return $http.get('/delete/'+ snippetId).then(function(data) {
// 						console.log("delete success");
// 						$("#"+snippetId+"_post").fadeOut();
// 					});
// 				};
// 			},
// 			link: function (scope, elem, attrs) {
// 				console.log(attrs.glyphiconValue);

// 				scope.delete = function(){
// 					console.log('delete '+ scope.snippetId);
// 					scope.snippetDelete(scope.snippetId).then(scope.snippetList);
// 				}
// 			}
// 		}
// 	}).
// 	directive('snippetBodyHighlighter', function () {
// 	    return {
// 	      restrict: 'A',
// 	      template: '<pre><code ng-bind-html-unsafe="snippetBody"></code></pre>',
// 	      scope: {
// 	        snippetBody: '=',
// 	        snippetId: '='
// 	      },
// 	      link: function (scope, elem, attrs) {
// 	      	// console.log(scope.snippetId);
// 	      	scope.snippetBody = hljs.highlightAuto(scope.snippetBody).value;
// 	      }
// 	  }
// 	});


