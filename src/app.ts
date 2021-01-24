import { gql, IResolvers } from 'apollo-server-express'
import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { logger } from './logger'
import { createWebSocketAuthContext } from './context/auth/createWebSocketAuthContext'
import { errorHandler } from './context/error/errorHandler'
import { verifyConnectionParams } from './utils/verifyConnectionParams'
import { ErrorType } from './context/error/Error'

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
      const { error } = verifyConnectionParams(
        connectionParams as ExpressContext
      )
      if (error.type !== ErrorType.NONE) {
        errorHandler.handleError(error)
        throw new Error(error.type)
      }

      const auth = await createWebSocketAuthContext(
        connectionParams as ExpressContext
      )

      if (auth.error.type !== ErrorType.NONE) {
        errorHandler.handleError(auth.error)
        throw new Error(auth.error.type)
      }
    },
  },
}

export { appConfig }
