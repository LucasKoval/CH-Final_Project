//----------* IMPORTS *----------//
import { Router } from 'express'
import loginController from '../Controllers/login-controller.js'
const loginRouter = new Router()

//----------* LOGIN ROUTES *----------//
// Login User
loginRouter.post('/', loginController.login)

//----------* EXPORTS ROUTER *----------//
export default loginRouter
