import { AuthenticationError, gql, IResolvers } from 'apollo-server-express'
import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { createWebSocketAuthContext } from './context/auth/createWebSocketAuthContext'
import { verifyConnectionParams } from './utils/verifyConnectionParams'
import { ErrorType } from './middlewares/error/ErrorType'
import { errorHandler } from './middlewares/error/ErrorHandler'
import { logger } from './middlewares/logger/Logger'

const appConfig: ApolloServerExpressConfig = {
  resolvers: {
    ...pingModule.resolvers,
  } as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
  `,
  context: createContext,
  logger,
  subscriptions: {
    onConnect: async (connectionParams: unknown): Promise<void> => {
      const { error, context } = verifyConnectionParams(
        connectionParams as ExpressContext
      )
      if (error.type !== ErrorType.NONE) {
        errorHandler.handleError(error)
        throw new AuthenticationError(error.type)
      }

      const auth = await createWebSocketAuthContext(context)

      if (auth.error.type !== ErrorType.NONE) {
        errorHandler.handleError(auth.error)
        throw new AuthenticationError(auth.error.type)
      }
    },
  },
}

export { appConfig }
