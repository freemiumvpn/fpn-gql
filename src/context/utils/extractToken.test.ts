import { ExpressContext } from 'apollo-server-express'

import { Auth } from '../../middlewares/auth/Auth'

import { extractToken } from './extractToken'

describe('extractToken', () => {
  it('should extract from req', async () => {
    const context = {
      req: {},
    }

    const stub = () => ({ token: 'foo' })

    const value = await extractToken(
      context as ExpressContext,
      (stub as unknown) as Auth['validateRequest']
    )
    const expected = 'foo'

    expect(value).toEqual(expected)
  })

  it('should extract from connection', async () => {
    const context = {
      connection: {
        context: {
          token: 'foo',
        },
      },
    }

    const value = await extractToken(context as ExpressContext)
    const expected = 'foo'

    expect(value).toEqual(expected)
  })
})
