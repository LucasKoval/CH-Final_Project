//----------* IMPORTS *----------//
import { Router } from 'express'
import userAuthMW from '../Middlewares/userAuth'
const router = new Router()

//----------* CART ROUTES *----------//
// Admin User Login
router.get('/login', userAuthMW.login)

// Admin User Logout
router.get('/logout', userAuthMW.logout)

//----------* EXPORTS ROUTER *----------//
export default router
