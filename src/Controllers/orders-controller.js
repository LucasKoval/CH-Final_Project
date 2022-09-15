//----------* IMPORTS *----------//
import ordersService from '../Services/orders-service.js'

class OrdersController {
  #ordersService = ordersService

  constructor() {
    this.#ordersService = ordersService
  }

  create = async (req, res) => {
    try {
      const order = await this.#ordersService.create(req)
      res.status(201).json(order)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getAll = async (req, res) => {
    try {
      const orders = await this.#ordersService.getAll(req)
      res.status(201).json(orders)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const ordersController = new OrdersController(ordersService)

//----------* EXPORT CONTROLLER *----------//
export default ordersController
