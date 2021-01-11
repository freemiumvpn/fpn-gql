import { ApolloServer, IResolvers } from 'apollo-server'
import { gql } from 'apollo-server'

import accountConfig from './modules/account/account.config'

const resolvers = {
  ...accountConfig.resolvers,
} as IResolvers

const typeDefs = gql`
  ${accountConfig.gql}
`

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}. `))
