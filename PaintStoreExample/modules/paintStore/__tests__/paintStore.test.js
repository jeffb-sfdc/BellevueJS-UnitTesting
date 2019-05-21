import PaintStore from '../paintStore';
import { fail } from 'assert';


describe('PaintStore component', () => {
	/*
	it('simple0', done => {
		done.fail('This is the error');
	});
	*/

	/*
	it('simple1', () => {
		const paintStore = new PaintStore();
		return paintStore.newTest1()
			.then(result => {
				debugger;
				expect(1).toBe(1);
			});
	});

	it('simple2', () => {
		const paintStore = new PaintStore();
		paintStore.newTest2()
			.then(result => {
				debugger;
				expect(1).toBe(1);
			})
			.catch(error => {
				fail(error);
			})

		// return paintStore.newTest2()
		// 	.then(result => {
		// 		debugger;
		// 		expect(1).toBe(1);
		// 	});

	});
	*/


	it('validates that initialOrderId is null when purchasePaint() is called', () => {
		debugger;

		const paintStore = new PaintStore();
		return paintStore.purchasePaint(47, { r: 11, g: 12, b: 13 }, 3)
			.then(result => {
				const order  = result;
				expect(order.initialOrderId).toBe(null);
				expect(order.initialOrderId).toBeNull();
			})
	})

	it('validates that initialOrderId is null when purchaseMorePaint() is called', () => {
		debugger;

		const previousOrderId = 305;
		const paintStore = new PaintStore();
		return paintStore.purchaseMorePaint(47, previousOrderId, 4)
			.then(result => {
				const order  = result;
				expect(order.initialOrderId).not.toBe(null);
				expect(order.initialOrderId).not.toBeNull();
				expect(order.initialOrderId).toBe(previousOrderId);
			})
	})
})
