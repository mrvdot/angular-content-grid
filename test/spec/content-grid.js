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

})