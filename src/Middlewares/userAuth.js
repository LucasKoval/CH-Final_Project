//----------* VARIABLES *----------//
let isAdmin = false

//----------* USERAUTH MIDDLEWARE *----------//
const userAuth = {
  login: (req, res) => {
    isAdmin = true
    res.sendStatus(200)
  },

  logout: (req, res) => {
    isAdmin = false
    res.sendStatus(200)
  },

  adminAuth: (req, res, next) => {
    if (isAdmin) {
      next()
    } else {
      res.status(403).json({
        error: -1,
        description: `Route '${req.originalUrl}' method '${req.method}' not authorized.`,
      })
    }
  },
}
//----------* EXPORTS MIDDLEWARE *----------//
export default userAuth
