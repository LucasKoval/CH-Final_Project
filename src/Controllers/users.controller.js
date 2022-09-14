import { usersService } from '../Services/users.service.js'

class Controller {
  #usersService
  constructor() {
    this.#usersService = usersService
  }

  create = async (req, res) => {
    try {
      const user = await this.#usersService.create(req)
      res.status(201).json(user)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

export const usersController = new Controller(usersService)
