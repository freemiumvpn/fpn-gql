import { getEnv } from '../../env'

import { Signature } from './Signature'

const TWO_MINUTES = 60 * 2
const {
  app: { signedUrlSecret },
} = getEnv()

/**
 * singed URL singleton
 */
const signedUrl = new Signature({
  secret: signedUrlSecret,
  ttl: TWO_MINUTES,
})

export { signedUrl }
