import deepmerge from 'deepmerge'
import { gql, IResolvers } from 'apollo-server-express'
import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { logger } from './middlewares/logger/Logger'
import vpnModule from './modules/vpn/vpn.module'
import { auth } from './middlewares/auth/Auth'

const appConfig: ApolloServerExpressConfig = {
  resolvers: deepmerge.all([
    pingModule.resolvers,
    vpnModule.resolvers,
  ]) as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
    ${vpnModule.typeDefs}
  `,
  context: createContext,
  logger,
  subscriptions: {
    onConnect: async (connectionParams: unknown): Promise<unknown> => {
      const expressContext = ({
        connection: { context: connectionParams },
      } as unknown) as ExpressContext

      await auth.validateRequest(expressContext)

      return connectionParams
    },
  },
}

export { appConfig }
