import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'

interface Auth0UserIdentity {
  connection: string
  provider: string
  userId: string
  isSocial: string
}

interface Auth0User {
  userId: string
  username: string
  email: string
  emailVerified: string
  identities: Auth0UserIdentity[]
}

interface AuthOptions {
  url: string
  audience: string
  clientId: string
  clientSecret: string
  grantType: string
}

/**
 * Auth0 api
 * see https://auth0.com/docs/api/management/v2#!/Users/get_users
 */
class Auth0Model {
  private accessToken: string | null = null

  constructor(private options: AuthOptions, private handler = fetch) {}

  private fetchAccessToken(): Promise<{
    accessToken: string
    tokenType: string
  }> {
    const url = `${this.options.url}/oauth/token`
    return this.handler(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
        audience: this.options.audience,
        grant_type: this.options.grantType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
        }
      })
  }

  private hasTokenExpired = (token: string) => {
    const decoded = jwt.decode(token)
    if (!decoded) return true

    const { exp } = decoded as Record<string, number>

    return Date.now() >= exp * 1000
  }

  private getAccessToken = async () => {
    if (this.accessToken && !this.hasTokenExpired(this.accessToken)) {
      return this.accessToken
    }

    const { accessToken } = await this.fetchAccessToken()
    this.accessToken = accessToken

    return accessToken
  }

  public getUser = async (userId: string): Promise<Auth0User> => {
    const token = await this.getAccessToken()
    const url = `${this.options.url}/api/v2/users/${userId}`

    return this.handler(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return {
          userId: data.user_id,
          username: data.username,
          email: data.email,
          emailVerified: data.email_verified,
          identities: data.identities.map((i: Record<string, string>) => ({
            connection: i.connection,
            provider: i.provider,
            userId: i.user_id,
            isSocial: i.isSocial,
          })),
        }
      })
  }
}

export { Auth0Model, AuthOptions }
