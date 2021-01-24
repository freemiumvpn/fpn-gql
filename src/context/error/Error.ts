import { AuthError } from '../auth/authError'

enum ErrorType {
  NONE = 'NONE',

  EXPRESS_MIDDLEWARE = 'EXPRESS_MIDDLEWARE',

  WEBSOCKET_CONNECTION_PARAMS = 'WEBSOCKET_CONNECTION_PARAMS',
}

type AppErrorType = AuthError | ErrorType

export { ErrorType, AppErrorType }
