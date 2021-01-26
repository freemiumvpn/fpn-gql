import { AuthError } from '../auth/authError'

enum ErrorType {
  NONE = 'NONE',

  EXPRESS_MIDDLEWARE = 'EXPRESS_MIDDLEWARE',

  WEBSOCKET_CONNECTION_PARAMS = 'WEBSOCKET_CONNECTION_PARAMS',

  AUTH_CONSTRUCTOR = 'AUTH_CONSTRUCTOR',
  AUTH_KEY = 'AUTH_KEY',
  AUTH_JSON_WEB_KEY_STORE = 'AUTH_WEB_KEY_CLIENT',
}

type AppErrorType = AuthError | ErrorType

export { ErrorType, AppErrorType }
