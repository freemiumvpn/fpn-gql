import vpnGql from './vpn.gql'
import { vpnResolvers } from './vpn.resolvers'

const vpnModule = {
  resolvers: vpnResolvers,
  typeDefs: vpnGql,
}

export default vpnModule
