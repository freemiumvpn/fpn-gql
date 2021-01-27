import { AuthenticationError, gql, IResolvers } from 'apollo-server-express'
import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { verifyConnectionParams } from './utils/verifyConnectionParams'
import { ErrorType } from './middlewares/error/ErrorType'
import { errorHandler } from './middlewares/error/ErrorHandler'
import { logger } from './middlewares/logger/Logger'
import { auth } from './middlewares/auth/Auth'
import vpnModule from './modules/vpn/vpn.module'

interface SubscriptionContext {
  token?: string
}

const appConfig: ApolloServerExpressConfig = {
  resolvers: {
    ...pingModule.resolvers,
    ...vpnModule.resolvers,
  } as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
    ${vpnModule.typeDefs}
  `,
  context: createContext,
  logger,
  subscriptions: {
    onConnect: async (
      connectionParams: unknown
    ): Promise<SubscriptionContext> => {
      const { error, context } = verifyConnectionParams(
        connectionParams as ExpressContext
      )
      if (error.type !== ErrorType.NONE) {
        errorHandler.handleError(error)
        throw new AuthenticationError(error.type)
      }

      const authResponse = await auth.validateRequest(context)

      if (authResponse.error.type !== ErrorType.NONE) {
        errorHandler.handleError(authResponse.error)
        throw new AuthenticationError(authResponse.error.type)
      }

      return {
        token: authResponse.token,
      }
    },
  },
}

export { appConfig }
