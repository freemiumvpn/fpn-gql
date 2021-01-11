import { GraphQLResolveInfo } from 'graphql'

import {
  Account,
  QueryAccountByIdArgs,
  RequireFields,
  Resolvers,
} from '../../generated/gql'

const accountResolvers: Resolvers = {
  Account: {
    uuid: (
      parent: Account,
      args: unknown,
      context: unknown,
      info: GraphQLResolveInfo
    ): string => {
      return '2'
    },
    firstName: (
      parent: Account,
      args: unknown,
      context: unknown,
      info: GraphQLResolveInfo
    ): string => {
      return 'hello'
    },
    lastName: (
      parent: Account,
      args: unknown,
      context: unknown,
      info: GraphQLResolveInfo
    ): string => {
      return ''
    },
  },
  Query: {
    accountById: (
      parent: unknown,
      args: RequireFields<QueryAccountByIdArgs, 'uuid'>,
      context: unknown,
      info: GraphQLResolveInfo
    ): Account => {
      return {
        uuid: args.uuid,
        firstName: 'test',
        lastName: 'bo',
        __typename: 'Account',
      }
    },
  },
}

export default accountResolvers
