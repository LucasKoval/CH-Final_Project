import MongoDBContainer from '../../Classes/MongodbContainer.js'

class ProductDAOMongoDB extends MongoDBContainer {
  constructor() {
    super('products', {
      id: { type: Number, required: true },
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      foto_url: { type: String, required: false },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
    })
  }
}

export default ProductDAOMongoDB
