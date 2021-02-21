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
  AUTH0_AUDIENCE = 'AUTH0_AUDIENCE',
  AUTH0_ISSUER = 'AUTH0_ISSUER',
  AUTH0_JWKS = 'AUTH0_JWKS',

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
    audience: string
    issuer: string
    jwks: string
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
      audience: env.AUTH0_AUDIENCE || '',
      issuer: env.AUTH0_ISSUER || '',
      jwks: env.AUTH0_JWKS || '',
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
