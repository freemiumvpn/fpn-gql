import { getEnv } from '../../env'

import { Auth0Model } from './auth0.model'
import userGql from './user.gql'
import { userResolvers } from './user.resolvers'

const {
  auth0: { api },
} = getEnv()

const userModule = {
  models: {
    auth0: new Auth0Model({
      url: api.url,
      audience: api.audience,
      clientId: api.clientId,
      clientSecret: api.clientSecret,
      grantType: api.grantType,
    }),
  },
  resolvers: userResolvers,
  typeDefs: userGql,
}

export default userModule
