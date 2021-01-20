import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jsonWebKeySet from 'jwks-rsa'
import jwtExpress from 'express-jwt'

import { AuthError } from './authError'

/**
 * Uses jsonWebKeySet.expressJwtSecret to
 * infer the jwt secret from a public key.
 *
 * Since jsonWebKeySet is written for express,
 * we wrap around the handler to construct
 * a compatible signature.
 *
 * Links:
 * https://github.com/auth0/express-jwt/blob/master/lib/index.js#L97
 * https://github.com/auth0/node-jwks-rsa/blob/61d434324498c77e9d109bf3b7fb23976c93bb35/src/integrations/express.js#L30
 */
const createPublicKeyHandler = (
  handler: (
    options: jsonWebKeySet.ExpressJwtOptions
  ) => jwtExpress.SecretCallbackLong,
  options: jsonWebKeySet.ExpressJwtOptions
) => async (
  context: ExpressContext,
  decodedToken: string | { [key: string]: unknown }
): Promise<jwtExpress.secretType> => {
  const cb = handler(options)
  return new Promise<jwtExpress.secretType>((resolve, reject) => {
    if (!decodedToken || typeof decodedToken !== 'object') {
      return reject(
        new Error(AuthError.AUTHORIZATION_PUBLIC_KEY_HAS_NO_DECODED_TOKEN)
      )
    }

    if (!(decodedToken as Record<'header', unknown>).header) {
      return reject(
        new Error(
          AuthError.AUTHORIZATION_PUBLIC_KEY_HAS_NO_DECODED_TOKEN_HEADER
        )
      )
    }

    cb(
      context.req,
      (decodedToken as Record<'header', unknown>).header,
      void 0,
      (err, secret) => {
        if (err) {
          return reject(err)
        }

        if (!secret) {
          return reject(
            new Error(AuthError.AUTHORIZATION_PUBLIC_KEY_HAS_NO_SECRET)
          )
        }

        resolve(secret)
      }
    )
  })
}

export default createPublicKeyHandler
