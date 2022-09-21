//----------* IMPORTS *----------//
import serverInfo from '../Config/server-info.js'

class InfoController {
  constructor() {}

  serverInfo = async (req, res) => {
    try {
      res.render('server_info', { layout: 'server', data: serverInfo })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

const infoController = new InfoController()

//----------* EXPORT CONTROLLER *----------//
export default infoController
