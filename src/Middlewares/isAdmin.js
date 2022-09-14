import dotenv from 'dotenv'
dotenv.config()

const isAdmin = (req, res, next) => {
  if (req.user.email == process.env.ADMIN_EMAIL) next()
  else
    res
      .status(401)
      .json({
        message: 'No autorizado para realizar esta operación.',
        code: 'not_authorized',
        status: 401,
      })
}

export default isAdmin
