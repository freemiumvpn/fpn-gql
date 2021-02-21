import { createHash } from 'crypto'

import * as uuid from 'uuid'

interface SignatureOptions {
  secret: string
  /**
   * TTL in seconds
   */
  ttl: number
}

enum SignatureParams {
  ID = 'signature_id',
  EXPIRY_DATE = 'signature_expiry_date',
  DIGEST = 'signature_digest',
}

enum SignatureVerification {
  OK,
  EXPIRED,
  FORBIDDEN,
}

class Signature {
  private secret: string
  private ttl: number

  constructor(options: SignatureOptions) {
    this.secret = options.secret
    this.ttl = options.ttl
  }

  private ttlToExpiryDate = (ttl: number): string => {
    return String(Math.ceil(+new Date() / 1000) + ttl)
  }

  private createHash = (data: string) => {
    const hash = createHash('md5')
    hash.update(data, 'utf8')
    hash.update(this.secret)
    return hash
  }

  private removeUrlProtocol = (url: string) => {
    return url.replace('https://', '').replace('http://', '')
  }

  private toBase64 = (input: string): string => {
    const buff = Buffer.from(input, 'utf-8')
    return buff.toString('base64')
  }

  sign = (urlToBeSigned: string): string => {
    const url = new URL(urlToBeSigned)
    url.searchParams.append(this.toBase64(SignatureParams.ID), uuid.v4())
    url.searchParams.append(
      this.toBase64(SignatureParams.EXPIRY_DATE),
      this.ttlToExpiryDate(this.ttl)
    )

    const hash = this.createHash(this.removeUrlProtocol(url.href))

    url.searchParams.append(
      this.toBase64(SignatureParams.DIGEST),
      hash.digest('hex')
    )

    return url.href
  }

  isUrlVerified = (urlToBeVerified: string): boolean => {
    const url = new URL(urlToBeVerified)

    const digest = url.searchParams.get(this.toBase64(SignatureParams.DIGEST))
    url.searchParams.delete(this.toBase64(SignatureParams.DIGEST))

    const hash = this.createHash(this.removeUrlProtocol(url.href))
    const hashDigest = hash.digest('hex')

    return digest === hashDigest
  }

  isUrlExpired = (urlToBeVerified: string): boolean => {
    const url = new URL(urlToBeVerified)

    const expiration = url.searchParams.get(
      this.toBase64(SignatureParams.EXPIRY_DATE)
    )

    return Number(expiration) < Math.ceil(+new Date() / 1000)
  }

  verify = (url: string): SignatureVerification => {
    if (!this.isUrlVerified(url)) {
      return SignatureVerification.FORBIDDEN
    }

    if (this.isUrlExpired(url)) {
      return SignatureVerification.EXPIRED
    }

    return SignatureVerification.OK
  }
}

export { Signature, SignatureVerification }
