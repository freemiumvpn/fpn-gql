import pino from 'pino'

enum LoggerLevel {
  SILENT = 'silent',
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace',
}

const logger = pino({
  level: LoggerLevel.TRACE,
  prettyPrint: {
    translateTime: true,
  },
})

/**
 * logger is a singleton
 */
export { logger, LoggerLevel }
