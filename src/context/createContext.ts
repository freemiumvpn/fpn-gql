import pino from 'pino'

import { errorHandler, ErrorHandler } from '../middlewares/error/ErrorHandler'
import { logger } from '../middlewares/logger/Logger'

interface ContextApp {
  logger: pino.Logger
  error: ErrorHandler
}

const createContext = async (): Promise<ContextApp> => {
  return {
    logger,
    error: errorHandler,
  }
}

export { createContext as default, ContextApp }
