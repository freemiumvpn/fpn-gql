import { gql, IResolvers } from 'apollo-server-express'
import { DocumentNode } from 'graphql'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

import pingModule from './modules/ping/ping.module'
import createContext, { ContextApp } from './context/createContext'

interface App {
  resolvers: IResolvers<unknown, ContextApp>
  typeDefs: DocumentNode
  context: (context: ExpressContext) => Promise<ContextApp>
}

const app: App = {
  resolvers: {
    ...pingModule.resolvers,
  } as IResolvers,
  typeDefs: gql`
    ${pingModule.typeDefs}
  `,
  context: createContext,
}

export { app as default }
