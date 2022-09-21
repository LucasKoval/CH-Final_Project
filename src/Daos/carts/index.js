//----------* IMPORTS *----------//
import config from '../../Config/mongodb.js'

//----------* CONFIG *----------//
let cartDao

switch (config.persistence) {
  case 'mongodb':
    const { default: CartDaoMongodb } = await import('./mongodb/carts.mongodb.dao.js')
    const { default: mongooseCartModel } = await import('./mongodb/carts.mongoose.model.js')
    cartDao = new CartDaoMongodb(mongooseCartModel)
    break
  default:
    throw {
      message: `Persistencia ${config.persistence} no implementada.`,
      code: 'persistence_not_implemented',
      expected: true,
      status: 500,
    }
}

//----------* EXPORT DAO *----------//
export { cartDao }
