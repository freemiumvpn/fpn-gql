import { Observable } from 'rxjs/internal/Observable'
import { map, throttleTime } from 'rxjs/operators'
import { TestScheduler } from 'rxjs/testing'
import { interval } from 'rxjs/internal/observable/interval'

import { Ping } from '../../generated/graphql'

const ONE_MINUTE_IN_MS = 1000 * 60
const createPingStream = (
  period: number = ONE_MINUTE_IN_MS,
  date: string = new Date().toUTCString(),
  scheduler?: TestScheduler
): Observable<Ping> => {
  return interval(period, scheduler).pipe(
    map<number, Ping>(() => ({
      __typename: 'Ping',
      date,
      message: 'OK',
    }))
  )
}

const createDebouncedPingStream = (
  period: number,
  throttleDuration: number = ONE_MINUTE_IN_MS,
  date: string = new Date().toUTCString(),
  scheduler?: TestScheduler
): Observable<Ping> =>
  interval(period, scheduler).pipe(
    throttleTime(throttleDuration, scheduler),
    map<number, Ping>(() => ({
      __typename: 'Ping',
      date,
      message: 'OK',
    }))
  )

export { createPingStream, createDebouncedPingStream, ONE_MINUTE_IN_MS }
