//----------* IMPORTS *----------//
import loginService from '../Services/login-service.js'

class LoginController {
  #loginService

  constructor() {
    this.#loginService = loginService
  }

  login = async (req, res) => {
    try {
      const login = await this.#loginService.login(req)
      res.status(201).json(login)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const loginController = new LoginController(loginService)

//----------* EXPORT CONTROLLER *----------//
export default loginController
