import pino from 'pino'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jsonWebKeySet from 'jwks-rsa'

import getEnv from '../env'
import { logger } from '../logger'

import createAuthContext, { ContextAuth } from './auth/createAuthContext'
import createPublicKeyHandler from './auth/createPublicKeyHandler'
import { errorHandler, ErrorHandler } from './error/errorHandler'

interface ContextApp {
  auth: ContextAuth
  logger: pino.Logger
  error: ErrorHandler
}

const createContext = async (context: ExpressContext): Promise<ContextApp> => {
  const {
    auth0: { audience, uri },
  } = getEnv()
  const auth = await createAuthContext({
    audience,
    algorithms: ['RS256'],
    publicKey: createPublicKeyHandler(jsonWebKeySet.expressJwtSecret, {
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: uri,
    }),
  })(context)

  return {
    auth,
    logger,
    error: errorHandler,
  }
}

export { createContext as default, ContextApp }
