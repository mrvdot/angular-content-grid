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
				'listeners' : '=',
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

				var opts = ctrl.options = angular.extend({}, defaults, $scope.userOptions || {});

				/*var registeredElements = [];

				//Register grid element, used to keep track of what all has
				//compiled and let us know if all the elements are ready for Masonry
				ctrl.registerGridElement = function (id, $el) {
					var size = registeredElements.push({
						id : id,
						element : $el
					});

					if ($scope.elements.length == size) {
						//Loose check to see if everything is registered
						initOrUpdateMasonry();
					};
				};

				ctrl.unregisterGridElement = function (id) {

				}//*/
			},
			link : function ($scope, $element, $attrs, ctrl) {
				if ($scope.elements.length) {
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
					} else {
						//Already initialized, just update
						$element.masonry('reloadItems');
						$element.masonry();
					}
				};

				$scope.$watch('elements', function (nv, ov) {
					if (nv) {
						initOrUpdateMasonry();
					};
				});
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
			require : '^contentGrid',
			scope : {
				'element' : '=contentGridElement'
			},
			link : function ($scope, $element, $attrs, gridCtrl) {
				$element.data('element-id', $scope.element.id);
			}
		}
	})