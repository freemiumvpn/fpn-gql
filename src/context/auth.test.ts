import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jwt, { Algorithm } from 'jsonwebtoken'

import createAuthContext, { AuthError, ContextAuth } from './auth'

describe('Auth Context', () => {
  const options = {
    secret: 'foo',
    audience: 'baz',
    issuer: 'http://gizmodo',
    algorithms: ['HS256' as Algorithm],
    intercept: jest.fn(),
  }

  it('should skip CORS checks', async () => {
    const expressContext = {
      req: {
        method: 'OPTIONS',
        headers: {
          'access-control-request-headers': 'foo, baz,  authorization',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.NONE,
      },
    }

    expect(context).toEqual(expected)
  })

  it('should check auth header', async () => {
    const expressContext = {
      req: {
        headers: {},
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_HEADER_NOT_FOUND,
        hint: 'key req.headers.authorization not present',
      },
    }
    expect(context).toEqual(expected)
  })

  it('should check auth header format', async () => {
    const expressContext = {
      req: {
        headers: {
          authorization: 'foo',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_HEADER_MALFORMED,
        hint: 'Valid Format: Bearer <token>',
      },
    }
    expect(context).toEqual(expected)
  })

  it('should check auth header Bearer format', async () => {
    const expressContext = {
      req: {
        headers: {
          authorization: 'Basic foo',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_AUTH_TYPE_INVALID,
        hint:
          'Bearer Type not supplied see https://tools.ietf.org/html/rfc6750',
      },
    }
    expect(context).toEqual(expected)
  })

  it('should decode token', async () => {
    const expressContext = {
      req: {
        headers: {
          authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.yJ1c2VybmFtZSI6InNhZ3VpYXIiLCJpYXQiOjE0NzEwMTg2MzUsImV4cCI6MTQ3MzYxMDYzNX0.foo',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_FAILED_TO_DECODE_TOKEN,
        hint: 'token is malformed',
      },
    }
    expect(context).toEqual(expected)
  })

  it('should be able to intercept token', async () => {
    const options = {
      secret: 'foo',
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      intercept: jest.fn(),
    }

    const expressContext = {
      req: {
        headers: {
          authorization: 'Bearer foo',
        },
      },
    }

    await createAuthContext(options)(expressContext as ExpressContext)

    expect(options.intercept.mock.calls.length).toEqual(1)
  })

  it('should be able to check intercept errors', async () => {
    const options = {
      secret: 'foo',
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      intercept: jest.fn().mockImplementation(() => {
        throw new Error('Interceptor error')
      }),
    }

    const expressContext = {
      req: {
        headers: {
          authorization: 'Bearer foo',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_INTERCEPTOR_FAILED,
        hint: 'The provided interceptor has failed',
      },
    }

    expect(options.intercept.mock.calls.length).toEqual(1)
    expect(context.error.type).toEqual(expected.error.type)
    expect(context.error.hint).toEqual(expected.error.hint)
    expect(context.error.source).toBeTruthy()
  })

  it('should verify token', async () => {
    const expressContext = {
      req: {
        headers: {
          authorization: 'Bearer foo',
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source: '{"name":"JsonWebTokenError","message":"jwt malformed"}',
      },
    }

    expect(context).toEqual(expected)
  })

  it('should verify toke against secret', async () => {
    const incorrectSecret = 'baz'
    const token = jwt.sign({ foo: 'bar' }, incorrectSecret)

    const expressContext = {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source: '{"name":"JsonWebTokenError","message":"invalid signature"}',
      },
    }

    expect(context).toEqual(expected)
  })

  it('should check if token is expired', async () => {
    const exp = new Date('1970-12-12').getTime() / 1000
    const token = jwt.sign({ foo: 'bar', exp }, options.secret)

    const expressContext = {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source:
          '{"name":"TokenExpiredError","message":"jwt expired","expiredAt":"1970-12-12T00:00:00.000Z"}',
      },
    }

    expect(context).toEqual(expected)
  })

  it('should check if audience is incorrect', async () => {
    const incorrectAudience = 'gizmo'
    const token = jwt.sign(
      { foo: 'bar', aud: incorrectAudience },
      options.secret
    )

    const expressContext = {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source:
          '{"name":"JsonWebTokenError","message":"jwt audience invalid. expected: baz"}',
      },
    }

    expect(context).toEqual(expected)
  })

  it('should check if issuer is incorrect', async () => {
    const incorrectIssuer = 'http://gizmo'
    const token = jwt.sign(
      { foo: 'bar', aud: options.audience, iss: incorrectIssuer },
      options.secret
    )

    const expressContext = {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.AUTHORIZATION_TOKEN_VERIFICATION_FAILED,
        source:
          '{"name":"JsonWebTokenError","message":"jwt issuer invalid. expected: http://gizmodo"}',
      },
    }

    expect(context).toEqual(expected)
  })

  it('should return token', async () => {
    const token = jwt.sign(
      { foo: 'bar', aud: options.audience, iss: options.issuer },
      options.secret
    )

    const expressContext = {
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }

    const context = await createAuthContext(options)(
      expressContext as ExpressContext
    )

    const expected: ContextAuth = {
      error: {
        type: AuthError.NONE,
      },
    }

    expect(context.error).toEqual(expected.error)
    expect(context.token).toBeTruthy()
  })
})
