
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
	      	otherwise({redirectTo:'/'});
    }).
    filter('moment', function() {
    	return function(dateString, format) {
        	return moment(dateString).fromNow();
    	}
	}).
	filter('hilight', function() {
    	return function(body) {
    		if(this.snippet.language){
    			console.log("highlight " + this.snippet.language);
        		return hljs.highlight(this.snippet.language, body).value;
        	}else{
        		return hljs.highlightAuto(body).value;
        	}
    	}
	});
     
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
			Snippets.create($http, this.snippet).
				success(function(data){
					console.log("create success");
					$scope.snippets.unshift(data);
					$scope.snippet.body = "";
				});
		};
		$scope.delete = function(){
			console.log("delete " + this.snippet._id);
			$scope.snippets.splice($scope.snippets.indexOf(this.snippet),1);
			Snippets.delete($http, this.snippet).
				success(function(data){
					console.log("delete success");
				});
		}
	});
}