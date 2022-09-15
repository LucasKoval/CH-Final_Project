//----------* IMPORTS *----------//
import cartService from '../Services/cart-service.js'

class CartController {
  #cartService

  constructor(cartService) {
    this.#cartService = cartService
  }

  create = async (req, res) => {
    try {
      const cart = await this.#cartService.create(req)
      res.status(201).json(cart)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getProducts = async (req, res) => {
    try {
      const cart = await this.#cartService.getProducts(req)
      res.status(201).json(cart)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  addProduct = async (req, res) => {
    try {
      const updatedProduct = await this.#cartService.addProduct(req)
      res.status(201).json(updatedProduct)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      await this.#cartService.deleteProduct(req)
      res.status(204).json()
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const cartController = new CartController(cartService)

//----------* EXPORT CONTROLLER *----------//
export default cartController
