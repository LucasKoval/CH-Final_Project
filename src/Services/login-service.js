import LoginModel from "../models/login.model.js";
import { usersDao } from "../daos/users/index.js";
import { tokenGenerator, passwordChecker } from "../utils.js";

class LoginService {
	#LoginModel;
	#usersDao;
	#tokenGenerator;
	#passwordChecker;

	constructor(LoginModel, usersDao, tokenGenerator, passwordChecker) {
		this.#LoginModel = LoginModel;
		this.#usersDao = usersDao;
		this.#tokenGenerator = tokenGenerator;
		this.#passwordChecker = passwordChecker;
	}

	login = async (req) => {
		try {
			const LoginModel = new this.#LoginModel(req.body);
			const loginDto = LoginModel.dto;
			const user = await this.#usersDao.getByEmail(loginDto.email);

			const login = await this.#passwordChecker(loginDto.password, user.password);
			if (!login) {
				throw {
					message: "Contraseña incorrecta",
					code: "invalid_password",
					status: 400,
					expected: true,
				};
			}

			const token = this.#tokenGenerator(user);

			return { id: user.id, username: user.email, token };
		} catch (error) {
			if (!error.expected)
				error = {
					message: "Error al loguearse.",
					code: "login_error",
					status: 500,
				};

			delete error.expected;
			throw error;
		}
	};
}

export const loginService = new LoginService(LoginModel, usersDao, tokenGenerator, passwordChecker);
