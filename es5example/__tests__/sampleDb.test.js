

const sampleDb = require('../sampleDb');


describe('test sampleDb.js', () => {
	it('should pass', () => {
		const expected = [5, 6, 7, 8];
		sampleDb.__set__('sampleData', expected);

		const results = sampleDb.getData();
		expect(results).toEqual(expected);
	})
});