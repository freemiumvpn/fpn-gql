import { configure } from 'rxjs-marbles/mocha'

import { Ping } from '../../generated/graphql'

import { createPingStream, createDebouncedPingStream } from './ping.streams'

const { marbles } = configure({ run: false })

describe('Ping Streams', () => {
  it(
    'should emit a ping interval',
    marbles((m) => {
      m.reframe(500, 3500)

      const expectedEvent: Record<string, Ping> = {
        a: {
          __typename: 'Ping',
          date: 'YYYY-MM-DD',
          message: 'OK',
        } as Ping,
        b: {
          __typename: 'Ping',
          date: 'YYYY-MM-DD',
          message: 'OK',
        } as Ping,
        c: {
          __typename: 'Ping',
          date: 'YYYY-MM-DD',
          message: 'OK',
        } as Ping,
      }

      const expected$ = m.cold('--a-b-c', expectedEvent)
      const value$ = createPingStream(1000, () => 'YYYY-MM-DD', m.scheduler)

      m.expect(value$).toBeObservable(expected$)
    })
  )

  it(
    'should debounce ping',
    marbles((m) => {
      m.reframe(100, 3000)

      const pingEvents: Record<string, Ping> = {
        x: {
          __typename: 'Ping',
          date: 'YYYY-MM-DD',
          message: 'OK',
        } as Ping,
      }

      // eslint-disable-next-line prettier/prettier
      const expected$ = m.hot('xx----x----x----x----x----x', pingEvents)
      const value$ = createDebouncedPingStream(
        100,
        500,
        () => 'YYYY-MM-DD',
        m.scheduler
      )

      m.expect(value$).toBeObservable(expected$)
    })
  )
})
