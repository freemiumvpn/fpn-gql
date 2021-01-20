import dotenv from 'dotenv'

import memoise from './memoise'

const parseEnv = (env: NodeJS.ProcessEnv, keys: string[]) => {
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

const createEnvVars = (rootPath: string): string => {
  const envConfig =
    dotenv.config({
      path: `${rootPath}/.env`,
    }).parsed || {}

  const parsedEnv = parseEnv(process.env, Object.keys(envConfig))

  return JSON.stringify({
    ...envConfig,
    ...parsedEnv,
  })
}

const getEnvVars = memoise(createEnvVars)

export default getEnvVars
