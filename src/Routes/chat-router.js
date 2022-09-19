//----------* IMPORTS *----------//
import { Router } from 'express'
import chatController from '../Controllers/chat-controller.js'

//----------* CHAT ROUTES *----------//
const chatRouter = new Router()

// Show Chat Messages
chatRouter.get('/', chatController.show)

//----------* EXPORT ROUTER *----------//
export default chatRouter
