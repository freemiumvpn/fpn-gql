import { Resolvers } from '../../generated/graphql'

const pingResolvers: Resolvers = {
  Query: {
    ping: (): string => `PING, time: ${new Date().toISOString()}`,
  },
}

export default pingResolvers
