import { NextObserver, Subject, Subscription } from 'rxjs'

import { logger } from '../../logger'

import { ErrorType } from './ErrorType'

interface AppError {
  type: ErrorType
  hint?: string
  source?: Error | string
}

class ErrorHandler {
  private reporter$ = new Subject<AppError>()

  public handleError = (error: AppError): void => {
    this.reporter$.next({
      type: error.type,
      hint: error.hint,
      source: this.createErrorSource(error.source),
    })
  }

  public subscribe = (listener: NextObserver<AppError>): Subscription => {
    return this.reporter$.subscribe(listener)
  }

  private createErrorSource = (source: AppError['source']) => {
    if (!source) return ''

    return typeof source === 'object'
      ? JSON.stringify(source, Object.getOwnPropertyNames(source))
      : source
  }
}

/**
 * errorHandler is a singleton
 */
const errorHandler = new ErrorHandler()
errorHandler.subscribe({ next: (e) => logger.error(e) })

export { ErrorHandler, errorHandler, AppError }
