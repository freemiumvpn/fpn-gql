import { NextObserver, Subject, Subscription } from 'rxjs'

import { logger } from '../../logger'

import { AppErrorType } from './Error'

interface AppError {
  type: AppErrorType
  hint?: string
  source?: Error | string
}

class ErrorHandler {
  private reporter$ = new Subject<AppError>()

  public handleError = (error: AppError): void => {
    this.reporter$.next(error)
  }

  public subscribe = (listener: NextObserver<AppError>): Subscription =>
    this.reporter$.subscribe(listener)
}

/**
 * errorHandler is a singleton
 */
const errorHandler = new ErrorHandler()
errorHandler.subscribe({ next: (e) => logger.error(e) })

export { ErrorHandler, errorHandler, AppError }