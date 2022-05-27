import FirebaseContainer from '../../Classes/FirebaseContainer.js'

class ProductDAOFirebase extends FirebaseContainer {
  constructor() {
    super('products')
  }
}

export default ProductDAOFirebase
