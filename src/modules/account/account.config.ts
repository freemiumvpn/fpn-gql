import { Resolvers } from '../../generated/gql'

import accountResolvers from './account.resolver'
import accountGql from './account.gql'

interface AccountConfig {
  resolvers: Resolvers
  gql: string
}

const accountConfig: AccountConfig = {
  resolvers: accountResolvers,
  gql: accountGql,
}

export default accountConfig
