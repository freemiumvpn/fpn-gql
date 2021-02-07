import { ContextApp } from '../../context/createContext'
import getEnv from '../../env'
import {
  Resolvers,
  VpnCreateSessionResponse,
  VpnSession,
  VpnSessionStatus,
} from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

import { VpnGrpc } from './vpn.grpc'
import { vpnSession$ } from './vpn.streams'
const env = getEnv()

const vpnResolvers: Resolvers<ContextApp> = {
  Mutation: {
    vpnCreateSession: async (
      parent,
      args
    ): Promise<VpnCreateSessionResponse> => {
      vpnSession$.next({
        __typename: 'VpnSession',
        id: '',
        status: VpnSessionStatus.ConnectRequestSent,
      })

      try {
        const vpnGrpc = new VpnGrpc(env.grpc.vpn)
        const response = await vpnGrpc.createClient(args.request.userId)
        const credentials = response.getCredentials()

        const buff = Buffer.from(credentials, 'utf-8')
        const credentialsToBase64 = buff.toString('base64')

        return {
          __typename: 'VpnCreateSessionResponse',
          credentials: credentialsToBase64,
          status: VpnSessionStatus.ConnectRequestApproved,
        }
      } catch (error) {
        return {
          __typename: 'VpnCreateSessionResponse',
          credentials: '',
          status: VpnSessionStatus.ConnectRequestError,
        }
      }
    },
    vpnDeleteSession: (): VpnSessionStatus => {
      vpnSession$.next({
        __typename: 'VpnSession',
        id: '',
        status: VpnSessionStatus.Disconnected,
      })
      return VpnSessionStatus.Disconnected
    },
  },
  Subscription: {
    vpn: {
      subscribe: (): AsyncIterator<VpnSession> => {
        return observableToIterator(vpnSession$)
      },
      resolve: (parent: VpnSession): VpnSession => {
        return parent
      },
    },
  },
}

export { vpnResolvers }
