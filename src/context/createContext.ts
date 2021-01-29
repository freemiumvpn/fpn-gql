import { ExpressContext } from 'apollo-server-express'
import pino from 'pino'

import { auth } from '../middlewares/auth/Auth'
import { Token } from '../middlewares/auth/Token'
import { errorHandler, ErrorHandler } from '../middlewares/error/ErrorHandler'
import { logger } from '../middlewares/logger/Logger'

interface ContextApp {
  logger: pino.Logger
  error: ErrorHandler
  token: Token
}

const createContext = async (
  expressContext: ExpressContext
): Promise<ContextApp> => {
  const token = await auth.validateRequest(expressContext)

  return {
    logger,
    token,
    error: errorHandler,
  }
}

export { createContext as default, ContextApp }
