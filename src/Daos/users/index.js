//----------* IMPORTS *----------//
import config from '../../Config/mongodb.js'

//----------* CONFIG *----------//
let usersDao

switch (config.persistence) {
  case 'mongodb':
    const { default: usersDaoMongodb } = await import('./mongodb/users.mongodb.dao.js')
    const { default: mongooseUserModel } = await import('./mongodb/users.mongoose.model.js')
    usersDao = new usersDaoMongodb(mongooseUserModel)
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
export { usersDao }
