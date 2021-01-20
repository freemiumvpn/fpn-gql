import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import jwt, { Algorithm } from 'jsonwebtoken'

import { AuthError } from './authError'
import createAuthContext, {
  ContextAuth,
  CreateAuthContextOptions,
} from './createAuthContext'

describe('createAuthContext', () => {
  const options: CreateAuthContextOptions = {
    audience: 'baz',
    issuer: 'http://gizmodo',
    algorithms: ['HS256' as Algorithm],
    secret: 'foo',
    publicKey: jest.fn(),
  }

  it('should check for secret or public key', async () => {
    const options = {
      audience: 'baz',
      issuer: 'http://gizmodo',
      algorithms: ['HS256' as Algorithm],
    }

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
        type: AuthError.AUTHORIZATION_NO_SECRET_OR_PUBLIC_KEY_FOUND,
      },
    }

    expect(context).toEqual(expected)
  })

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

  it('should be able to resolve public key', async () => {
    const options: CreateAuthContextOptions = {
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      publicKey: jest.fn(),
    }

    const expressContext = {
      req: {
        headers: {
          authorization: 'Bearer foo',
        },
      },
    }

    await createAuthContext(options)(expressContext as ExpressContext)

    expect((options.publicKey as jest.Mock).mock.calls.length).toEqual(1)
  })

  it('should be able to check public key errors', async () => {
    const options: CreateAuthContextOptions = {
      secret: 'foo',
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      publicKey: jest.fn().mockImplementation(() => {
        throw new Error('Public key fetch error')
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
        type: AuthError.AUTHORIZATION_PUBLIC_KEY_FETCH_FAILED,
        hint: 'Failed to get secret from public key',
      },
    }

    expect((options.publicKey as jest.Mock).mock.calls.length).toEqual(1)
    expect(context.error.type).toEqual(expected.error.type)
    expect(context.error.hint).toEqual(expected.error.hint)
    expect(context.error.source).toBeTruthy()
  })

  it('should verify toke against secret', async () => {
    const options: CreateAuthContextOptions = {
      secret: 'foo',
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      publicKey: jest.fn().mockImplementation(() => {
        return 'foo'
      }),
    }

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

  it.only('should check secret resolution', async () => {
    const options: CreateAuthContextOptions = {
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      publicKey: jest.fn().mockImplementation(() => {
        return void 0
      }),
    }

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
        type: AuthError.AUTHORIZATION_NO_SECRET_FOUND,
        hint: 'Unable to resolve secret from options or public key',
      },
    }

    expect(context).toEqual(expected)
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
    const options: CreateAuthContextOptions = {
      secret: 'foo',
      audience: 'baz',
      issuer: 'http://gizmo',
      algorithms: ['HS256' as Algorithm],
      publicKey: jest.fn().mockImplementation(() => {
        return 'foo'
      }),
    }

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
    const token = jwt.sign({ foo: 'bar', exp }, options.secret as string)

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
      options.secret as string
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
      options.secret as string
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
      options.secret as string
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