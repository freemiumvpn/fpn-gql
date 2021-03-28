import deepmerge from 'deepmerge'
import { gql, IResolvers } from 'apollo-server-express'
import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import { logger } from './middlewares/logger/Logger'
import vpnModule from './modules/vpn/vpn.module'
import { auth } from './middlewares/auth/Auth'
import userModule from './modules/user/user.module'
import { VpnGrpc } from './modules/vpn/vpn.grpc'
import { errorHandler } from './middlewares/error/ErrorHandler'
import { Context } from './context/Context'
import { getEnv } from './env'

const env = getEnv()

const appConfig: ApolloServerExpressConfig = {
  logger,
  resolvers: deepmerge.all([
    pingModule.resolvers,
    vpnModule.resolvers,
    userModule.resolvers,
  ]) as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
    ${vpnModule.typeDefs}
    ${userModule.typeDefs}
  `,
  context: new Context({
    auth: auth,
    logger: logger,
    error: errorHandler,
    models: {
      auth0: userModule.models.auth0,
      vpn: new VpnGrpc(env.grpc.vpn),
    },
  }).create,
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
