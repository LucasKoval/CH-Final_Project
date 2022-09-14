//----------* IMPORTS *----------//
import dotenv from 'dotenv'
dotenv.config()

//----------* CONFIG *----------//
export default {
  mongodb: {
    cnxStr: process.env.MONGO_CNX_STR,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
}
