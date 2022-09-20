//----------* IMPORTS *----------//
import ProductModel from '../Models/product-model.js'
import GetProductModel from '../Models/get-product-model.js'
import { productsDao } from '../Daos/products/index.js'
import { v4 as uuidv4 } from 'uuid'

class ProductService {
  #newProductModel
  #getProductModel
  #productsDao
  #uuidv4

  constructor(ProductModel, GetProductModel, productsDao, uuidv4) {
    this.#newProductModel = ProductModel
    this.#getProductModel = GetProductModel
    this.#productsDao = productsDao
    this.#uuidv4 = uuidv4
  }

  create = async (req) => {
    try {
      const uuid = this.#uuidv4()
      const newProduct = new this.#newProductModel(req.body)
      const newProductDto = newProduct.dto
      return await this.#productsDao.create({ ...newProductDto, id: uuid })
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error creating new product.',
          code: 'post_new_product_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  getAll = async () => {
    try {
      const allProducts = await this.#productsDao.getAll()
      const products = new this.#getProductModel(allProducts)
      return products.allProductsDto
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Failed to get all products.',
          code: 'get_all_products_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  getById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id)

      if (!product)
        throw {
          message: 'Product not found.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      const productDto = new this.#getProductModel(product)
      return productDto.oneProductDto
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error getting product by id.',
          code: 'get_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  updateById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id)
      if (!product)
        throw {
          message: 'Product not found.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return await this.#productsDao.updateById(req.params.id, req.body)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error updating product.',
          code: 'update_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  deleteById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id)
      if (!product)
        throw {
          message: 'Product not found.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return await this.#productsDao.deleteById(req.params.id)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error removing product by id.',
          code: 'delete_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }
}

const productService = new ProductService(ProductModel, GetProductModel, productsDao, uuidv4)

//----------* EXPORT SERVICE *----------//
export default productService
