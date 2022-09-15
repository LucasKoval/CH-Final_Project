//----------* IMPORTS *----------//
import bcrypt from 'bcrypt'

const encryptPass = async (password) => {
  return await bcrypt.hash(password, 5)
}

//----------* EXPORT FUNCTION *----------//
export default encryptPass
