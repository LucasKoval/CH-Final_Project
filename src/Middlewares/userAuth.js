//----------* VARIABLES *----------//
let isAdmin = false

//----------* MIDDLEWARE FUNCTIONS *----------//
const login = (req, res) => {
  isAdmin = true
  res.sendStatus(200)
}

const logout = (req, res) => {
  isAdmin = false
  res.sendStatus(200)
}

const adminAuth = (req, res, next) => {
  if (isAdmin) {
    next()
  } else {
    res.status(403).json({
      error: -1,
      description: `Route '${req.originalUrl}' method '${req.method}' not authorized.`,
    })
  }
}

//----------* EXPORTS MIDDLEWARE *----------//
module.exports = {
  login,
  logout,
  adminAuth,
}
