class ImageController {
  constructor() {}

  upload = async (req, res) => {
    try {
      res.status(201).json({
        status: 200,
        code: 'upload_success',
        public_url: `http://localhost:${req.socket.localPort}/images/${req.file.filename}`,
      })
    } catch (error) {
      res.status(error.status).json(error)
    }
  }
}

const imageController = new ImageController()

//----------* EXPORT CONTROLLER *----------//
export default imageController
