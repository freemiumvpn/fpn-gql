import { Observable } from 'rxjs/internal/Observable'
import { interval } from 'rxjs/internal/observable/interval'
import {
  debounceTime,
  tap,
  map,
  debounce,
  skipWhile,
  throttleTime,
} from 'rxjs/operators'
import { TestScheduler } from 'rxjs/testing'

import { Ping } from '../../generated/graphql'

const ONE_MINUTE = 1000 * 60
const createPingStream = (
  period: number = ONE_MINUTE,
  date: string = new Date().toUTCString(),
  scheduler?: TestScheduler
): Observable<Ping> => {
  return interval(period, scheduler).pipe(
    map<number, Ping>((count) => ({
      __typename: 'Ping',
      date,
      message: 'OK',
    }))
  )
}

const createDebouncedPingStream = (
  period: number,
  throttleDuration: number = ONE_MINUTE,
  date: string = new Date().toUTCString(),
  scheduler?: TestScheduler
): Observable<Ping> =>
  interval(period, scheduler).pipe(
    throttleTime(throttleDuration, scheduler),
    map<number, Ping>((count) => ({
      __typename: 'Ping',
      date,
      message: 'OK',
    }))
  )

export { createPingStream, createDebouncedPingStream }
