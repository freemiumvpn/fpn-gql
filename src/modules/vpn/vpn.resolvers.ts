import { ContextApp } from '../../context/Context'
import { getEnv } from '../../env'
import { Resolvers } from '../../generated/graphql'
import { signedUrl } from '../../middlewares/signedUrl/signedUrl'

const {
  app: { url },
} = getEnv()

const vpnResolvers: Resolvers<ContextApp> = {
  Query: {
    vpnSignedUrl: async (parent, args, context): Promise<string> => {
      const userId = context.sessionToken.decodedToken.payload.sub

      const downloadUrl = new URL(`${url}/vpn/download?userId=${userId}`)

      return signedUrl.sign(downloadUrl.href)
    },
  },
}

export { vpnResolvers }
