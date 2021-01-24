import { ExpressContext } from 'apollo-server-express'

import { ErrorType } from '../context/error/Error'
import { AppError } from '../context/error/errorHandler'

const verifyConnectionParams = (
  context: ExpressContext
): {
  error: AppError
} => {
  if (
    !context ||
    !context.req ||
    !context.req.headers ||
    !context.req.headers.authorization
  ) {
    return {
      error: {
        type: ErrorType.WEBSOCKET_CONNECTION_PARAMS,
        hint: 'input should look like: params.req.headers.authorization',
      },
    }
  }

  return {
    error: {
      type: ErrorType.NONE,
    },
  }
}

export { verifyConnectionParams }
