import pino from 'pino'

import { logger } from '../logger'

import { errorHandler, ErrorHandler } from './error/errorHandler'

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
