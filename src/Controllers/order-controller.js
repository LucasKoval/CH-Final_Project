//----------* IMPORTS *----------//
import orderService from '../Services/order-service.js'

class OrderController {
  #orderService = orderService

  constructor() {
    this.#orderService = orderService
  }

  create = async (req, res) => {
    try {
      const order = await this.#orderService.create(req)
      res.status(201).json(order)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getAll = async (req, res) => {
    try {
      const orders = await this.#orderService.getAll(req)
      res.status(201).json(orders)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const orderController = new OrderController(orderService)

//----------* EXPORT CONTROLLER *----------//
export default orderController
