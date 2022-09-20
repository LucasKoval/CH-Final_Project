//----------* IMPORTS *----------//
import LoginModel from '../Models/login-model.js'
import { usersDao } from '../Daos/users/index.js'
import tokenGenerator from '../Utils/token-generator.js'
import passChecker from '../Utils/pass-checker.js'

class LoginService {
  #LoginModel
  #usersDao
  #tokenGenerator
  #passChecker

  constructor(LoginModel, usersDao, tokenGenerator, passChecker) {
    this.#LoginModel = LoginModel
    this.#usersDao = usersDao
    this.#tokenGenerator = tokenGenerator
    this.#passChecker = passChecker
  }

  login = async (req) => {
    try {
      const LoginModel = new this.#LoginModel(req.body)
      const loginDto = LoginModel.dto
      const user = await this.#usersDao.getByEmail(loginDto.email)

      const login = await this.#passChecker(loginDto.password, user.password)
      if (!login) {
        throw {
          message: 'Invalid password.',
          code: 'invalid_password',
          status: 400,
          expected: true,
        }
      }

      const token = this.#tokenGenerator(user)

      return { id: user.id, username: user.email, token }
    } catch (error) {
      if (!error.expected)
        error = {
          message: 'Error logging in.',
          code: 'login_error',
          status: 500,
        }

      delete error.expected
      throw error
    }
  }
}

const loginService = new LoginService(LoginModel, usersDao, tokenGenerator, passChecker)

//----------* EXPORT SERVICE *----------//
export default loginService
