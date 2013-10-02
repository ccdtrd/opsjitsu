function SnippetListCtrl($scope, $http) {
  $http.get('/list').success(function(data) {
  	$scope.snippets = data;
  }); 
}