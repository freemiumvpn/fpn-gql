import { GraphQLResolveInfo } from 'graphql'

import { SubscriptionObject } from '../../generated/graphql'

import pingResolvers from './ping.resolvers'

describe('Ping Resolvers', () => {
  describe('Query', () => {
    it('should ping', () => {
      const value =
        pingResolvers.Query &&
        pingResolvers.Query.ping &&
        (pingResolvers.Query as Record<'ping', () => string>).ping()

      expect(value).toMatch('PING OK')
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
      const argument = void 0
      const context = {}
      const info = {}

      const iterator = pingSubscription?.subscribe(
        parent,
        argument,
        context,
        info as GraphQLResolveInfo
      ) as AsyncIterator<unknown, unknown, undefined>

      const iteratorEvent = await iterator.next()
      const expected = 'PING OK'

      expect(iteratorEvent.done).toEqual(false)
      expect(iteratorEvent.value).toMatch(expected)
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