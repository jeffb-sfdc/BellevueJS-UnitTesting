export default class TaxService {
	calculateTax(cost, state) {
		return new Promise((resolve, reject) => {

			// debugger;
			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);


			resolve(parseFloat((cost * 0.10).toFixed(2)));
		});
	}
}
