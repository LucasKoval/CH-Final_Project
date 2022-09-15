//----------* IMPORTS *----------//
import { Router } from 'express'
import usersController from '../Controllers/users-controller.js'

//----------* USERS ROUTES *----------//
const usersRouter = new Router()

// Create New User
usersRouter.post('/', usersController.create)

//----------* EXPORT ROUTER *----------//
export default usersRouter
