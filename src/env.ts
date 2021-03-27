import path from 'path'

import * as uuid from 'uuid'
import dotenv from 'dotenv'

import memoise from './utils/memoise'

/**
 * process.env is made available through
 * webpack externals
 */
const processEnv = Object.getOwnPropertyNames(process.env).length
  ? process.env
  : require('processEnv')

const PATH_ROOT = path.resolve(__dirname, '..')

enum EnvVar {
  /**
   * AUTH0
   */
  AUTH0_URI = 'AUTH0_URI',
  AUTH0_ISSUER = 'AUTH0_ISSUER',
  AUTH0_JWKS = 'AUTH0_JWKS',
  AUTH0_AUDIENCE = 'AUTH0_AUDIENCE',
  AUTH0_AUDIENCE_IOS = 'AUTH0_AUDIENCE_IOS',
  AUTH0_AUDIENCE_WEB = 'AUTH0_AUDIENCE_WEB',

  /**
   * AUTH0 API
   */
  AUTH0_API_URL = 'AUTH0_API_URL',
  AUTH0_API_CLIENT_ID = 'AUTH0_API_CLIENT_ID',
  AUTH0_API_CLIENT_SECRET = 'AUTH0_API_CLIENT_SECRET',
  AUTH0_API_AUDIENCE = 'AUTH0_API_AUDIENCE',
  AUTH0_API_GRANT_TYPE = 'AUTH0_API_GRANT_TYPE',

  /**
   * APP
   */
  APP_URL = 'APP_URL',
  APP_PORT = 'APP_PORT',
  APP_SIGNED_URL_SECRET = 'APP_SIGNED_URL_SECRET',

  /**
   * GRPC
   */
  GRPC_VPN_ADDRESS = 'GRPC_VPN_ADDRESS',
}

interface Env {
  app: {
    url: string
    port: string
    signedUrlSecret: string
  }
  auth0: {
    uri: string
    audience: string[]
    issuer: string
    jwks: string
    api: {
      url: string
      clientId: string
      clientSecret: string
      audience: string
      grantType: string
    }
  }
  grpc: {
    vpn: string
  }
}

/**
 * Creates a unified config from
 * dot file envs and process envs
 */
const parseEnv = (
  env: NodeJS.ProcessEnv,
  keys: string[]
): Record<string, unknown> => {
  return keys.reduce((current, nextKey) => {
    if (!env[nextKey]) {
      return current
    }

    return {
      ...current,
      [nextKey]: env[nextKey],
    }
  }, {})
}

const createEnvVars = (rootPath: string = PATH_ROOT): Env => {
  const envConfig =
    dotenv.config({
      path: `${rootPath}/.env`,
    }).parsed || {}

  const env = parseEnv(processEnv, Object.keys(envConfig)) as Record<
    EnvVar,
    string
  >

  return {
    auth0: {
      uri: env.AUTH0_URI || '',
      audience: [
        env.AUTH0_AUDIENCE || '',
        env.AUTH0_AUDIENCE_IOS || '',
        env.AUTH0_AUDIENCE_WEB || '',
      ],
      issuer: env.AUTH0_ISSUER || '',
      jwks: env.AUTH0_JWKS || '',
      api: {
        url: env.AUTH0_API_URL || '',
        audience: env.AUTH0_API_AUDIENCE || '',
        clientId: env.AUTH0_API_CLIENT_ID || '',
        clientSecret: env.AUTH0_API_CLIENT_SECRET || '',
        grantType: env.AUTH0_API_GRANT_TYPE || '',
      },
    },
    app: {
      url: env.APP_URL || `http://localhost:${env.APP_PORT}`,
      port: env.APP_PORT || '',
      signedUrlSecret: env.APP_SIGNED_URL_SECRET || uuid.v4(),
    },
    grpc: {
      vpn: env.GRPC_VPN_ADDRESS || 'localhost:8989',
    },
  }
}

const getEnv = memoise(createEnvVars)

export { parseEnv, createEnvVars, getEnv }
