//----------* IMPORTS *----------//
import { Router } from 'express'
import userAuthMW from '../Middlewares/userAuth.js'
const mainRouter = new Router()

//----------* CART ROUTES *----------//
// Admin User Login
mainRouter.get('/login', userAuthMW.login)

// Admin User Logout
mainRouter.get('/logout', userAuthMW.logout)

//----------* EXPORTS ROUTER *----------//
export default mainRouter
