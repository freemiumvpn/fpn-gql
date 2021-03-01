import { ContextApp } from '../../context/Context'
import {
  Ping,
  RequireFields,
  Resolvers,
  SubscriptionPingArgs,
} from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

import { createDebouncedPingStream, ONE_MINUTE_IN_MS } from './ping.streams'

const pingResolvers: Resolvers<ContextApp> = {
  Query: {
    ping: (): Ping => {
      return {
        __typename: 'Ping',
        date: new Date().toUTCString(),
        message: 'OK',
      }
    },
  },
  Subscription: {
    ping: {
      subscribe: (
        _: Record<string | number | symbol, unknown>,
        args: RequireFields<SubscriptionPingArgs, 'minutes'>
      ): AsyncIterator<Ping> => {
        const pingMinutes = (args && args.minutes) || 1
        return observableToIterator(
          createDebouncedPingStream(pingMinutes * ONE_MINUTE_IN_MS)
        )
      },
      resolve: (parent: Ping): Ping => {
        return parent
      },
    },
  },
}

export { pingResolvers }
