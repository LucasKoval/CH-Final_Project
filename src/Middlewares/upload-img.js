//----------* IMPORTS *----------//
import multer from 'multer'

const uploadImg = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1]
      cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
})

//----------* EXPORT MIDDLEWARE *----------//
export default uploadImg
