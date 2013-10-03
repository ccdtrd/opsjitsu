


function SnippetListCtrl($scope, $http) {
  $http.get('/list').success(function(data) {
  	$scope.snippets = data;
  }); 
}

var opsjitsu = angular.module('opsjitsu', []);

opsjitsu.
	directive('snippetButton', function ($http) {
		return {
			restrict: 'A',
			template: '<button type="button" class="btn btn-default glyphicon {{snippetGlyphNameValue}}"></button>',
			scope: {
				snippetGlyphNameValue: '@',
				snippetButtonAction: '@',
				snippetId: '='
			},
			link: function (scope, elem, attrs) {
				scope.edit = function(index) {
   					console.log("edit " + scope.snippetId);

				};
				scope.delete = function(index) {
   					console.log("delete " + scope.snippetId);
   					$http.get('/delete/'+ scope.snippetId).
   						success(function(data) {
   							$("#"+scope.snippetId+"").remove();
   							console.log("delete success");
   						});
				};
			}
		}
	});

opsjitsu.
	directive('snippetBodyHighlighter', function () {
	    return {
	      restrict: 'A',
	      template: '<pre><code ng-bind-html-unsafe="snippetBodyValue"></code></pre>',
	      scope: {
	        snippetBodyValue: '='
	      },
	      link: function (scope, elem, attrs) {
	      	// console.log(scope.snippetValue);
	      	scope.snippetBodyValue = hljs.highlightAuto(scope.snippetBodyValue).value;
	      }
	  }
	});


