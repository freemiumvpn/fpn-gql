import { gql, IResolvers } from 'apollo-server'

import pingModule from './modules/ping/ping.module'

const resolvers = {
  ...pingModule.resolvers,
} as IResolvers

const typeDefs = gql`
  ${pingModule.typeDefs}
`

export { resolvers, typeDefs }
