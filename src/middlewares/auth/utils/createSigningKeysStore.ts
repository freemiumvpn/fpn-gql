import jose, { JSONWebKeySet } from 'jose'

import { ErrorHandler } from '../../error/ErrorHandler'
import { ErrorType } from '../../error/ErrorType'

interface KeyConfig {
  kid: string | null
  alg: string | null
  publicKey: string
  rsaPublicKey: string
  getPublicKey: () => string
}

const createSigningKeysStore = (
  jwks: JSONWebKeySet,
  errorHandler: ErrorHandler
): KeyConfig[] | void => {
  let keystore: jose.JWKS.KeyStore
  try {
    keystore = jose.JWKS.asKeyStore(jwks, { ignoreErrors: false })
    return keystore.all({ use: 'sig' }).map((key) => {
      return {
        kid: key.kid || null,
        alg: key.alg || null,
        get publicKey() {
          return key.toPEM(false)
        },
        get rsaPublicKey() {
          return key.toPEM(false)
        },
        getPublicKey() {
          return key.toPEM(false)
        },
      }
    })
  } catch (error) {
    errorHandler.handleError({
      type: ErrorType.AUTH_JSON_WEB_KEY_STORE,
      hint: "JOSE's store creation failed",
      source: error,
    })
  }
}

export { createSigningKeysStore, KeyConfig }
