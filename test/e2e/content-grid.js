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

	it('should have sized masonry correctly', function () {
		var maxElHeight = 0;
		element('.grid-element').query(function (elements, done) {
			elements.each(function (idx) {
				var el = elements.eq(0);
				var elHeight = el.outerHeight();
				if (elHeight > maxElHeight) {
					maxElHeight = elHeight;
				};
			});

			done();
		});

		expect(element('.content-grid').outerHeight()).not().toBeLessThan(maxElHeight)
	})
})