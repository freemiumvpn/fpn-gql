import { JSONWebKeySet } from 'jose'

import { ErrorHandler } from '../../middlewares/error/ErrorHandler'
import { ErrorType } from '../../middlewares/error/ErrorType'

import { createSigningKeysStore } from './createSigningKeysStore'

describe('createSigningKeysStore', () => {
  it('should notify on errors', (done) => {
    const errorHandler = new ErrorHandler()
    errorHandler.subscribe({
      next: (e) => {
        const expected = {
          type: ErrorType.AUTH_JSON_WEB_KEY_STORE,
          hint: "JOSE's store creation failed",
        }
        expect(e.type).toEqual(expected.type)
        expect(e.hint).toEqual(expected.hint)
        done()
      },
    })

    const jwks = {} as JSONWebKeySet
    createSigningKeysStore(jwks, errorHandler)
  })

  it('should be undefined on errors', () => {
    const errorHandler = new ErrorHandler()
    const jwks = {} as JSONWebKeySet

    const value = createSigningKeysStore(jwks, errorHandler)
    const expected = void 0

    expect(value).toEqual(expected)
  })

  it('should create key store', () => {
    const errorHandler = new ErrorHandler()
    // const jwks = {} as JSONWebKeySet

    /**
     * This example key was taken from
     * https://github.com/panva/jose/blob/d9bc1b6d8a146a9d0a5640c0fdd4442065483c3c/docs/functions/_jwk_thumbprint_.calculatethumbprint.md#readme
     */
    const jwks = {
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          n:
            '12oBZRhCiZFJLcPg59LkZZ9mdhSMTKAQZYq32k_ti5SBB6jerkh-WzOMAO664r_qyLkqHUSp3u5SbXtseZEpN3XPWGKSxjsy-1JyEFTdLSYe6f9gfrmxkUF_7DTpq0gn6rntP05g2-wFW50YO7mosfdslfrTJYWHFhJALabAeYirYD7-9kqq9ebfFMF4sRRELbv9oi36As6Q9B3Qb5_C1rAzqfao_PCsf9EPsTZsVVVkA5qoIAr47lo1ipfiBPxUCCNSdvkmDTYgvvRm6ZoMjFbvOtgyts55fXKdMWv7I9HMD5HwE9uW839PWA514qhbcIsXEYSFMPMV6fnlsiZvQQ',
        },
      ],
    } as JSONWebKeySet

    const store = createSigningKeysStore(jwks, errorHandler)
    expect(store).toBeTruthy()
    expect(store).toHaveLength(1)
    if (!store) return

    const [value] = store
    expect(value.kid).toBeTruthy()
    expect(value.publicKey).toBeTruthy()
    expect(value.rsaPublicKey).toBeTruthy()
    expect(value.getPublicKey).toBeTruthy()
  })
})
