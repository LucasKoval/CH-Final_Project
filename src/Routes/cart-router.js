//----------* IMPORTS *----------//
import { Router } from 'express'
import cartController from '../Controllers/cart-controller.js'
import isAuth from '../Middlewares/is-auth.js'

//----------* CART ROUTES *----------//
const cartRouter = new Router()

// Get Cart Products
cartRouter.get('/', isAuth, cartController.getProducts)

// Add Product to Cart
cartRouter.post('/', isAuth, cartController.addProduct)

// Delete Product from Cart
cartRouter.delete('/:productId', isAuth, cartController.deleteProduct)

//----------* EXPORT ROUTER *----------//
export default cartRouter
