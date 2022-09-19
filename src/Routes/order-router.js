//----------* IMPORTS *----------//
import { Router } from 'express'
import ordersController from '../Controllers/orders-controller.js'
import isAuth from '../Middlewares/is-auth.js'

//----------* ORDER ROUTES *----------//
const orderRouter = new Router()

// Get All Orders
orderRouter.get('/', isAuth, ordersController.getAll)

// Create New Order
orderRouter.post('/', isAuth, ordersController.create)

//----------* EXPORT ROUTER *----------//
export default orderRouter
