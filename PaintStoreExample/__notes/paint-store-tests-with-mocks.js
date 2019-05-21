import PaintStore from '../paintStore';
import { fail } from 'assert';
import { rbgToCmyk } from '../../../utilities/colorUtilities';
import ShippingService from '../../../services/ShippingService';



//let mockRbgToCmyk = jest.fn();
jest.mock('../../../utilities/colorUtilities', () => ({
	rbgToCmyk: jest.fn()
}));




let mockShipOrder = jest.fn();
jest.mock('../../../services/ShippingService', () => {
	return jest.fn().mockImplementation(() => {
		debugger;

		return {
			shipOrder: mockShipOrder
		};
	});
});






describe('PaintStore component', () => {
	it.only('validates that initialOrderId is null when purchasePaint() is called', () => {
		// Arrange

		// *** const cmyk = rbgToCmyk(rgb);
		rbgToCmyk.mockImplementation(() => {
			// debugger;
			return {
				c: 25,
				m: 30,
				y: 35,
				k: 40
			};
		});


		// *** const cansOfPaint = this.makePaint(cmyk, quantity);
		// later...


		// *** this.chargeCustomer(customerId, rgb, quantity)
		// later...


		// *** const shippingService = new ShippingService();
		// *** shippingService.shipOrder(newOrder, cansOfPaint);
		mockShipOrder = jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve();
			});
		});


		// paintStore instance is instance to actual class, not a mocked instance.
		const paintStore = new PaintStore();



		// ...now:
		// *** const cansOfPaint = this.makePaint(cmyk, quantity);
		paintStore.makePaint = jest.fn(() => {
			// debugger;
			return [
				{
					id: 'paintCanId71'
				},
				{
					id: 'paintCanId72'
				},
				{
					id: 'paintCanId73'
				},
				{
					id: 'paintCanId74'
				},
			];
		});

		// ...now:
		// *** this.chargeCustomer(customerId, rgb, quantity)
		paintStore.chargeCustomer = jest.fn(() => {

			debugger;


			return new Promise((resolve, reject) => {
				debugger;

				const newOrder = {
					orderId: 289,
					initialOrderId: null,
					customerId: 467,
					rgb: {
						r: 97,
						g: 98,
						b: 99
					},
					quantity: 4,
					totalCost: 144.12,
					paymentTransactionId: 687
				};

				resolve(newOrder);
			});
		});


		debugger;
		// Act
		return paintStore.purchasePaint(47, { r: 11, g: 12, b: 13 }, 3)
			.then(result => {
				// Assert
				const order  = result;
				expect(order.initialOrderId).toBe(null);
				expect(order.initialOrderId).toBeNull();
			})
	})

	// it('validates that initialOrderId is null when purchasePaint() is called', () => {
	// 	debugger;

	// 	const previousOrderId = 305;
	// 	const paintStore = new PaintStore();
	// 	return paintStore.purchaseMorePaint(47, previousOrderId, 4)
	// 		.then(result => {
	// 			const order  = result;
	// 			expect(order.initialOrderId).not.toBe(null);
	// 			expect(order.initialOrderId).not.toBeNull();
	// 			expect(order.initialOrderId).toBe(previousOrderId);
	// 		})
	// })
})

