import PaintStore from '../paintStore';
import { fail } from 'assert';
import { rbgToCmyk } from '../../../utilities/colorUtilities';
import OrderService from '../../../services/OrderService';
import ShippingService from '../../../services/ShippingService';


// Set up mocks.

// nope...
// let mockRbgToCmyk = jest.fn();
// jest.mock('../../../utilities/colorUtilities', () => ({
//     rbgToCmyk: mockRbgToCmyk
// }));
// yep...
jest.mock('../../../utilities/colorUtilities', () => ({
	rbgToCmyk: jest.fn()
}));


let mockGetOrder = jest.fn();
jest.mock('../../../services/OrderService', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getOrder: mockGetOrder
		};
	});
});


let mockShipOrder = jest.fn();
jest.mock('../../../services/ShippingService', () => {
	return jest.fn().mockImplementation(() => {
		return {
			shipOrder: mockShipOrder
		};
	});
});


// Set up sample data that's used in multiple tests.
const sampleCmyk = {
	c: 25,
	m: 30,
	y: 35,
	k: 40
};

const samplePaintCans = [
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
	}
];

function generateSampleNewOrder(previousOrderId) {
	return {
		orderId: 289,
		initialOrderId: previousOrderId,
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
}


describe('PaintStore component', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods:
		rbgToCmyk.mockClear();
		OrderService.mockClear();
		ShippingService.mockClear();
	});

	it('validates that initialOrderId is null when purchasePaint() is called', () => {
		// Arrange

		// *** const cmyk = rbgToCmyk(rgb);
		//
		// nope...
		// mockRbgToCmyk = jest.fn(() => {
		//		return sampleCmyk;
		// });
		// yep...
		rbgToCmyk.mockImplementation(() => {
			return sampleCmyk;
		});


		// *** const cansOfPaint = this.makePaint(cmyk, quantity);
		// later...


		// *** this.chargeCustomer(customerId, rgb, quantity)
		// later...


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
			return samplePaintCans;
		});

		// ...now:
		// *** this.chargeCustomer(customerId, rgb, quantity)
		paintStore.chargeCustomer = jest.fn(() => {
			return new Promise((resolve, reject) => {
				const newOrder = generateSampleNewOrder(null);
				resolve(newOrder);
			});
		});

		// Act
		return paintStore.purchasePaint(47, { r: 11, g: 12, b: 13 }, 3)
			.then(result => {
				debugger;
				let foo = mockShipOrder;
				//mockShipOrder.mock.calls.length


				// Assert
				const order  = result;
				expect(order.initialOrderId).toBe(null);
				expect(order.initialOrderId).toBeNull();
			})
	});


	it('validates that initialOrderId is set to the previous orderId when purchaseMorePaint() is called', () => {
		// Arrange
		// *** orderService.getOrder(previousOrderId)
		const previousOrderId = 305;
		mockGetOrder = jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve({
					orderId: previousOrderId,
					initialOrderId: null,
					customerId: 38,
					rgb: {
						r: 220,
						g: 221,
						b: 222
					},
					quantity: 4,
					totalCost: 32.42,
					paymentTransactionId: 935
				});
			});
		});

		// *** const cmyk = rbgToCmyk(rgb);
		rbgToCmyk.mockImplementation(() => {
			return sampleCmyk;
		});

		// *** cansOfPaint = this.makePaint(cmyk, quantity);
		// later...

		// *** return this.chargeCustomer(customerId, rgb, quantity);
		// later...

		// *** shippingService.shipOrder(newOrder, cansOfPaint);
		mockShipOrder = jest.fn(() => {
			return new Promise((resolve, reject) => {
				resolve();
			});
		});



		const paintStore = new PaintStore();


		// ...now:
		// *** const cansOfPaint = this.makePaint(cmyk, quantity);
		paintStore.makePaint = jest.fn(() => {
			return samplePaintCans;
		});

		// ...now:
		// *** this.chargeCustomer(customerId, rgb, quantity)
		paintStore.chargeCustomer = jest.fn(() => {
			return new Promise((resolve, reject) => {
				const newOrder = generateSampleNewOrder(previousOrderId);
				resolve(newOrder);
			});
		});


		// Act
		return paintStore.purchaseMorePaint(47, previousOrderId, 4)
			.then(result => {
				// Assert
				const order  = result;
				expect(order.initialOrderId).toBe(previousOrderId);
			})
	});


	it('validates that makePaint() returns the correct number of pain cans', () => {
		// Arrange
		const cmyk = {
			c: 0,
			m: 0,
			y: 0,
			k: 0
		};
		const numberOfCansOfPaint = 6;

		// Act
		const paintStore = new PaintStore();
		const cansOfPaint = paintStore.makePaint(cmyk, numberOfCansOfPaint);

		// Assert
		expect(cansOfPaint).not.toBeNull();
		expect(cansOfPaint.length).toBe(numberOfCansOfPaint);
	});


	// chargeCustomer
	// TODO...
});
