//----------* IMPORTS *----------//
import express from 'express'
import dotenv from 'dotenv'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import logger from '../logs/logger.js'
import uploadImg from './Middlewares/multer.js'
import loginRouter from './Routes/login-router.js'
import usersRouter from './Routes/users-router.js'
import productRouter from './Routes/products-router.js'
import cartRouter from './Routes/cart-router.js'
import ordersRouter from './Routes/orders-router.js'

//----------* EXPRESS() *----------//
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
dotenv.config()

//----------* VIEW ENGINE SETUP *----------//
const handlebarsConfig = {
  defaultLayout: 'index.html',
}
app.engine('handlebars', engine(handlebarsConfig))
app.set('view engine', 'handlebars')

//----------* MIDDLEWARES *----------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//----------* SOCKET IO *----------//
io.on('connection', (socket) => {
  try {
    app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
    console.log('New client connected!')
  } catch (error) {
    console.log(`Socket connection error: ${error}`)
  }
})

//----------* ROUTES *----------//
app.use('/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/shoppingcartproducts', cartRouter)
app.use('/api/orders', ordersRouter)
app.post('/api/images', uploadImg.single('image'), (req, res) => {
  res.status(200).json({
    status: 200,
    code: 'upload_img_success',
    public_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  })
})
app.all('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    description: `Route '${req.originalUrl}' method '${req.method}' not implemented.`,
  })
})

//----------* SERVER CONFIGURATION *----------//
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
  logger.log(`Server listening on port ${server.address().port}`)
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => logger.log(`Server error: ${error}`))
