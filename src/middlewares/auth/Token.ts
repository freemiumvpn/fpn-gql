type DecodedToken = {
  header: {
    kid: string
  }
  payload: {
    sub: string
    scopes: string
  }
}

class Token {
  constructor(public token: string, public decodedToken: DecodedToken) {}

  public get scopes(): string[] {
    return this.decodedToken.payload.scopes.split('') || []
  }

  hasScopes(...scopes: string[]): boolean {
    for (const scope of scopes) {
      if (this.scopes.indexOf(scope) === -1) {
        return false
      }
    }
    return true
  }
}

export { Token, DecodedToken }
