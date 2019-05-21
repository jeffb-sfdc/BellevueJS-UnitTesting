export default class CustomerService {
	getCustomer(customerId) {
		return new Promise((resolve, reject) => {


			throw new Error(`DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`);
			//throw `DON'T CALL EXTERNAL RESOURCES IN A UNIT TEST!`;


			resolve({
				customerId,
				State: 'WA'
			});


			// setTimeout(() => {
			// 	resolve({
			// 		customerId,
			// 		State: 'WA'
			// 	});
			// }, 5000);


		});
	}
}
