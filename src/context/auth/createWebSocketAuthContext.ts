import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

import { auth } from '../../auth/Auth'
import getEnv from '../../env'

import createAuthContext, { ContextAuth } from './createAuthContext'

const {
  auth0: { audience },
} = getEnv()

const createWebSocketAuthContext = async (
  context: ExpressContext
): Promise<ContextAuth> => {
  return await createAuthContext({
    audience,
    algorithms: ['RS256'],
    publicKey: async (kid: string) => {
      const { key } = await auth.getKey(kid)
      return key || ''
    },
  })(context)
}

export { createWebSocketAuthContext }
