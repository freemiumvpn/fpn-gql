import { RuleSetRule } from 'webpack'

/**
 * Include gql files
 */
const gqlRule: RuleSetRule = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: [{ loader: 'graphql-tag/loader' }],
}

export default gqlRule
