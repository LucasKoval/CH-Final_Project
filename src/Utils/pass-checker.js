//----------* IMPORTS *----------//
import bcrypt from 'bcrypt'

const passChecker = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

//----------* EXPORT FUNCTION *----------//
export default passChecker
