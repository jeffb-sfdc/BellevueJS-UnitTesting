export default class ShippingService {
	shipOrder(newOrder, cansOfPaint) {
		return new Promise((resolve, reject) => {

			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);


			resolve();
		});
	}
}
