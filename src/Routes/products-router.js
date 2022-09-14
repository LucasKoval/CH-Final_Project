//----------* IMPORTS *----------//
import { Router } from 'express'
import productsController from '../Controllers/product-Controller.js'
import isAuth from '../Middlewares/isAuth.js'
import isAdmin from '../Middlewares/isAdmin.js'
const productsRouter = new Router()

//----------* PRODUCTS ROUTES *----------//
// Get All Products
productsRouter.get('/', productsController.getAll)

// Get Product by ID
productsRouter.get('/:id', productsController.getById)

// Add New Product
productsRouter.post('/', isAuth, isAdmin, productsController.create)

// Edit Product by ID
productsRouter.put('/:id', isAuth, isAdmin, productsController.updateById)

// Delete Product by ID
productsRouter.delete('/:id', isAuth, isAdmin, productsController.deleteById)

//----------* EXPORTS ROUTER *----------//
export default productsRouter
