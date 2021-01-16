import { Observable } from 'rxjs/internal/Observable'

type PromiseResolve<T> = (value: IteratorResult<T>) => void

function observableToIterator<T>(
  $: Observable<T>,
  handleError: (e: unknown) => void
): AsyncIterator<T> {
  const queue: IteratorResult<T>[] = []
  const deadLetterQueue: PromiseResolve<T>[] = []

  const onNext = (currentValue: T) => {
    /**
     * Deliver overdue requests
     * in FIFO fashion
     */
    const overdueEvent = deadLetterQueue.shift()
    if (overdueEvent) {
      return overdueEvent({
        done: false,
        value: currentValue,
      })
    }

    queue.push({
      done: false,
      value: currentValue,
    })
  }

  const onError = (e: unknown) => {
    handleError(e)
  }

  const onComplete = () => {
    while (deadLetterQueue.length) {
      const overdueEvent = deadLetterQueue.shift()
      if (overdueEvent) {
        overdueEvent({
          done: false,
          value: (void 0 as unknown) as T,
        })
      }
    }

    queue.push({
      done: true,
      value: (void 0 as unknown) as T,
    })
  }

  const subscription = $.subscribe(onNext, onError, onComplete)

  return {
    next() {
      const nextValue = queue.shift()
      if (nextValue) {
        return Promise.resolve(nextValue)
      }

      /**
       * Subscriber has exhausted the queue,
       * defer fulfillment to next queue pushes
       */
      return new Promise((resolve) => {
        deadLetterQueue.push(resolve)
      })
    },

    throw(error) {
      return Promise.resolve({
        done: true,
        value: Promise.reject(error),
      })
    },

    return() {
      subscription.unsubscribe()
      return Promise.resolve({ done: true, value: void 0 })
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // Async is not extendable by types
    [Symbol.asyncIterator]() {
      return this
    },
  }
}

export default observableToIterator
