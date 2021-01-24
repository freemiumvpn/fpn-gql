import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

import { ContextApp } from '../../context/createContext'
import { Ping, Resolvers } from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

import { createDebouncedPingStream, createPingStream } from './ping.streams'

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
      subscribe: (_, args, context: ContextApp): AsyncIterator<Ping> => {
        const handleError = (e: Record<string, unknown>) => {
          // TODO move error handler to context
          context.logger.error(e)
        }

        return observableToIterator(
          createDebouncedPingStream(args && args.intervalMs),
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
