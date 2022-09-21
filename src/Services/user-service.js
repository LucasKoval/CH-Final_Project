//----------* IMPORTS *----------//
import UserModel from '../Models/user-model.js'
import { usersDao } from '../Daos/users/index.js'
import cartService from './cart-service.js'
import tokenGenerator from '../Utils/token-generator.js'
import idGenerator from '../Utils/id-generator.js'
import encryptPass from '../Utils/encrypt-pass.js'

class UserService {
  #userModel
  #usersDao
  #cartService
  #tokenGenerator
  #idGenerator
  #encryptPass

  constructor(UserModel, usersDao, cartService, tokenGenerator, idGenerator, encryptPass) {
    this.#userModel = UserModel
    this.#usersDao = usersDao
    this.#cartService = cartService
    this.#tokenGenerator = tokenGenerator
    this.#idGenerator = idGenerator
    this.#encryptPass = encryptPass
  }

  create = async (req) => {
    try {
      await this.#userExist(req.body.email)

      const userModel = new this.#userModel(this.#idGenerator, this.#encryptPass, req.body)
      const userDto = await userModel.dto()

      const newUser = await this.#usersDao.create(userDto)
      if (!newUser)
        throw {
          message: 'Error creating user.',
          code: 'create_user_error',
          status: 500,
          expected: true,
        }

      const userCart = await this.#cartService.create(newUser.id)
      if (!userCart)
        throw {
          message: 'Error creating user cart.',
          code: 'create_cart_error',
          status: 500,
          expected: true,
        }

      const token = this.#tokenGenerator(newUser)

      return { id: newUser.id, username: newUser.email, token }
    } catch (error) {
      console.log({ error })
      if (!error.expected)
        error = {
          message: 'Error registering user.',
          code: 'register_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }

  #userExist = async (email) => {
    try {
      const user = await this.#usersDao.getByEmail(email)
      if (user)
        throw {
          message: 'Email already registered.',
          code: 'email_already_registered',
          status: 400,
          expected: true,
        }
      return false
    } catch (error) {
      throw error
    }
  }
}

const userService = new UserService(
  UserModel,
  usersDao,
  cartService,
  tokenGenerator,
  idGenerator,
  encryptPass
)

//----------* EXPORT SERVICE *----------//
export default userService
