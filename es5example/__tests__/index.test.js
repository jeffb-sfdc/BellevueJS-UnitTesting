const index = require('../index');


const someFunction = index.__get__('someFunction');
const anotherFunction = index.__get__('anotherFunction');


describe('someFunction', () => {
	it('verifies someFunction() return the correct string', () => {
		expect(someFunction()).toEqual('some thing');
	});

	it('verifies anotherFunction() return the correct string', () => {
		expect(anotherFunction()).toEqual('another thing');
	});
});
