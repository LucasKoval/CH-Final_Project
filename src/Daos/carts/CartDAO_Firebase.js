import FirebaseContainer from '../../Classes/FirebaseContainer.js'

class CartDAOFirebase extends FirebaseContainer {
  constructor() {
    super('carts')
  }
}

export default CartDAOFirebase
