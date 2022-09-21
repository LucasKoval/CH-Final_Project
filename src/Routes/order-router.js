//----------* IMPORTS *----------//
import { Router } from 'express'
import orderController from '../Controllers/order-controller.js'
import isAuth from '../Middlewares/is-auth.js'

//----------* ORDER ROUTES *----------//
const orderRouter = new Router()

// Get All Orders
orderRouter.get('/', isAuth, orderController.getAll)

// Create New Order
orderRouter.post('/', isAuth, orderController.create)

//----------* EXPORT ROUTER *----------//
export default orderRouter
