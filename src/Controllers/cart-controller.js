import { cartsService } from '../Services/carts-service.js'

class Controller {
  #cartsService
  constructor(cartsService) {
    this.#cartsService = cartsService
  }

  create = async (req, res) => {
    try {
      const cart = await this.#cartsService.create(req)
      res.status(201).json(cart)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getProducts = async (req, res) => {
    try {
      const cart = await this.#cartsService.getProducts(req)
      res.status(201).json(cart)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  addProduct = async (req, res) => {
    try {
      const updatedProduct = await this.#cartsService.addProduct(req)
      res.status(201).json(updatedProduct)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      await this.#cartsService.deleteProduct(req)
      res.status(204).json()
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

export const cartsController = new Controller(cartsService)
