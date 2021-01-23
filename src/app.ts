import { gql, IResolvers } from 'apollo-server-express'
import { ApolloServerExpressConfig } from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext from './context/createContext'
import { logger } from './logger'

const appConfig: ApolloServerExpressConfig = {
  resolvers: {
    ...pingModule.resolvers,
  } as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
  `,
  context: createContext,
  logger,
}

export { appConfig }
