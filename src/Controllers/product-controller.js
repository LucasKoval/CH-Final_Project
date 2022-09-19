//----------* IMPORTS *----------//
import productService from '../Services/product-service.js'

class ProductController {
  #productService = productService

  constructor() {
    this.#productService = productService
  }

  create = async (req, res) => {
    try {
      const product = await this.#productService.create(req)
      res.status(201).json(product)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getAll = async (req, res) => {
    try {
      const products = await this.#productService.getAll()
      res.status(201).json(products)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  getById = async (req, res) => {
    try {
      const product = await this.#productService.getById(req)
      res.status(201).json(product)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  updateById = async (req, res) => {
    try {
      const updatedProduct = await this.#productService.updateById(req)
      res.status(201).json(updatedProduct)
    } catch (error) {
      res.status(error.status).json(error)
    }
  }

  deleteById = async (req, res) => {
    try {
      await this.#productService.deleteById(req)
      res.status(204).json()
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const productController = new ProductController(productService)

//----------* EXPORT CONTROLLER *----------//
export default productController
