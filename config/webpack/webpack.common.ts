import path from 'path'

import { Configuration } from 'webpack'
import DotEnv from 'dotenv-webpack'
import nodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import gqlRule from './rules/gqlRules'
import jsRule from './rules/jsRules'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const config: Configuration = {
  target: 'node12.14',
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
  externals: [{ processEnv: 'process.env' }, nodeExternals({})],
  plugins: [
    new DotEnv({
      safe: true, // load '.env.example' to verify
      allowEmptyValues: false,
      silent: false,
    }),
    new CleanWebpackPlugin(),
  ],
}

export default config
