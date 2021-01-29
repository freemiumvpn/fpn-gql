import { ContextApp } from '../../context/createContext'
import {
  Resolvers,
  VpnSession,
  VpnSessionStatus,
} from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

import { vpnSession$ } from './vpn.streams'

const vpnResolvers: Resolvers<ContextApp> = {
  Mutation: {
    vpnCreateSession: (): VpnSessionStatus => {
      vpnSession$.next({
        __typename: 'VpnSession',
        id: '',
        status: VpnSessionStatus.Connected,
      })
      return VpnSessionStatus.Connected
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
