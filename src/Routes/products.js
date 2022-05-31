//----------* IMPORTS *----------//
import { Router } from 'express'
import productController from '../Controllers/productController.js'
import userAuthMW from '../Middlewares/userAuth.js'
const productRouter = new Router()

//----------* PRODUCT ROUTES *----------//
// Get Product List
productRouter.get('/', productController.productList)

// Get Product by ID
productRouter.get('/:id', productController.getProductById)

// Add New Product
productRouter.post('/', userAuthMW.adminAuth, productController.addNewProduct)

// Edit Product by ID
productRouter.put('/:id', userAuthMW.adminAuth, productController.editProduct)

// Delete Product by ID
productRouter.delete('/:id', userAuthMW.adminAuth, productController.deleteProduct)

// Delete Product List
productRouter.delete('/', userAuthMW.adminAuth, productController.deleteProductList)

//----------* EXPORTS ROUTER *----------//
export default productRouter
