import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jwt, { Algorithm } from 'jsonwebtoken'
import jwtExpress from 'express-jwt'

export enum AuthError {
  NONE = 'NONE',
  AUTHORIZATION_HEADER_NOT_FOUND = 'AUTHORIZATION_HEADER_NOT_FOUND',
  AUTHORIZATION_HEADER_MALFORMED = 'AUTHORIZATION_HEADER_MALFORMED',
  AUTHORIZATION_AUTH_TYPE_INVALID = 'AUTHORIZATION_AUTH_TYPE_INVALID',
  AUTHORIZATION_FAILED_TO_DECODE_TOKEN = 'AUTHORIZATION_FAILED_TO_DECODE_TOKEN',
  AUTHORIZATION_TOKEN_VERIFICATION_FAILED = 'AUTHORIZATION_TOKEN_VERIFICATION_FAILED',
  AUTHORIZATION_INTERCEPTOR_FAILED = 'AUTHORIZATION_INTERCEPTOR_FAILED',
}

interface Error {
  type: AuthError
  hint?: string
  source?: string
}

export interface ContextAuth {
  error: Error
  token?: string | { [key: string]: any }
}

interface AuthContextOptions {
  secret: jwtExpress.secretType
  audience: string
  issuer: string
  algorithms: Algorithm[]
  intercept?: (
    context: ExpressContext,
    decodedToken: string | { [key: string]: any }
  ) => Promise<void>
}

const createAuthContext = (options: AuthContextOptions) => async (
  context: ExpressContext
): Promise<ContextAuth> => {
  /**
   * Skip CORS
   */
  if (
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

  const authorizationHeader = context.req.headers.authorization
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

  if (options.intercept) {
    try {
      await options.intercept(context, decodedToken)
    } catch (error) {
      return {
        error: {
          type: AuthError.AUTHORIZATION_INTERCEPTOR_FAILED,
          hint: 'The provided interceptor has failed',
          source: error,
        },
      }
    }
  }

  try {
    jwt.verify(token, options.secret, {
      issuer: options.issuer,
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
    token: decodedToken,
  }
}

export default createAuthContext
