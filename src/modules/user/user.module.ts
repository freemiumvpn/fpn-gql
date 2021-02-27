import userGql from './user.gql'
import { userResolvers } from './user.resolvers'

const userModule = {
  resolvers: userResolvers,
  typeDefs: userGql,
}

export default userModule
