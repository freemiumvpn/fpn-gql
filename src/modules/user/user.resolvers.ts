import { ContextApp } from '../../context/createContext'
import { Resolvers, User } from '../../generated/graphql'

const userResolvers: Resolvers<ContextApp> = {
  Query: {
    user: (_, args): User => {
      return {
        __typename: 'User',
        emailVerified: true,
        id: args.userId,
      }
    },
  },
  Mutation: {
    userSendVerification: (): boolean => {
      return true
    },
  },
}

export { userResolvers }
