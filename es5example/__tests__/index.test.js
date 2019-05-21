
//const someFunction = require('../index').__get__('someFunction');
const index = require('../index');
const someFunction = index.__get__('someFunction');


describe('someFunction', () => {
	it('should work', () => {
		expect(someFunction()).toEqual('anything');
	});
});
