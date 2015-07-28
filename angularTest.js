angular.module('todoApp', [])
	.controller('TodoController', ['$scope',
		function($scope) {
			$scope.todos = [{
				text: 'learn angular',
				done: true
			}, {
				text: 'build an angular app',
				done: false
			}];

			$scope.addTodo = function() {
				$scope.todos.push({
					text: $scope.todoText,
					done: false
				});
				$scope.todoText = '';
			};

			$scope.remaining = function() {
				var count = 0;
				angular.forEach($scope.todos, function(todo) {
					count += todo.done ? 0 : 1;
				});
				return count;
			};

			$scope.archive = function() {
				var oldTodos = $scope.todos;
				$scope.todos = [];
				angular.forEach(oldTodos, function(todo) {
					if (!todo.done) $scope.todos.push(todo);
				});
			};
		}
	]);

angular.module('components', []).directive('tabs', function() {
    return {
        restrict : 'E',
        transclude : true,
        scope : {},
        controller : function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
                if (panes.length == 0)
                    $scope.select(pane);
                panes.push(pane);
            }
        },
        template : '<div class="tabbable">'
            + '<ul class="nav nav-tabs">' 
            + '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' 
            + '<a href="" ng-click="select(pane)">{{pane.title}}</a>' 
            + '</li>' 
            + '</ul>' 
            + '<div class="tab-content" ng-transclude></div>' 
            + '</div>',
        replace : true
    };
}).directive('pane', function() {
    return {
        require : '^tabs',
        restrict : 'E',
        transclude : true,
        scope : {
            title : '@'
        },
        link : function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template : '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + '</div>',
        replace : true
    };
})