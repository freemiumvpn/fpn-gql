import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

import observableToIterator from './observableToIterator'

describe('observableToIterator', () => {
  it('should create an iterator', async () => {
    const $ = new BehaviorSubject('foo')
    const handleError = () => null
    const iterator = observableToIterator($, handleError)

    expect(iterator.next).toBeTruthy()
    expect(iterator.throw).toBeTruthy()
    expect(iterator.return).toBeTruthy()

    if (iterator.return) {
      await iterator.return()
    }
  })

  it('should consume initial value from iterator', async () => {
    const initialValue = 'foo'
    const handleError = () => null
    const $ = new BehaviorSubject(initialValue)

    const iterator = observableToIterator($, handleError)

    const iteratorNext = await iterator.next()

    expect(iteratorNext).toEqual({
      value: initialValue,
      done: false,
    })
  })

  it('should consume sequential values from iterator', async () => {
    const initialValue = 0
    const $ = new BehaviorSubject(initialValue)
    const handleError = () => null
    const iterator = observableToIterator($, handleError)

    // initial push
    const iteratorNext = await iterator.next()
    expect(iteratorNext).toEqual({
      value: initialValue,
      done: false,
    })

    // subsequent pushes
    const TEN_THOUSAND = 10000
    const values = [...Array(TEN_THOUSAND)].map(() => Math.random())

    values.forEach(async (value) => {
      $.next(value)
      const iteratorNext = await iterator.next()

      expect(iteratorNext).toEqual({
        value,
        done: false,
      })
    })

    if (iterator.return) {
      await iterator.return()
    }
  })

  it('should handle idle time', async () => {
    const initialValue = 0
    const handleError = () => null
    const $ = new BehaviorSubject(initialValue)
    const iterator = observableToIterator($, handleError)

    // initial push
    const iteratorNext = await iterator.next()
    expect(iteratorNext).toEqual({
      value: initialValue,
      done: false,
    })

    // request next without push
    const req1 = iterator.next()
    const req2 = iterator.next()
    const req3 = iterator.next()

    setTimeout(() => {
      // push
      $.next(1)
      $.next(2)
      $.next(3)
    }, 100)

    // wait for stack
    await Promise.resolve()

    req1.then((data) => {
      expect(data).toEqual({
        value: 1,
        done: false,
      })
    })

    req2.then((data) => {
      expect(data).toEqual({
        value: 2,
        done: false,
      })
    })

    req3.then((data) => {
      expect(data).toEqual({
        value: 3,
        done: false,
      })
    })

    if (iterator.return) {
      await iterator.return()
    }
  })

  it.todo('check complete')
  it.todo('verify error')
})
