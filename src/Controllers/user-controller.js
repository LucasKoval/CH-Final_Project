//----------* IMPORTS *----------//
import userService from '../Services/user-service.js'

class UserController {
  #userService

  constructor() {
    this.#userService = userService
  }

  create = async (req, res) => {
    try {
      const user = await this.#userService.create(req)
      res.status(201).json(user)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const userController = new UserController(userService)

//----------* EXPORT CONTROLLER *----------//
export default userController
