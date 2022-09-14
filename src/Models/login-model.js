export default class LoginModel {
	#password;
	#email;

	constructor({ email, password }) {
		this.password = password;
		this.email = email;
	}

	set password(password) {
		if (!password)
			throw {
				message: "La contraseña es requerida.",
				code: "password_required",
				expected: true,
				status: 400,
			};

		if (typeof password !== "string")
			throw {
				message: "La contraseña debe ser un string.",
				code: "password_must_be_string",
				status: 400,
				expected: true,
			};

		this.#password = password;
	}

	set email(email) {
		if (!email)
			throw {
				message: "El correo electrónico es requerido.",
				code: "email_required",
				expected: true,
				status: 400,
			};

		if (typeof email !== "string")
			throw {
				message: "El correo electrónico debe ser un string.",
				code: "email_must_be_string",
				status: 400,
				expected: true,
			};

		this.#email = email;
	}

	get dto() {
		const data = {
			email: this.#email,
			password: this.#password,
		};

		return JSON.parse(JSON.stringify(data));
	}
}
