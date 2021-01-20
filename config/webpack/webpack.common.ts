import path from 'path'

import { Configuration } from 'webpack'
import DotEnv from 'dotenv-webpack'

import gqlRule from './rules/gqlRules'
import jsRule from './rules/jsRules'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const config: Configuration = {
  module: {
    rules: [jsRule, gqlRule],
  },
  output: {
    path: paths.build,
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.graphql', '.gql'],
  },
  target: 'node12.14',
  plugins: [
    new DotEnv({
      safe: true, // load '.env.example' to verify
      allowEmptyValues: false,
      silent: false,
    }),
  ],
}

export default config
