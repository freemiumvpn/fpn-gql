import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jsonWebKeySet from 'jwks-rsa'

import getEnv from '../../env'

import createAuthContext, { ContextAuth } from './createAuthContext'
import createPublicKeyHandler from './createPublicKeyHandler'

const createWebSocketAuthContext = async (
  context: ExpressContext
): Promise<ContextAuth> => {
  const {
    auth0: { audience, uri },
  } = getEnv()

  return await createAuthContext({
    audience,
    algorithms: ['RS256'],
    publicKey: createPublicKeyHandler(jsonWebKeySet.expressJwtSecret, {
      jwksUri: uri,
      jwksRequestsPerMinute: 30,

      rateLimit: true,
      timeout: 30000, // 30s

      cache: true,
      cacheMaxEntries: 5, // Default value
      cacheMaxAge: 1800000, // 30m
    }),
  })(context)
}

export { createWebSocketAuthContext }
