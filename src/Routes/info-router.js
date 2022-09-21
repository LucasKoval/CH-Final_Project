//----------* IMPORTS *----------//
import { Router } from 'express'
import infoController from '../Controllers/info-controller.js'

//----------* INFO ROUTES *----------//
const infoRouter = new Router()

// Show Server Info
infoRouter.get('/', infoController.serverInfo)

//----------* EXPORT ROUTER *----------//
export default infoRouter
