import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jsonWebKeySet from 'jwks-rsa'

import getEnv from '../env'

import createAuthContext, { ContextAuth } from './auth/createAuthContext'
import createPublicKeyHandler from './auth/createPublicKeyHandler'

export interface ContextApp {
  auth: ContextAuth
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
  }
}

export default createContext
