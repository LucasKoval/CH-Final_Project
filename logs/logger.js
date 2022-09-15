//----------* IMPORTS *----------//
import dotenv from 'dotenv'
import log4js from 'log4js'

//----------* CONFIG *----------//
dotenv.config()
log4js.configure({
  appenders: {
    console: { type: 'console' },
    errorFile: { type: 'file', filename: './logs/error.log' },
    warnFile: { type: 'file', filename: './logs/warn.log' },
    loggerConsole: {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'info',
    },
    loggerErrorFile: {
      type: 'logLevelFilter',
      appender: 'errorFile',
      level: 'error',
    },
    loggerWarnFile: {
      type: 'logLevelFilter',
      appender: 'warnFile',
      level: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsole'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerErrorFile', 'loggerWarnFile'],
      level: 'all',
    },
  },
})

let logger = null
if (process.env.NODE_ENV === 'production') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}

//----------* EXPORT LOGGER *----------//
export default logger
