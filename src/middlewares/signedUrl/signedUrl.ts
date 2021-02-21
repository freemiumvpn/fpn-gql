import signed from 'signed'

import { getEnv } from '../../env'

const env = getEnv()

const TWO_MINUTES = 60 * 2

/**
 * singed URL singleton
 */
const signedUrl = signed({
  secret: env.app.signedUrlSecret,
  ttl: TWO_MINUTES,
})

export { signedUrl }
