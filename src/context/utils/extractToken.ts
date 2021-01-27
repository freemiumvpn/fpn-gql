import { ExpressContext } from 'apollo-server-express'

import { auth } from '../../middlewares/auth/Auth'

const extractToken = async (
  context: ExpressContext,
  validateRequest = auth.validateRequest
): Promise<string> => {
  let token = ''
  if (context.connection) {
    token = context.connection.context.token
  }

  if (context.req) {
    const authResponse = await validateRequest(context)
    if (authResponse.token) {
      token = authResponse.token
    }
  }

  return token
}

export { extractToken }
