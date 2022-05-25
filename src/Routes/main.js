//----------* REQUIRE'S *----------//
const { Router } = require('express')
const router = new Router()
const userAuthMW = require('../Middlewares/userAuth')

//----------* CART ROUTES *----------//
// Admin User Login
router.get('/login', userAuthMW.login)

// Admin User Logout
router.get('/logout', userAuthMW.logout)

//----------* EXPORTS ROUTER *----------//
module.exports = router
