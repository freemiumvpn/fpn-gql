import { GraphQLResolveInfo } from 'graphql'
import { of } from 'rxjs'

import { Ping, SubscriptionObject } from '../../generated/graphql'

import { pingResolvers } from './ping.resolvers'
import { createDebouncedPingStream } from './ping.streams'

/**
 * Mocks observable to return 1 ping,
 * the alternative would be to provide
 * the observables from within the context.
 */
jest.mock('./ping.streams.ts')
;(createDebouncedPingStream as jest.Mock).mockImplementation(() =>
  of({
    __typename: 'Ping',
    date: new Date().toUTCString(),
    message: 'OK',
  })
)

describe('Ping Resolvers', () => {
  describe('Query', () => {
    it('should ping', () => {
      const value =
        pingResolvers.Query &&
        pingResolvers.Query.ping &&
        (pingResolvers.Query as Record<'ping', () => Ping>).ping()

      expect(value?.message).toMatch('OK')
    })
  })

  describe('Subscription', () => {
    it('should subscribe to ping', async () => {
      const pingSubscription =
        pingResolvers.Subscription &&
        pingResolvers.Subscription.ping &&
        (pingResolvers.Subscription as Record<
          'ping',
          SubscriptionObject<unknown, string, unknown, unknown, unknown>
        >).ping

      const parent = void 0
      const argument = {
        minutes: 1,
      }
      const context = {}
      const info = {}

      const iterator = pingSubscription?.subscribe(
        parent,
        argument,
        context,
        info as GraphQLResolveInfo
      ) as AsyncIterator<Ping, Ping, undefined>

      const iteratorEvent = await iterator.next()
      const expected = 'OK'

      expect(iteratorEvent.done).toEqual(false)
      expect(iteratorEvent.value.message).toMatch(expected)
    })

    it('should resolve ping', () => {
      const pingSubscription =
        pingResolvers.Subscription &&
        pingResolvers.Subscription.ping &&
        (pingResolvers.Subscription as Record<
          'ping',
          SubscriptionObject<unknown, string, unknown, unknown, unknown>
        >).ping

      const parent = 'foo'
      const argument = void 0
      const context = {}
      const info = {}

      const value =
        pingSubscription &&
        pingSubscription.resolve &&
        pingSubscription.resolve(
          // Types from gql-codegen aren't very consistent:(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parent as any,
          argument,
          context,
          info as GraphQLResolveInfo
        )

      const expected = 'foo'

      expect(value).toEqual(expected)
    })
  })
})
