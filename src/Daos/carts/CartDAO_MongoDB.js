import MongoDBContainer from '../../Classes/MongodbContainer.js'

class CartDAOMongoDB extends MongoDBContainer {
  constructor() {
    super('carts', {
      id: { type: Number, required: true },
      productos: { type: Array, required: false },
    })
  }
}

export default CartDAOMongoDB
