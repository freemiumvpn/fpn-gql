import { ExpressContext } from 'apollo-server-express'

import { AppError } from '../middlewares/error/ErrorHandler'
import { ErrorType } from '../middlewares/error/ErrorType'

const verifyConnectionParams = (
  context: ExpressContext
): {
  error: AppError
  context: ExpressContext
} => {
  const c = (context as unknown) as Record<string, string>
  const authHeader = c && (c['Authorization'] || c['authorization'])

  if (authHeader) {
    const newContext = {
      req: {
        headers: {
          authorization: authHeader,
        },
      },
    }

    return {
      error: {
        type: ErrorType.NONE,
      },
      context: newContext as ExpressContext,
    }
  }

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
      context,
    }
  }

  return {
    error: {
      type: ErrorType.NONE,
    },
    context,
  }
}

export { verifyConnectionParams }
