//----------* REQUIRE'S *----------//
const { Router } = require('express')
const router = new Router()
const productController = require('../Controllers/productController')
const userAuthMW = require('../Middlewares/userAuth')

//----------* PRODUCT ROUTES *----------//
// Get Product List
router.get('/', productController.productList)

// Get Product by ID
router.get('/:id', productController.getProductById)

// Add New Product
router.post('/', userAuthMW.adminAuth, productController.addNewProduct)

// Edit Product by ID
router.put('/:id', userAuthMW.adminAuth, productController.editProduct)

// Delete Product by ID
router.delete('/:id', userAuthMW.adminAuth, productController.deleteProduct)

//----------* EXPORTS ROUTER *----------//
module.exports = router
