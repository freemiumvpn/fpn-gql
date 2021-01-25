/**
 * see https://auth0.com/blog/build-and-secure-a-graphql-server-with-node-js/
 */

import jsonWebKeySet from 'jwks-rsa'
import pino from 'pino'

import getEnv from '../../env'
import { logger } from '../../logger'
import { ErrorType } from '../error/Error'

class WebKeyClient {
  private client: jsonWebKeySet.JwksClient
  private store: Record<string, string> = {}
  private logger: pino.Logger

  constructor(uri: string, logger: pino.Logger) {
    this.client = jsonWebKeySet({
      jwksUri: uri,
      jwksRequestsPerMinute: 30,

      rateLimit: true,
      timeout: 30000, // 30s

      cache: true,
      cacheMaxEntries: 30, // Default value
      cacheMaxAge: 1800000, // 30m
    })
    this.logger = logger
  }

  private cache(key: string, value: string) {
    this.store[key] = value
    setTimeout(() => {
      this.store[key] = ''
    }, 1000 * 60 * 30) // 30 min
    this.logger.trace('[ WebKeyClient ] WRITE cache')
  }

  getKey = async (headerKid: string): Promise<string> => {
    if (this.store[headerKid]) {
      this.logger.trace('[ WebKeyClient ] READ cache')
      return this.store[headerKid]
    }

    return new Promise((resolve, reject) => {
      this.client.getSigningKey(headerKid, (error, key) => {
        if (error) {
          return reject(error)
        }

        try {
          const keyCast = (key as unknown) as Record<string, string>
          const signingKey = keyCast.publicKey || keyCast.rsaPublicKey
          this.cache(headerKid, signingKey)
          resolve(signingKey)
        } catch (error) {
          reject({
            type: ErrorType.AUTH_WEB_KEY_CLIENT,
            hint: 'Failed to get signing key',
            source: error,
          })
        }
      })
    })
  }
}

/**
 * webKeyClient is a singleton
 */
const {
  auth0: { uri },
} = getEnv()

const webKeyClient = new WebKeyClient(uri, logger)

export { WebKeyClient, webKeyClient }
