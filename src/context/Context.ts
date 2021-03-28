import { ExpressContext } from 'apollo-server-express'
import { Logger } from 'pino'

import { Auth } from '../middlewares/auth/Auth'
import { Token } from '../middlewares/auth/Token'
import { ErrorHandler } from '../middlewares/error/ErrorHandler'
import { Auth0Model } from '../modules/user/auth0.model'
import { VpnGrpc } from '../modules/vpn/vpn.grpc'

interface ContextApp {
  logger: Logger
  error: ErrorHandler
  auth: Auth
  sessionToken: Token
  models: {
    auth0: Auth0Model
    vpn: VpnGrpc
  }
}

class Context {
  constructor(private context: Omit<ContextApp, 'sessionToken'>) {}

  create = async (expressContext: ExpressContext): Promise<ContextApp> => {
    const token = await this.context.auth.validateRequest(expressContext)

    return {
      logger: this.context.logger,
      auth: this.context.auth,
      sessionToken: token,
      error: this.context.error,
      models: {
        auth0: this.context.models.auth0,
        vpn: this.context.models.vpn,
      },
    }
  }
}

export { Context, ContextApp }
