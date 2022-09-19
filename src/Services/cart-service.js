//----------* IMPORTS *----------//
import CartModel from '../Models/cart-model.js'
import { cartDao } from '../Daos/carts/index.js'
import { productsDao } from '../Daos/products/index.js'

class CartsService {
  #cartModel
  #cartDao
  #productsDao

  constructor(CartModel, cartDao, productsDao) {
    this.#cartModel = CartModel
    this.#cartDao = cartDao
    this.#productsDao = productsDao
  }

  create = async (id) => {
    try {
      const newCart = new this.#cartModel(id)
      return await this.#cartDao.create(newCart.dto)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error al crear nuevo carrito.',
          code: 'create_new_cart_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  getProducts = async (req) => {
    try {
      const cart = await this.#cartDao.getById(req.user.id)
      if (!cart)
        throw {
          message: 'Carrito de usuario no existe.',
          code: 'user_cart_not_found',
          status: 404,
          expected: true,
        }
      return cart.products
    } catch (error) {
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

  addProduct = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.body.productId)
      if (!product)
        throw {
          message: 'Producto no existe.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return this.#cartDao.addProduct(req.user.id, product)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error al agregar producto al carrito.',
          code: 'add_product_to_cart_error',
          expected: true,
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  deleteProduct = async (req) => {
    try {
      const cart = await this.#cartDao.getById(req.user.id)
      if (!cart)
        throw {
          message: 'Carrito de usuario no existe.',
          code: 'user_cart_not_found',
          status: 404,
          expected: true,
        }
      return await this.#cartDao.deleteProduct(req.user.id, req.params.productId)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error al eliminar producto.',
          code: 'delete_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }
}

const cartsService = new CartsService(CartModel, cartDao, productsDao)

//----------* EXPORT SERVICE *----------//
export default cartsService
