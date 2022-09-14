// import logger from "../../../../../logs/logger.js";
import ProductModel from '../models/product.model.js'
import GetProductModel from '../Models/get-product-model.js'
import { productsDao } from '../daos/products/index.js'

// ------------------------------------------------------------
// TODO: SACAR UUID DE AQUÍ Y HACERLO EN EL MODELO DE PRODUCTOS
// ------------------------------------------------------------
import { v4 as uuidv4 } from 'uuid'
// ------------------------------------------------------------

class ProductsService {
  #productsDao
  #getProductModel
  #newProductModel
  #uuidv4

  constructor(productsDao, ProductModel, GetProductModel, uuidv4) {
    this.#productsDao = productsDao
    this.#newProductModel = ProductModel
    this.#getProductModel = GetProductModel
    this.#uuidv4 = uuidv4
  }

  create = async (req) => {
    try {
      const uuid = this.#uuidv4()
      const newProduct = new this.#newProductModel(req.body)
      const newProductDto = newProduct.dto
      return await this.#productsDao.create({ ...newProductDto, id: uuid })
    } catch (error) {
      // logger.error(error);

      // Si el error no es ninguno de los esperados, enviamos uno genérico
      if (!error.expected)
        error = {
          message: 'Error al crear nuevo producto.',
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
      // logger.error(error);
      // Si el error no es ninguno de los esperados, enviamos uno genérico
      if (!error.expected)
        error = {
          message: 'Error al obtener todos los productos.',
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
          message: 'Producto no encontrado.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      const productDto = new this.#getProductModel(product)
      return productDto.oneProductDto
    } catch (error) {
      // logger.error(error);
      // Si el error no es ninguno de los esperados, enviamos uno genérico
      if (!error.expected)
        error = {
          message: 'Error al obtener producto por id.',
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
          message: 'Producto no encontrado.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return await this.#productsDao.updateById(req.params.id, req.body)
    } catch (error) {
      // logger.error(error);
      // Si el error no es ninguno de los esperados, enviamos uno genérico
      if (!error.expected)
        error = {
          message: 'Error al actualizar producto.',
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
          message: 'Producto no encontrado.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return await this.#productsDao.deleteById(req.params.id)
    } catch (error) {
      // logger.error(error);
      // Si el error no es ninguno de los esperados, enviamos uno genérico
      if (!error.expected)
        error = {
          message: 'Error al eliminar producto por id.',
          code: 'delete_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }
}

export const productsService = new ProductsService(
  productsDao,
  ProductModel,
  GetProductModel,
  uuidv4
)
