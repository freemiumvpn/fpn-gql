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
    createSession: (): VpnSessionStatus => {
      vpnSession$.next({
        __typename: 'VpnSession',
        id: '',
        status: VpnSessionStatus.Connected,
      })
      return VpnSessionStatus.Connected
    },
    deleteSession: (): VpnSessionStatus => {
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
      subscribe: (
        _: Record<string | number | symbol, unknown>,
        args: Record<string | number | symbol, unknown>,
        context: ContextApp
      ): AsyncIterator<VpnSession> => {
        const handleError = (e: Record<string, unknown>) => {
          // TODO move error handler to context
          context.logger.error(e)
        }

        return observableToIterator(vpnSession$, handleError)
      },
      resolve: (parent: VpnSession): VpnSession => {
        return parent
      },
    },
  },
}

export { vpnResolvers }
