import { ExpressContext } from 'apollo-server-express'

import { ErrorType } from '../context/error/Error'

import { verifyConnectionParams } from './verifyConnectionParams'

describe('verifyConnectionParams', () => {
  it('verifies input', () => {
    const params = void 0
    const { error } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.WEBSOCKET_CONNECTION_PARAMS,
      hint: 'input should look like: params.req.headers.authorization',
    }

    expect(error).toEqual(expected)
  })

  it('allows authorization key', () => {
    const params = {
      authorization: 'foo',
    }

    const { error, context } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.NONE,
    }

    expect(error).toEqual(expected)
    expect(context).toEqual({
      req: {
        headers: {
          authorization: 'foo',
        },
      },
    })
  })

  it('verifies req', () => {
    const params = {
      req: void 0,
    }

    const { error } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.WEBSOCKET_CONNECTION_PARAMS,
      hint: 'input should look like: params.req.headers.authorization',
    }

    expect(error).toEqual(expected)
  })

  it('verifies headers', () => {
    const params = {
      req: {
        headers: void 0,
      },
    }

    const { error } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.WEBSOCKET_CONNECTION_PARAMS,
      hint: 'input should look like: params.req.headers.authorization',
    }

    expect(error).toEqual(expected)
  })

  it('verifies auth header', () => {
    const params = {
      req: {
        headers: {
          authorization: void 0,
        },
      },
    }

    const { error } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.WEBSOCKET_CONNECTION_PARAMS,
      hint: 'input should look like: params.req.headers.authorization',
    }

    expect(error).toEqual(expected)
  })

  it('should satisfy input', () => {
    const params = {
      req: {
        headers: {
          authorization: 'foo',
        },
      },
    }

    const { error } = verifyConnectionParams(
      (params as unknown) as ExpressContext
    )

    const expected = {
      type: ErrorType.NONE,
    }

    expect(error).toEqual(expected)
  })
})
