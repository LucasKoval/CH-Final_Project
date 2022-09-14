import { ordersService } from "../services/orders.service.js";

class Controller {
	#ordersService = ordersService;
	constructor() {
		this.#ordersService = ordersService;
	}

	create = async (req, res) => {
		try {
			const order = await this.#ordersService.create(req);
			res.status(201).json(order);
		} catch (error) {
			res.status(error.status).json(error);
		}
	};

	getAll = async (req, res) => {
		try {
			const orders = await this.#ordersService.getAll(req);
			res.status(201).json(orders);
		} catch (error) {
			res.status(error.status).json(error);
		}
	};
}

export const ordersController = new Controller(ordersService);
