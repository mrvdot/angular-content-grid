(function (angular) {
'use strict';
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
				'userListeners' : '=listeners',
				'userOptions' : '=options'
			},
			require : 'contentGrid',
			controller : function ($scope, $element, $attrs) {
				var ctrl = this;

				var defaults = {
					inlineStyle : false,//Set to true if you want all elements to get automatic width
					columns : 4,//How many columns should we have
					columnWidth : 0,//Set this to force a specific column width, instead of calculating based on columns property
					gutter : 0
				};

				var listeners = {
					layoutComplete : angular.noop,
					removeComplete : angular.noop
				}

				var opts = ctrl.options = angular.extend({}, defaults, $scope.userOptions || {});
			},
			link : function ($scope, $element, $attrs, ctrl) {
				if ($scope.elements && $scope.elements.length) {
					//Already have elements ready to organize
					setTimeout(function () {
						initOrUpdateMasonry();
					});
				};

				var initialized = false;
				var initOrUpdateMasonry = function () {
					if (!initialized) {
						var opts = {
							columnWidth : ctrl.options.columnWidth || ($element.width() / ctrl.options.columns),
							itemSelector : '.grid-element',
							gutter : ctrl.options.gutter
						};
						initialized = $element.masonry(opts);
						$scope.$emit('masonry-initialized');
					} else {
						//Already initialized, just grab new items and update layout
						$element.masonry('reloadItems');
						$element.masonry();
						$scope.$emit('masonry-updated', $scope.elements);
					}
				};

				$scope.$watch('elements', function (nv, ov) {
					if (nv) {
						setTimeout(function () {
							initOrUpdateMasonry();
						});
					};
				}, true);
			}
		}
	})
	.directive('contentGridElement', function () {
		var insides = '<p class="title">{{element.title}}</p>' + 
			'<div class="content" ng-bind-html="element.content"></div>';
		if (jQuery('#content-grid-tpl').length) {
			insides = jQuery('#content-grid-tpl').html();
		};
		var tpl = '<div class="grid-element">' + 
			insides + 
		'</div>';
		return {
			template : tpl,
			replace : true,
			require : '^contentGrid',
			scope : {
				'element' : '=contentGridElement'
			},
			link : function ($scope, $element, $attrs, gridCtrl) {
				$element.data('element-id', $scope.element.id);
			}
		}
	});
})(angular);