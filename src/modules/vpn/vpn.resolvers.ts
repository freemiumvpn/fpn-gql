import { ContextApp } from '../../context/Context'
import { getEnv } from '../../env'
import { Resolvers, Vpn } from '../../generated/graphql'
import { signedUrl } from '../../middlewares/signedUrl/signedUrl'

const {
  app: { url },
} = getEnv()

const vpnResolvers: Resolvers<ContextApp> = {
  Query: {
    vpn: async (parent, args, context): Promise<Vpn> => {
      if (!args.userId) {
        return {
          configuration: '',
          __typename: 'Vpn',
        }
      }

      const { identities, emailVerified } = await context.models.auth0.getUser(
        args.userId
      )

      const needsEmailVerification = identities.find(
        (i) => i.connection === 'Username-Password-Authentication'
      )

      if (needsEmailVerification && !emailVerified) {
        return {
          configuration: '',
          __typename: 'Vpn',
        }
      }

      const response = await context.models.vpn.createClient(args.userId)
      const configuration = response.getCredentials()

      return {
        configuration,
        __typename: 'Vpn',
      }
    },
    vpnSignedUrl: async (parent, args, context): Promise<string> => {
      const userId = context.sessionToken.decodedToken.payload.sub

      const downloadUrl = new URL(`${url}/vpn/download?userId=${userId}`)

      return signedUrl.sign(downloadUrl.href)
    },
  },
}

export { vpnResolvers }
