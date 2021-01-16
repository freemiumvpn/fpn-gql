import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

import { Resolvers } from '../../generated/graphql'
import observableToIterator from '../../utils/observableToIterator'

const createPing = (ping: number) =>
  `PING OK: ${ping} | ${new Date().toUTCString()}`

const ONE_SECOND = 1000
const interval$ = interval(ONE_SECOND).pipe(map((ping) => createPing(ping)))

const pingResolvers: Resolvers = {
  Query: {
    ping: (): string => createPing(1),
  },
  Subscription: {
    ping: {
      subscribe: (): AsyncIterator<string> => {
        const handleError = () => null // TODO move to context
        return observableToIterator(interval$, handleError)
      },
      resolve: (parent: string): string => {
        return parent
      },
    },
  },
}

export default pingResolvers
