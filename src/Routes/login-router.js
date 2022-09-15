//----------* IMPORTS *----------//
import { Router } from 'express'
import loginController from '../Controllers/login-controller.js'

//----------* LOGIN ROUTES *----------//
const loginRouter = new Router()

// Login User
loginRouter.post('/', loginController.login)

//----------* EXPORT ROUTER *----------//
export default loginRouter
