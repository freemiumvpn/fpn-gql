import { ContextApp } from '../../context/createContext'
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
        args: RequireFields<SubscriptionPingArgs, 'minutes'>,
        context: ContextApp
      ): AsyncIterator<Ping> => {
        const handleError = (e: Record<string, unknown>) => {
          // TODO move error handler to context
          context.logger.error(e)
        }

        const pingMinutes = (args && args.minutes) || 1
        return observableToIterator(
          createDebouncedPingStream(pingMinutes * ONE_MINUTE_IN_MS),
          handleError
        )
      },
      resolve: (parent: Ping): Ping => {
        return parent
      },
    },
  },
}

export default pingResolvers
