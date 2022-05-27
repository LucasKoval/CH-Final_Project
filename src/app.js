//----------* IMPORTS *----------//
import express from 'express'
import mainRouter from './Routes/main.js'
import productRouter from './Routes/products.js'
import cartRouter from './Routes/cart.js'

//----------* EXPRESS() *----------//
const app = express()

//----------* MIDDLEWARES *----------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//----------* ROUTES *----------//
app.use('/api', mainRouter)
app.use('/api/productos', productRouter)
app.use('/api/carritos', cartRouter)

// Not Implemented
/* app.all('*', (req, res) => {
   res.status(404).json({
      error: -2,
      description: `Route '${req.originalUrl}' method '${req.method}' not implemented.`,
   });
}) */

//----------* SERVER CONFIGURATION *----------//
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))
