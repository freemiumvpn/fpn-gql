import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jwt, { Algorithm } from 'jsonwebtoken'
import jwtExpress from 'express-jwt'

import { AuthError } from './authError'

interface Error {
  type: AuthError
  hint?: string
  source?: string
}

export interface ContextAuth {
  error: Error
  token?: string
}

export interface CreateAuthContextOptions {
  audience: string
  /**
   * @deprecated
   * seems like issuer is not needed
   * for the jwt.verify stage?
   */
  issuer?: string
  algorithms: Algorithm[]
  secret?: jwtExpress.secretType
  publicKey?: (
    context: ExpressContext,
    decodedToken: string | { [key: string]: any }
  ) => Promise<jwtExpress.secretType>
}

const createAuthContext = (options: CreateAuthContextOptions) => async (
  context: ExpressContext
): Promise<ContextAuth> => {
  if (!options.secret && !options.publicKey) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_NO_SECRET_OR_PUBLIC_KEY_FOUND,
      },
    }
  }

  /**
   * Skip CORS
   */
  if (
    context.req &&
    context.req.method === 'OPTIONS' &&
    context.req.headers['access-control-request-headers'] &&
    context.req.headers['access-control-request-headers']
      .toLowerCase()
      .includes('authorization')
  ) {
    return {
      error: {
        type: AuthError.NONE,
      },
    }
  }

  const authorizationHeader = context.req && context.req.headers.authorization
  if (!authorizationHeader) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_HEADER_NOT_FOUND,
        hint: 'key req.headers.authorization not present',
      },
    }
  }

  const credentials = authorizationHeader.split(' ')
  if (credentials.length !== 2) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_HEADER_MALFORMED,
        hint: 'Valid Format: Bearer <token>',
      },
    }
  }

  const [authType, token] = credentials
  const hasBearerType = /^Bearer$/i.test(authType)
  if (!hasBearerType) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_AUTH_TYPE_INVALID,
        hint:
          'Bearer Type not supplied see https://tools.ietf.org/html/rfc6750',
      },
    }
  }

  let decodedToken
  try {
    decodedToken = jwt.decode(token, { complete: true }) || {}
  } catch (error) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_FAILED_TO_DECODE_TOKEN,
        hint: 'token is malformed',
      },
    }
  }

  /**
   * Resolve Secret
   */
  let secret = options.secret
  if (options.publicKey) {
    try {
      secret = await options.publicKey(context, decodedToken)
    } catch (error) {
      return {
        error: {
          type: AuthError.AUTHORIZATION_PUBLIC_KEY_FETCH_FAILED,
          hint: 'Failed to get secret from public key',
          source: error,
        },
      }
    }
  }

  if (!secret) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_NO_SECRET_FOUND,
        hint: 'Unable to resolve secret from options or public key',
      },
    }
  }

  try {
    jwt.verify(token, secret, {
      algorithms: options.algorithms,
      audience: options.audience,
    })
  } catch (error) {
    return {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source: JSON.stringify(error),
      },
    }
  }

  return {
    error: {
      type: AuthError.NONE,
    },
    token,
  }
}

export default createAuthContext
