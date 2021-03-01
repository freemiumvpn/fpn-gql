import { ContextApp } from '../../context/Context'
import { Resolvers, User } from '../../generated/graphql'

const userResolvers: Resolvers<ContextApp> = {
  Query: {
    user: async (_, args, context): Promise<User> => {
      const {
        userId,
        emailVerified,
        identities,
      } = await context.models.auth0.getUser(args.userId)

      const needsEmailVerification = identities.find(
        (i) => i.connection === 'Username-Password-Authentication'
      )

      return {
        __typename: 'User',
        id: userId,
        verified: needsEmailVerification ? Boolean(emailVerified) : true,
      }
    },
  },
}

export { userResolvers }
