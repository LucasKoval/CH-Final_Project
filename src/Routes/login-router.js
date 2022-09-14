//----------* IMPORTS *----------//
import { Router } from 'express'
import loginController from '../../TEMP/Controllers/loginController.js'
const loginRouter = new Router()

//----------* LOGIN ROUTES *----------//
loginRouter.post('/', loginController.login)

//----------* EXPORTS ROUTER *----------//
export default loginRouter
