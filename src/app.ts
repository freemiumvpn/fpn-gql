import deepmerge from 'deepmerge'
import { gql, IResolvers } from 'apollo-server-express'
import { ApolloServerExpressConfig } from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { logger } from './middlewares/logger/Logger'
import vpnModule from './modules/vpn/vpn.module'

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
}

export { appConfig }
