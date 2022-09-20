//----------* IMPORTS *----------//
import CartModel from '../Models/cart-model.js'
import { cartDao } from '../Daos/carts/index.js'
import { productsDao } from '../Daos/products/index.js'

class CartService {
  #cartModel
  #cartDao
  #productDao

  constructor(CartModel, cartDao, productsDao) {
    this.#cartModel = CartModel
    this.#cartDao = cartDao
    this.#productDao = productsDao
  }

  create = async (id) => {
    try {
      const newCart = new this.#cartModel(id)
      return await this.#cartDao.create(newCart.dto)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error creating new cart.',
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
          message: 'User cart does not exist.',
          code: 'user_cart_not_found',
          status: 404,
          expected: true,
        }
      return cart.products
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

  addProduct = async (req) => {
    try {
      const product = await this.#productDao.getById(req.body.productId)
      if (!product)
        throw {
          message: 'Product not found.',
          code: 'product_not_found',
          status: 404,
          expected: true,
        }
      return this.#cartDao.addProduct(req.user.id, product)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error adding product to cart.',
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
          message: 'User cart does not exist.',
          code: 'user_cart_not_found',
          status: 404,
          expected: true,
        }
      return await this.#cartDao.deleteProduct(req.user.id, req.params.productId)
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error removing product.',
          code: 'delete_product_by_id_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }
}

const cartService = new CartService(CartModel, cartDao, productsDao)

//----------* EXPORT SERVICE *----------//
export default cartService
