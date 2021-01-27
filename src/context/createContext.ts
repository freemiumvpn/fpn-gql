import { ExpressContext } from 'apollo-server-express'
import pino from 'pino'

import { errorHandler, ErrorHandler } from '../middlewares/error/ErrorHandler'
import { logger } from '../middlewares/logger/Logger'

import { extractToken } from './utils/extractToken'

interface ContextApp {
  logger: pino.Logger
  error: ErrorHandler
  token: string
}

const createContext = async (
  expressContext: ExpressContext
): Promise<ContextApp> => {
  const token = await extractToken(expressContext)

  return {
    logger,
    token,
    error: errorHandler,
  }
}

export { createContext as default, ContextApp }
