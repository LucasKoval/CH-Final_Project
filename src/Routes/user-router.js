//----------* IMPORTS *----------//
import { Router } from 'express'
import userController from '../Controllers/user-controller.js'

//----------* USER ROUTES *----------//
const userRouter = new Router()

// Create New User
userRouter.post('/', userController.create)

//----------* EXPORT ROUTER *----------//
export default userRouter
