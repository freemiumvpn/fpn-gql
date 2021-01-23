import pino from 'pino'

enum LoggerLevel {
  SILENT = 'silent',
  INFO = 'info',
  WARN = 'warn',
  TRACE = 'trace',
  ERROR = 'error',
  FATAL = 'fatal',
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
