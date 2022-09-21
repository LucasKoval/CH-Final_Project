//----------* IMPORTS *----------//
import config from '../../Config/mongodb.js'

//----------* CONFIG *----------//
let ordersDao

switch (config.persistence) {
  case 'mongodb':
    const { default: ordersDaoMongodb } = await import('./mongodb/orders.mongodb.dao.js')
    const { default: mongooseOrderModel } = await import('./mongodb/orders.mongoose.model.js')
    ordersDao = new ordersDaoMongodb(mongooseOrderModel)
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
export { ordersDao }
