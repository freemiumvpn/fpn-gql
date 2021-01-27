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

      const authResponse = await auth.validateRequest(context)

      if (authResponse.error.type !== ErrorType.NONE) {
        errorHandler.handleError(authResponse.error)
        throw new AuthenticationError(authResponse.error.type)
      }
    },
  },
}

export { appConfig }
