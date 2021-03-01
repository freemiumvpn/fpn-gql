import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'

import { Auth0Model, AuthOptions } from './auth0.model'

describe('Auth0Model', () => {
  it('should get a user from auth0', async () => {
    const options: AuthOptions = {
      audience: 'foo',
      clientId: 'baz',
      clientSecret: 'gizmo',
      grantType: 'gizmodo',
      url: 'https://...',
    }

    const handler = jest.fn()
    const userId = 'userId'

    const model = new Auth0Model(options, (handler as unknown) as typeof fetch)

    handler
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              access_token: 'mocked token',
              token_type: 'token type',
            }),
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              user_id: 'user_id',
              username: 'username',
              email_verified: 'email_verified',
              identities: [
                {
                  connection: 'connection',
                  provider: 'provider',
                  user_id: 'user_id',
                  isSocial: 'isSocial',
                },
              ],
            }),
        })
      )

    const value = await model.getUser(userId)
    const expected = {
      userId: 'user_id',
      username: 'username',
      email: undefined,
      emailVerified: 'email_verified',
      identities: [
        {
          connection: 'connection',
          provider: 'provider',
          userId: 'user_id',
          isSocial: 'isSocial',
        },
      ],
    }

    expect(value).toEqual(expected)
  })

  it('should only fetch token once', async () => {
    const options: AuthOptions = {
      audience: 'foo',
      clientId: 'baz',
      clientSecret: 'gizmo',
      grantType: 'gizmodo',
      url: 'https://...',
    }

    const handler = jest.fn()

    const model = new Auth0Model(options, (handler as unknown) as typeof fetch)

    /**
     * Expedite Token
     */
    const ONE_HOUR_IN_SECONDS = 60 * 60
    const exp = new Date().getTime() / 1000 + ONE_HOUR_IN_SECONDS
    const token = jwt.sign({ foo: 'bar', exp }, 'Secret')

    handler
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              access_token: token,
              token_type: 'token type',
            }),
        })
      )
      .mockReturnValue(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              user_id: 'user_id',
              username: 'username',
              email_verified: 'email_verified',
              identities: [
                {
                  connection: 'connection',
                  provider: 'provider',
                  user_id: 'user_id',
                  isSocial: 'isSocial',
                },
              ],
            }),
        })
      )

    const userId = 'userId'
    await model.getUser(userId)
    const secondUserId = 'secondUserId'
    await model.getUser(secondUserId)

    const [tokenCall, apiCall, secondApiCall] = handler.mock.calls

    /**
     * First call, should retrieve token
     */
    const [url] = tokenCall
    expect(url).toEqual(`${options.url}/oauth/token`)

    const [apiUrl] = apiCall
    expect(apiUrl).toEqual(`${options.url}/api/v2/users/${userId}`)

    /**
     * Token is already stored, proceed to call API
     */
    const [secondApiUrl] = secondApiCall
    expect(secondApiUrl).toEqual(`${options.url}/api/v2/users/${secondUserId}`)
  })

  it('should only fetch token if expired', async () => {
    const options: AuthOptions = {
      audience: 'foo',
      clientId: 'baz',
      clientSecret: 'gizmo',
      grantType: 'gizmodo',
      url: 'https://...',
    }

    const handler = jest.fn()

    const model = new Auth0Model(options, (handler as unknown) as typeof fetch)

    /**
     * Expedite Token
     */
    const ONE_HOUR_IN_SECONDS = 60 * 60
    const exp = new Date().getTime() / 1000 - ONE_HOUR_IN_SECONDS
    const token = jwt.sign({ foo: 'bar', exp }, 'Secret')

    handler
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              access_token: token,
              token_type: 'token type',
            }),
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              user_id: 'user_id',
              username: 'username',
              email_verified: 'email_verified',
              identities: [
                {
                  connection: 'connection',
                  provider: 'provider',
                  user_id: 'user_id',
                  isSocial: 'isSocial',
                },
              ],
            }),
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              access_token: token,
              token_type: 'token type',
            }),
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          json: () =>
            Promise.resolve({
              user_id: 'user_id',
              username: 'username',
              email_verified: 'email_verified',
              identities: [
                {
                  connection: 'connection',
                  provider: 'provider',
                  user_id: 'user_id',
                  isSocial: 'isSocial',
                },
              ],
            }),
        })
      )

    const userId = 'userId'
    await model.getUser(userId)
    const secondUserId = 'secondUserId'
    await model.getUser(secondUserId)

    const [
      tokenCall,
      apiCall,
      secondTokenCall,
      secondApiCall,
    ] = handler.mock.calls

    /**
     * First call, should retrieve token
     */
    const [url] = tokenCall
    expect(url).toEqual(`${options.url}/oauth/token`)

    const [apiUrl] = apiCall
    expect(apiUrl).toEqual(`${options.url}/api/v2/users/${userId}`)

    /**
     * Token is stored but expired, refresh and call api
     */
    const [secondTokenUrl] = secondTokenCall
    expect(secondTokenUrl).toEqual(`${options.url}/oauth/token`)

    const [secondApiUrl] = secondApiCall
    expect(secondApiUrl).toEqual(`${options.url}/api/v2/users/${secondUserId}`)
  })
})
