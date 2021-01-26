/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ErrorType } from '../context/error/Error'
import { ErrorHandler } from '../context/error/errorHandler'

import { Auth } from './Auth'

/**
 * This example key was taken from
 * https://github.com/panva/jose/blob/d9bc1b6d8a146a9d0a5640c0fdd4442065483c3c/docs/functions/_jwk_thumbprint_.calculatethumbprint.md#readme
 */
const jwks = {
  keys: [
    {
      kty: 'RSA',
      e: 'AQAB',
      kid: 'foo',
      n:
        '12oBZRhCiZFJLcPg59LkZZ9mdhSMTKAQZYq32k_ti5SBB6jerkh-WzOMAO664r_qyLkqHUSp3u5SbXtseZEpN3XPWGKSxjsy-1JyEFTdLSYe6f9gfrmxkUF_7DTpq0gn6rntP05g2-wFW50YO7mosfdslfrTJYWHFhJALabAeYirYD7-9kqq9ebfFMF4sRRELbv9oi36As6Q9B3Qb5_C1rAzqfao_PCsf9EPsTZsVVVkA5qoIAr47lo1ipfiBPxUCCNSdvkmDTYgvvRm6ZoMjFbvOtgyts55fXKdMWv7I9HMD5HwE9uW839PWA514qhbcIsXEYSFMPMV6fnlsiZvQQ',
    },
  ],
}

describe('AUTH', () => {
  it('should require signing keys', (done) => {
    const errorHandler = new ErrorHandler()
    errorHandler.subscribe({
      next: (e) => {
        const expected = {
          type: ErrorType.AUTH_CONSTRUCTOR,
          hint: 'Failed to provide signingKeys or signingKeysUri',
        }
        expect(e.type).toEqual(expected.type)
        expect(e.hint).toEqual(expected.hint)
        done()
        done()
      },
    })

    // @ts-ignore
    new Auth(void 0, void 0, errorHandler)
  })

  it('should should retrieve keys', async () => {
    const signingKeys = btoa(JSON.stringify(jwks))
    const signingKeysUri = 'foo'
    const errorHandler = new ErrorHandler()

    const auth = new Auth(signingKeys, signingKeysUri, errorHandler)

    const value = await auth.getKey('foo')
    expect(value.key).toBeTruthy()
  })
})
