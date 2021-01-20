import path from 'path'

import dotenv from 'dotenv'

import memoise from './utils/memoise'

const PATH_ROOT = path.resolve(__dirname, '..')

enum EnvVar {
  AUTH0_URI = 'AUTH0_URI',
  AUTH0_AUDIENCE = 'AUTH0_AUDIENCE',
  AUTH0_ISSUER = 'AUTH0_ISSUER',

  APP_PORT = 'APP_PORT',
}

interface Env {
  app: {
    port: string
  }
  auth0: {
    uri: string
    audience: string
    issuer: string
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

  const env = parseEnv(process.env, Object.keys(envConfig)) as Record<
    EnvVar,
    string
  >

  return {
    auth0: {
      uri: env.AUTH0_URI || '',
      audience: env.AUTH0_AUDIENCE || '',
      issuer: env.AUTH0_ISSUER || '',
    },
    app: {
      port: env.APP_PORT || '',
    },
  }
}

const getEnv = memoise(createEnvVars)

export { parseEnv, createEnvVars, getEnv as default }
