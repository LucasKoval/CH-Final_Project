import { loginService } from "../services/login.service.js";
class Controller {
	#loginService;
	constructor() {
		this.#loginService = loginService;
	}

	login = async (req, res) => {
		try {
			const login = await this.#loginService.login(req);
			res.status(201).json(login);
		} catch (error) {
			res.status(error.status).json(error);
		}
	};
}

export const loginController = new Controller(loginService);
