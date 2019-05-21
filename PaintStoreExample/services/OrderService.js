export default class OrderService {
	placeOrder(
		customerId,
		rgb,
		quantity,
		totalCost,
		paymentTransactionId
	) {
		return new Promise((resolve, reject) => {

			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);

			resolve({
				orderId: 89,
				initialOrderId: null,
				customerId,
				rgb,
				quantity,
				totalCost,
				paymentTransactionId
			});
		});
	}

	getOrder(previousOrderId) {
		return new Promise((resolve, reject) => {

			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);

			resolve({
				orderId: previousOrderId,
				initialOrderId: null,
				customerId: 19,
				rgb: {
					r: 40,
					g: 41,
					b: 42
				},
				quantity: 4,
				totalCost: 27.95,
				paymentTransactionId: 286
			});
		});
	}
}
