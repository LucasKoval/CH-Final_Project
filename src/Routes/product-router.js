//----------* IMPORTS *----------//
import { Router } from 'express'
import productController from '../Controllers/product-controller.js'
import isAuth from '../Middlewares/is-auth.js'
import isAdmin from '../Middlewares/is-admin.js'

//----------* PRODUCT ROUTES *----------//
const productRouter = new Router()

// Get All Products
productRouter.get('/', productController.getAll)

// Get Product by ID
productRouter.get('/:id', productController.getById)

// Add New Product
productRouter.post('/', isAuth, isAdmin, productController.create)

// Edit Product by ID
productRouter.put('/:id', isAuth, isAdmin, productController.updateById)

// Delete Product by ID
productRouter.delete('/:id', isAuth, isAdmin, productController.deleteById)

//----------* EXPORT ROUTER *----------//
export default productRouter
