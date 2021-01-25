import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

import getEnv from '../../env'

import createAuthContext, { ContextAuth } from './createAuthContext'
import { webKeyClient } from './webKeyClient'

const {
  auth0: { audience },
} = getEnv()

const createWebSocketAuthContext = async (
  context: ExpressContext
): Promise<ContextAuth> => {
  return await createAuthContext({
    audience,
    algorithms: ['RS256'],
    publicKey: webKeyClient.getKey,
  })(context)
}

export { createWebSocketAuthContext }
