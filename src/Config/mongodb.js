import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongodb: {
    cnxStr: process.env.CNX_STR,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}
