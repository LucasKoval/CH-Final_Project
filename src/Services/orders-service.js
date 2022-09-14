import OrderModel from "../models/order.model.js";
import { ordersDao } from "../daos/orders/index.js";
import { cartsDao } from "../daos/carts/index.js";
import { idGenerator } from "../utils.js";
import { transporter } from "../senders/email/gmail.js";
import { newOrderEmailTemplate } from "../senders/email/templates/new-order-email.template.js";

class OrdersService {
	#ordersDao;
	#cartsDao;
	#orderModel;
	#idGenerator;

	constructor(ordersDao, cartsDao, OrderModel, idGenerator) {
		this.#ordersDao = ordersDao;
		this.#cartsDao = cartsDao;
		this.#orderModel = OrderModel;
		this.#idGenerator = idGenerator;
	}

	create = async (req) => {
		try {
			const userId = req.user.id;
			const userCart = await this.#cartsDao.getById(userId);
			const orderModel = new this.#orderModel(this.#idGenerator, req.user, userCart.products);
			const orderDto = orderModel.dto;
			console.log({ orderDto });
			const newOrder = await this.#ordersDao.create(orderDto);
			if (!newOrder)
				throw {
					message: "Error al crear orden.",
					code: "create_order_error",
					status: 500,
					expected: true,
				};

			await this.#cartsDao.deleteAllProducts(userId);

			await this.#sendNotificationEmail(orderDto);

			return newOrder;
		} catch (error) {
			console.log({ error });
			if (!error.expected)
				error = {
					message: "Error al crear orden.",
					code: "create_order_error",
					status: 500,
				};

			delete error.expected;
			throw error;
		}
	};

	getAll = async (req) => {
		try {
			console.log("req", req.user);
			return await this.#ordersDao.getAll(req.user.id);
		} catch (error) {
			console.log({ error });
			if (!error.expected)
				error = {
					message: "Error al obtener todos los productos.",
					code: "get_all_products_error",
					status: 500,
				};

			delete error.expected;
			throw error;
		}
	};

	#sendNotificationEmail = async (order) => {
		try {
			const template = newOrderEmailTemplate(order);
			await transporter.sendMail(template);
		} catch (error) {
			console.log({ error });
			if (!error.expected)
				error = {
					message: "Error al enviar notificación.",
					code: "send_notification_error",
					status: 500,
				};

			delete error.expected;
			throw error;
		}
	};
}

export const ordersService = new OrdersService(ordersDao, cartsDao, OrderModel, idGenerator);
