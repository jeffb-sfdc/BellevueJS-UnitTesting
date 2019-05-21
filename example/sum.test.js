const sum = require('./sum');

describe('sum.js', () => {
	it('verifies adding 1 plus 2 equals 3', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
