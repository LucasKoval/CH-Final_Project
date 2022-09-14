//----------* IMPORTS *----------//
import { Router } from 'express'
import cartController from '../Controllers/cart-controller.js'
import isAuth from '../Middlewares/isAuth.js'
const cartRouter = new Router()

//----------* CART ROUTES *----------//
// Get Cart Products
cartRouter.get('/', isAuth, cartController.getProducts)

// Add Product to Cart
cartRouter.post('/', isAuth, cartController.addProduct)

// Delete Product from Cart
cartRouter.delete('/:productId', isAuth, cartController.deleteProduct)

//----------* EXPORTS ROUTER *----------//
export default cartRouter
