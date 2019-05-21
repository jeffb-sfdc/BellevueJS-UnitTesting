export default class InventoryService {
	calculateCost(quantity) {
		return new Promise((resolve, reject) => {

			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);
			//throw `DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`;

			// debugger;

			//const x = Number(14.55 * quantity).toFixed(2);
			resolve(parseFloat((14.55 * quantity).toFixed(2)));
		});
	}
}
