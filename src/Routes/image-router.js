//----------* IMPORTS *----------//
import { Router } from 'express'
import imageController from '../Controllers/image-controller.js'
import uploadImg from '../Middlewares/upload-img.js'

//----------* IMAGE ROUTES *----------//
const imageRouter = new Router()

// Upload a Single Image
imageRouter.post('/', uploadImg.single('image'), imageController.upload)

//----------* EXPORT ROUTER *----------//
export default imageRouter
