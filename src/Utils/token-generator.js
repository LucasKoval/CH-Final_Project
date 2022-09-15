//----------* IMPORTS *----------//
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenGenerator = ({ id, email, first_name, last_name, phone, image }) => {
  return jwt.sign({ id, email, first_name, last_name, phone, image }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXP_TIME,
  })
}

//----------* EXPORT FUNCTION *----------//
export default tokenGenerator
