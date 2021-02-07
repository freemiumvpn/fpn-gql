import { ContextApp } from '../../context/createContext'
import getEnv from '../../env'
import {
  Resolvers,
  VpnCreateSessionResponse,
  VpnDeleteSessionResponse,
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
      try {
        vpnSession$.next({
          __typename: 'VpnSession',
          id: '',
          status: VpnSessionStatus.ConnectRequestSent,
        })

        const vpnGrpc = new VpnGrpc(env.grpc.vpn)
        const response = await vpnGrpc.createClient(args.request.userId)
        const credentials = response.getCredentials()

        const buff = Buffer.from(credentials, 'utf-8')
        const credentialsToBase64 = buff.toString('base64')

        vpnSession$.next({
          __typename: 'VpnSession',
          id: '',
          status: VpnSessionStatus.ConnectRequestApproved,
        })

        return {
          __typename: 'VpnCreateSessionResponse',
          credentials: credentialsToBase64,
          status: VpnSessionStatus.ConnectRequestApproved,
        }
      } catch (error) {
        vpnSession$.next({
          __typename: 'VpnSession',
          id: '',
          status: VpnSessionStatus.ConnectRequestError,
        })

        return {
          __typename: 'VpnCreateSessionResponse',
          credentials: '',
          status: VpnSessionStatus.ConnectRequestError,
        }
      }
    },
    vpnDeleteSession: async (
      parent,
      args
    ): Promise<VpnDeleteSessionResponse> => {
      try {
        vpnSession$.next({
          __typename: 'VpnSession',
          id: '',
          status: VpnSessionStatus.DeleteRequestSent,
        })

        const vpnGrpc = new VpnGrpc(env.grpc.vpn)
        await vpnGrpc.deleteClient(args.request.userId)

        return {
          __typename: 'VpnDeleteSessionResponse',
          status: VpnSessionStatus.DeleteRequestApproved,
        }
      } catch (error) {
        return {
          __typename: 'VpnDeleteSessionResponse',
          status: VpnSessionStatus.DeleteRequestError,
        }
      }
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
