//----------* IMPORTS *----------//
import { Router } from 'express'
import ordersController from '../Controllers/orders-controller.js'
import isAuth from '../Middlewares/isAuth.js'

//----------* ORDERS ROUTES *----------//
const ordersRouter = new Router()

// Get All Orders
ordersRouter.get('/', isAuth, ordersController.getAll)

// Create New Order
ordersRouter.post('/', isAuth, ordersController.create)

//----------* EXPORT ROUTER *----------//
export default ordersRouter
