import { Signature, SignatureVerification } from './Signature'

describe('Signature', () => {
  it('creates signed urls', () => {
    const options = {
      secret: 'foo',
      ttl: 1,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const signedUrl = signature.sign(url)

    const value = new URL(signedUrl)

    expect(value.searchParams.get('foo')).toBe('baz')
    expect(value.searchParams.get('baz')).toBe('gizmo')
  })

  it('isUrlVerified false', () => {
    const options = {
      secret: 'foo',
      ttl: 1,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const value = signature.isUrlVerified(url)
    expect(value).toBe(false)
  })

  it('isUrlVerified true', () => {
    const options = {
      secret: 'foo',
      ttl: 1,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const signedUrl = signature.sign(url)

    const value = signature.isUrlVerified(signedUrl)
    expect(value).toBe(true)
  })

  it('isUrlExpired false', () => {
    const options = {
      secret: 'foo',
      ttl: 600,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const signedUrl = signature.sign(url)

    const value = signature.isUrlExpired(signedUrl)
    expect(value).toBe(false)
  })

  it('isUrlExpired true', () => {
    const options = {
      secret: 'foo',
      ttl: -600,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const signedUrl = signature.sign(url)

    const value = signature.isUrlExpired(signedUrl)
    expect(value).toBe(true)
  })

  it('verify', () => {
    const options = {
      secret: 'foo',
      ttl: 600,
    }

    const signature = new Signature(options)
    const url = 'https://api.foo.com?foo=baz&baz=gizmo'
    const signedUrl = signature.sign(url)

    const value = signature.verify(signedUrl)
    expect(value).toBe(SignatureVerification.OK)
  })
})
