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
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: uri,
    }),
  })(context)
}

export { createWebSocketAuthContext }
