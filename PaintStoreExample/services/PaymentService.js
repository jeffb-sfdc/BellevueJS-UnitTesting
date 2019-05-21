export default class PaymentService {
	chargePayment(totalCost) {
		return new Promise((resolve, reject) => {

			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);


			const paymentTransactionId = 214;
			resolve(paymentTransactionId);
		});
	}
}
