import { rbgToCmyk } from '../../utilities/colorUtilities';

import CustomerService from '../../services/CustomerService';
import InventoryService from '../../services/InventoryService';
import OrderService from '../../services/OrderService';
import PaymentService from '../../services/PaymentService';
import ShippingService from '../../services/ShippingService';
import TaxService from '../../services/TaxService';


export default class PaintStore {
	/*
	*/
	newTest1() {
		return new Promise((resolve, reject) => {
			resolve(1);
		});
	}

	newTest2() {
		return new Promise((resolve, reject) => {
			//throw new Error(`don't do that`);
			//throw `don't do that`;
			resolve();
		});
	}

	purchasePaint(customerId, rgb, quantity) {
		return new Promise((resolve, reject) => {
			if(!customerId || !rgb || !quantity) {
				throw new Error('Error in purchasePaint() - bad parameters');
				//throw 'Error in purchasePaint() - bad parameters';
				//reject('Error in purchasePaint() - bad parameters');
			}

			const cmyk = rbgToCmyk(rgb);
			const cansOfPaint = this.makePaint(cmyk, quantity);
			this.chargeCustomer(customerId, rgb, quantity)
				.then(response => {
					const newOrder = response;
					newOrder.initialOrderId = null;

					const shippingService = new ShippingService();

					// Fire and forget
					shippingService.shipOrder(newOrder, cansOfPaint);

					resolve(newOrder);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	purchaseMorePaint(customerId, previousOrderId, quantity) {
		return new Promise((resolve, reject) => {
			if(!customerId || !previousOrderId || !quantity) {
				throw new Error('Error in purchaseMorePaint() - bad parameters');
				//throw 'Error in purchaseMorePaint() - bad parameters';
				//reject('Error in purchaseMorePaint() - bad parameters');
			}

			let cansOfPaint = undefined;
			const orderService = new OrderService();
			orderService.getOrder(previousOrderId)
				.then(response => {
					const previousOrder = response;
					const rgb = previousOrder.rgb;

					const cmyk = rbgToCmyk(rgb);

					cansOfPaint = this.makePaint(cmyk, quantity);
		
					return this.chargeCustomer(customerId, rgb, quantity);
				})
				.then(response => {
					const newOrder = response;
					newOrder.initialOrderId = previousOrderId;

					const shippingService = new ShippingService();

					// Fire and forget
					shippingService.shipOrder(newOrder, cansOfPaint);

					resolve(newOrder);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	makePaint(cmyk, quantity) {
		// ...
		// return an array of cans of paint
		// since this is a demo, for now just return something
		let cans = [];
		for(let i=0; i<quantity; i++) {
			cans.push({
				id: 'canId' + (i + 1)
			});
		}

		return cans;
	}

	chargeCustomer(customerId, rgb, quantity) {
		return new Promise((resolve, reject) => {
			let cost = undefined;
			let customer = undefined;
			let tax = undefined;
			let totalCost = undefined;


			/*
			const inventoryService = new InventoryService();
			const customerService = new CustomerService();
			Promise.all([inventoryService.calculateCost(quantity), customerService.getCustomer(customerId)])
				.then(results => {
					cost = results[0];
					customer = results[1];

					const taxService = new TaxService();
					return taxService.calculateTax(cost, customer.State);
				})
			*/


			const inventoryService = new InventoryService();
			inventoryService.calculateCost(quantity)
				.then(result => {
					cost = result;

					const customerService = new CustomerService();
					return customerService.getCustomer(customerId);
				})
				.then(result => {
					customer = result;

					const taxService = new TaxService();
					return taxService.calculateTax(cost, customer.State);
				})
				.then(result => {
					tax = result;
					totalCost = parseFloat((cost + tax).toFixed(2));
		
					const paymentService = new PaymentService();
					return paymentService.chargePayment(totalCost);
				})
				.then(result => {
					const paymentTransactionId = result;

					const orderService = new OrderService();
					return orderService.placeOrder(
						customerId,
						rgb,
						quantity,
						totalCost,
						paymentTransactionId
					);
				})
				.then(result => {
					const order = result;

					resolve(order);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
}
