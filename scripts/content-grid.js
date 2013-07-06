angular.module('mvdContentGrid', ['ngSanitize'])
	.directive('contentGrid', function () {
		var tpl = '<div class="content-grid">' + 
			'<div content-grid-element="e" ng-repeat="e in elements"></div>' + 
		'</div>';
		return {
			template : tpl,
			replace : true,
			scope : {
				'elements' : '=contentGrid',
				'listeners' : '=',
				'userOptions' : '=options'
			},
			controller : function ($scope, $element, $attrs) {
				
			}
		}
	})
	.directive('contentGridElement', function () {
		var tpl = '<div class="grid-element">' + 
			'<p class="title">{{element.title}}</p>' + 
			'<div class="content" ng-bind-html="element.content"></div>' + 
		'</div>';
		return {
			template : tpl,
			replace : true,
			scope : {
				'element' : '=contentGridElement'
			},
			link : function ($scope, $element, $attrs) {
				$element.data('element-id', $scope.element.id);
			}
		}
	})