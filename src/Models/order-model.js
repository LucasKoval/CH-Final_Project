export default class OrderModel {
	#id;
	#date;
	#userId;
	#name;
	#lastname;
	#email;
	#phone;
	#image;
	#products;

	constructor(idGenerator, { id: userId, name, lastname, email, phone, image }, products) {
		this.id = idGenerator();
		this.date = new Date().getTime();
		this.userId = userId;
		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.image = image;
		this.products = products;
	}

	set id(id) {
		if (!id)
			throw {
				message: "El id de la orden es requerido.",
				code: "id_required",
				expected: true,
				status: 400,
			};

		if (typeof id !== "string")
			throw {
				message: "El id de la orden debe ser un string.",
				code: "id_must_be_string",
				status: 400,
				expected: true,
			};

		this.#id = id;
	}

	set date(date) {
		if (!date)
			throw {
				message: "La fecha de orden es requerida.",
				code: "order_date_required",
				expected: true,
				status: 400,
			};

		if (typeof date !== "number")
			throw {
				message: "La fecha de orden debe ser un número.",
				code: "order_date_must_be_number",
				status: 400,
				expected: true,
			};

		this.#date = date;
	}

	set userId(userId) {
		console.log({ userId });
		if (!userId)
			throw {
				message: "El id de cliente en la orden es requerido.",
				code: "userId_required",
				expected: true,
				status: 400,
			};

		if (typeof userId !== "string")
			throw {
				message: "El id de cliente en la orden debe ser un string.",
				code: "userId_must_be_string",
				status: 400,
				expected: true,
			};

		this.#userId = userId;
	}

	set name(name) {
		if (!name)
			throw {
				message: "El nombre en la orden es requerido.",
				code: "name_required",
				expected: true,
				status: 400,
			};

		if (typeof name !== "string")
			throw {
				message: "El nombre en la orden debe ser un string.",
				code: "name_must_be_string",
				status: 400,
				expected: true,
			};

		this.#name = name;
	}

	set lastname(lastname) {
		if (!lastname)
			throw {
				message: "El apellido en la orden es requerido.",
				code: "lastname_required",
				expected: true,
				status: 400,
			};

		if (typeof lastname !== "string")
			throw {
				message: "El apellido en la orden debe ser un string.",
				code: "lastname_must_be_string",
				status: 400,
				expected: true,
			};

		this.#lastname = lastname;
	}

	set email(email) {
		if (!email)
			throw {
				message: "El correo electrónico en la orden es requerido.",
				code: "email_required",
				expected: true,
				status: 400,
			};

		if (typeof email !== "string")
			throw {
				message: "El correo electrónico en la orden debe ser un string.",
				code: "email_must_be_string",
				status: 400,
				expected: true,
			};

		this.#email = email;
	}

	set phone(phone) {
		if (!phone)
			throw {
				message: "El teléfono en la orden es requerido.",
				code: "phone_required",
				expected: true,
				status: 400,
			};

		if (typeof phone !== "string")
			throw {
				message: "El correo electrónico en la orden debe ser un string.",
				code: "phone_must_be_string",
				status: 400,
				expected: true,
			};

		this.#phone = phone;
	}

	set image(image) {
		if (!image)
			throw {
				message: "La imagen en la orden es requerido.",
				code: "image_required",
				expected: true,
				status: 400,
			};

		if (typeof image !== "string")
			throw {
				message: "La imagen en la orden debe ser un string.",
				code: "image_must_be_string",
				status: 400,
				expected: true,
			};

		this.#image = image;
	}

	set products(products) {
		if (!products)
			throw {
				message: "Los productos en la orden son requeridos.",
				code: "order_products_required",
				expected: true,
				status: 400,
			};

		if (!Array.isArray(products))
			throw {
				message: "Los productos en la orden deben ser un array.",
				code: "order_products_must_be_array",
				status: 400,
				expected: true,
			};

		this.#products = products;
	}

	get dto() {
		const data = {
			id: this.#id,
			date: this.#date,
			userId: this.#userId,
			name: this.#name,
			lastname: this.#lastname,
			email: this.#email,
			phone: this.#phone,
			image: this.#image,
			products: this.#products,
		};

		return JSON.parse(JSON.stringify(data));
	}
}
