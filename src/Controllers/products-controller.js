//----------* IMPORTS *----------//
import productsService from '../Services/products-service.js'

class ProductsController {
  #productsService = productsService

  constructor() {
    this.#productsService = productsService
  }

  create = async (req, res) => {
    try {
      const product = await this.#productsService.create(req)
      res.status(201).json(product)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getAll = async (req, res) => {
    try {
      const products = await this.#productsService.getAll()
      res.status(201).json(products)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getById = async (req, res) => {
    try {
      const product = await this.#productsService.getById(req)
      res.status(201).json(product)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  updateById = async (req, res) => {
    try {
      const updatedProduct = await this.#productsService.updateById(req)
      res.status(201).json(updatedProduct)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  deleteById = async (req, res) => {
    try {
      await this.#productsService.deleteById(req)
      res.status(204).json()
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const productsController = new ProductsController(productsService)

//----------* EXPORT CONTROLLER *----------//
export default productsController
