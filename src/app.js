//----------* IMPORTS *----------//
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import exphbs from 'express-handlebars'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import logger from '../logs/logger.js'
import config from './Config/mongodb.js'
import chatRouter from './Routes/chat-router.js'
import infoRouter from './Routes/info-router.js'
import loginRouter from './Routes/login-router.js'
import userRouter from './Routes/user-router.js'
import imageRouter from './Routes/image-router.js'
import productRouter from './Routes/product-router.js'
import cartRouter from './Routes/cart-router.js'
import orderRouter from './Routes/order-router.js'

//----------* EXPRESS() *----------//
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
dotenv.config()

//----------* VIEW ENGINE SETUP *----------//
app.set('view engine', '.handlebars')
app.set('views', dirname(fileURLToPath(import.meta.url)) + '/Views')
const hbs = exphbs.create({
  defaultLayout: 'index',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.handlebars',
})
app.engine('.handlebars', hbs.engine)

//----------* MIDDLEWARES *----------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//----------* MONGOOSE CONNECTION *----------//
try {
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options, () =>
    console.log('Mongoose is connected to DB!')
  )
} catch (error) {
  console.log('Mongoose could not connect.')
}
const dbConnection = mongoose.connection
dbConnection.on('error', (error) => console.log(`Connection error: ${error}`))

//----------* SOCKET IO *----------//
const chatMessages = []
io.on('connection', (socket) => {
  logger.info('New client connected!')

  socket.emit('messages', chatMessages)

  socket.on('message', (data) => {
    data.date = new Date().toLocaleString()
    chatMessages.push(data)
    io.emit('messages', chatMessages)
  })
})

//----------* ROUTES *----------//
app.use('/', chatRouter)
app.use('/info', infoRouter)
app.use('/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/images', imageRouter)
app.use('/api/products', productRouter)
app.use('/api/shoppingcartproducts', cartRouter)
app.use('/api/orders', orderRouter)
app.all('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    description: `Route '${req.originalUrl}' method '${req.method}' not implemented.`,
  })
})

//----------* SERVER CONFIGURATION *----------//
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
  logger.info(`Server listening on port ${server.address().port}`)
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => logger.error(`Server error: ${error}`))
