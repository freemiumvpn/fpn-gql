import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

import { ContextApp } from '../../context/createContext'
import { Ping, Resolvers } from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

const createPing = (count: number): Ping => ({
  __typename: 'Ping',
  count,
  date: new Date().toUTCString(),
  message: 'OK',
})

const ONE_SECOND = 1000
const interval$ = interval(ONE_SECOND).pipe(map((ping) => createPing(ping)))

const pingResolvers: Resolvers<ContextApp> = {
  Query: {
    ping: (): Ping => {
      return {
        __typename: 'Ping',
        date: new Date().toUTCString(),
        count: 1,
        message: 'OK',
      }
    },
  },
  Subscription: {
    ping: {
      subscribe: (_, __, context): AsyncIterator<Ping> => {
        const handleError = (e: Record<string, unknown>) => {
          // TODO move error handler to context
          context.logger.error(e)
        }

        return observableToIterator(interval$, handleError)
      },
      resolve: (parent: Ping): Ping => {
        return parent
      },
    },
  },
}

export default pingResolvers
