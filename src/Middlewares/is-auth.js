//----------* IMPORTS *----------//
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//----------* CONFIG *----------//
dotenv.config()

const isAuth = (req, res, next) => {
  const headerAuthorization = req.headers['authorization'] || req.headers['Authorization'] || ''

  if (!headerAuthorization) {
    return res.status(401).json({
      message: 'An Authorization Bearer Token must be provided.',
      code: 'Authorization_token_required',
    })
  }

  const token = headerAuthorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Token required.',
      code: 'token_required',
      status: 401,
    })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(403).json({
      message: 'Not authorized. Invalid Token.',
      code: 'not_authorized',
      status: 403,
    })
  }

  next()
}

//----------* EXPORT MIDDLEWARE *----------//
export default isAuth
