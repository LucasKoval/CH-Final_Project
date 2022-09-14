//----------* IMPORTS *----------//
import { Router } from 'express'
import ordersController from '../Controllers/orders-controller.js'
import isAuth from '../Middlewares/isAuth.js'
const ordersRouter = new Router()

//----------* ORDERS ROUTES *----------//
// Get All Orders
ordersRouter.get('/', isAuth, ordersController.getAll)

// Create New Order
ordersRouter.post('/', isAuth, ordersController.create)

//----------* EXPORTS ROUTER *----------//
export default ordersRouter
