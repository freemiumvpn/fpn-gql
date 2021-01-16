import pingResolvers from './ping.resolvers'
import pingGql from './ping.gql'

const pingModule = {
  resolvers: pingResolvers,
  typeDefs: pingGql,
}

export default pingModule
