import FirebaseContainer from '../../Classes/FirebaseContainer'

class ProductDAOFirebase extends FirebaseContainer {
  constructor() {
    super('products')
  }
}

export default ProductDAOFirebase
