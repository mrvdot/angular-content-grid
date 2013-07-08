describe('Content Grid', function () {
	beforeEach(function () {
		browser().navigateTo('/examples/');
	});

	it('should contain compiled content grid', function () {
		var grid = element('.content-grid');
		expect(grid.count()).toBe(1)
	});

	it('should contain two grid elememts', function () {
		expect(element('.grid-element').count()).toBe(2);
	})

	it('should have applied masonry', function () {
		expect(element('.grid-element:first').css('position')).toBe('absolute')
	})
})