//----------* IMPORTS *----------//
import { Router } from 'express'
import cartController from '../Controllers/cartController.js'
const cartRouter = new Router()

//----------* CART ROUTES *----------//
// Get Cart List
cartRouter.get('/', cartController.cartList)

// Get Cart by ID
cartRouter.get('/:id', cartController.getCartById)

// Get Cart Product List
cartRouter.get('/:id/productos', cartController.cartProductList)

// Create New Cart
cartRouter.post('/', cartController.createNewCart)

// Add Product to Cart
cartRouter.post('/:id/productos/:id_prod', cartController.addProductToCart)

// Delete Product from Cart
cartRouter.delete('/:id/productos/:id_prod', cartController.deleteProductFromCart)

// Empty Cart
cartRouter.delete('/:id', cartController.emptyCart)

//----------* EXPORTS ROUTER *----------//
export default cartRouter
