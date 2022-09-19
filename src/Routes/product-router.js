//----------* IMPORTS *----------//
import { Router } from 'express'
import productsController from '../Controllers/products-controller.js'
import isAuth from '../Middlewares/is-auth.js'
import isAdmin from '../Middlewares/is-admin.js'

//----------* PRODUCT ROUTES *----------//
const productRouter = new Router()

// Get All Products
productRouter.get('/', productsController.getAll)

// Get Product by ID
productRouter.get('/:id', productsController.getById)

// Add New Product
productRouter.post('/', isAuth, isAdmin, productsController.create)

// Edit Product by ID
productRouter.put('/:id', isAuth, isAdmin, productsController.updateById)

// Delete Product by ID
productRouter.delete('/:id', isAuth, isAdmin, productsController.deleteById)

//----------* EXPORT ROUTER *----------//
export default productRouter
