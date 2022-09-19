class ChatController {
  constructor() {}

  show = async (req, res) => {
    try {
      res.render('chat_messages')
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

const chatController = new ChatController()

//----------* EXPORT CONTROLLER *----------//
export default chatController
