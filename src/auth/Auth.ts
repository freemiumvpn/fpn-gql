import { JSONWebKeySet } from 'jose'

import getEnv from '../env'
import { errorHandler, ErrorHandler } from '../middlewares/error/ErrorHandler'
import { ErrorType } from '../middlewares/error/ErrorType'

import {
  createSigningKeysStore,
  KeyConfig,
} from './utils/createSigningKeysStore'

class Auth {
  private keys: KeyConfig[] | void
  private errorHandler: ErrorHandler

  constructor(
    signingKeys: string,
    signingKeysUri: string,
    errorHandler: ErrorHandler
  ) {
    if (!signingKeys || !signingKeysUri) {
      throw errorHandler.handleError({
        type: ErrorType.AUTH_CONSTRUCTOR,
        hint: 'Failed to provide signingKeys or signingKeysUri',
        source: new Error(),
      })
    }
    this.errorHandler = errorHandler
    this.keys = this.createKeyStore(signingKeys)
  }

  private createKeyStore = (signingKeys: string): void | KeyConfig[] => {
    try {
      const buff = Buffer.from(signingKeys, 'base64')
      const jwks = JSON.parse(buff.toString('utf-8'))
      return createSigningKeysStore(jwks as JSONWebKeySet, this.errorHandler)
    } catch (error) {
      this.errorHandler.handleError({
        type: ErrorType.AUTH_JSON_WEB_KEY_STORE,
        hint: 'Failed to create key store',
        source: error,
      })
    }
  }

  public getKey = async (
    kid: string
  ): Promise<{
    key: string | null
    error: {
      type: ErrorType
      hint: string
      source: Error
    } | null
  }> => {
    if (!this.keys) {
      return {
        error: {
          type: ErrorType.AUTH_KEY,
          hint: 'Unable to find key store',
          source: new Error(),
        },
        key: null,
      }
    }

    const key = this.keys.find((k) => k.kid === kid)
    if (!key) {
      return {
        error: {
          type: ErrorType.AUTH_KEY,
          hint: 'Unable to find key in store',
          source: new Error(),
        },
        key: null,
      }
    }

    return {
      key: key.publicKey || key.rsaPublicKey,
      error: null,
    }
  }
}

/**
 * auth is a singleton
 */
const {
  auth0: { jwks, uri },
} = getEnv()

const auth = new Auth(jwks, uri, errorHandler)
export { Auth, auth }
