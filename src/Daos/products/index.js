import config from '../../Config/mongodb.js'

let productsDao

switch (config.persistence) {
  case 'mongodb':
    const { default: ProductsDaoMongodb } = await import('./mongodb/products.mongodb.dao.js')
    const { default: mongooseProductModel } = await import('./mongodb/products.mongoose.model.js')
    productsDao = new ProductsDaoMongodb(mongooseProductModel)
    break
  default:
    throw {
      message: `Persistence ${config.persistence} not implemented`,
      code: 'persistence_not_implemented',
      expected: true,
      status: 500,
    }
}

export { productsDao }
