//----------* IMPORTS *----------//
import dotenv from 'dotenv'

//----------* CONFIG *----------//
dotenv.config()

const isAdmin = (req, res, next) => {
  if (req.user.email == process.env.ADMIN_EMAIL) next()
  else
    res.status(401).json({
      message: 'User not authorized to perform this operation.',
      code: 'not_authorized',
      status: 401,
    })
}

//----------* EXPORT MIDDLEWARE *----------//
export default isAdmin
