import { ContextApp } from '../../context/createContext'
import { Resolvers } from '../../generated/graphql'
import { signedUrl } from '../../middlewares/signedUrl/signedUrl'

const vpnResolvers: Resolvers<ContextApp> = {
  Query: {
    vpnSignedUrl: async (parent, args, context): Promise<string> => {
      const userId = context.token.decodedToken.payload.sub

      const url = new URL(`http://localhost:4000/vpn/download?userId=${userId}`)

      return signedUrl.sign(url.href)
    },
  },
}

export { vpnResolvers }
