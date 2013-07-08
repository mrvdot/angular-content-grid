describe('Content Grid', function () {
	var $compile
		, $rootScope
		, tpl = '<div content-grid="elements"></div>'
		, elements = [];

	beforeEach(module('mvdContentGrid'))

	beforeEach(inject(function (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	describe('Basic compilation', function () {
		it('should scope elements correctly', function () {
			var $parScope = $rootScope.$new();
			$parScope.elements = elements;
			$parScope.otherProperty = "should be undefined";
			var $el = $compile(tpl)($parScope);

			var $scope = $el.scope();

			expect($scope.elements.length).toBe($parScope.elements.length);

			$parScope.elements.push({"test" : "item"});

			expect($scope.elements.length).toBe($parScope.elements.length);

			expect($scope.otherProperty).toBeUndefined();
		});

		it('should compile template with elements', function () {
			var $parScope = $rootScope.$new();
			$parScope.elements = [
				{
					title : "TITLE",
					id : 1,
					content : "<p>CONTENT</p>"
				}
			]
			var $el = $compile(tpl)($parScope);

			$rootScope.$digest();

			var gridElements = $el.find('[content-grid-element]');

			expect(gridElements.length).toBe($parScope.elements.length);

			var first = $parScope.elements[0];

			expect(gridElements.eq(0).data('element-id')).toBe(first.id);

			expect(gridElements.eq(0).find('.title').text()).toBe(first.title);

			expect(gridElements.eq(0).find('.content').html()).toContain(first.content);
		})

	})

	describe('Events', function () {
		var initEvent = 'masonry-initialized'
			, updateEvent = 'masonry-updated';

		it('should not fire ' + initEvent + ' event when initialized with no elements', function () {
			var $parScope = $rootScope.$new();
			var initialized = false;

			$parScope.$on(initEvent, function () {
				initialized = true;
			});
			
			var $el = $compile(tpl)($parScope);

			$rootScope.$digest();

			expect(initialized).toBe(false);
		})

		it('should fire ' + initEvent + ' event when initialized with elements', function () {
			var $parScope = $rootScope.$new();

			$parScope.elements = [
				{
					title : "TITLE",
					id : 1,
					content : "<p>CONTENT</p>"
				}
			];

			var initialized = false;

			runs(function () {
				$parScope.$on(initEvent, function () {
					initialized = true;
				});
				
				var $el = $compile(tpl)($parScope);

				$rootScope.$digest();
			});

			waitsFor(function () {
				return initialized;
			}, 'Initialized should have been fired', 200);

			runs(function () {
				expect(initialized).toBe(true);
			})
		});

		it('should fire ' + updateEvent + ' event when elements change', function () {
			var $parScope = $rootScope.$new();

			$parScope.elements = [
				{
					title : "TITLE",
					id : 1,
					content : "<p>CONTENT</p>"
				}
			];

			var changed = false;
			$parScope.$on(updateEvent, function () {
				changed = true;
			});

			runs(function () {
				$parScope.$on(updateEvent, function () {
					changed = true;
				});
				
				var $el = $compile(tpl)($parScope);

				$rootScope.$digest();

				//Should not have fired yet
				expect(changed).toBe(false);

				$parScope.elements.push({
					id : 2,
					title : 'TITLE2',
					content : 'MORE CONTENT'
				});

				$parScope.$digest();
			});

			waitsFor(function () {
				return changed;
			}, 'changed should be fired', 200);

			runs(function () {
				expect(changed).toBe(true);
			})
		})
	})
})