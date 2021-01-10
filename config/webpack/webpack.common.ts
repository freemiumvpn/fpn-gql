import path from 'path'

import { Configuration } from 'webpack'

import jsRule from './rules/jsRules'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const config: Configuration = {
  module: {
    rules: [jsRule],
  },
  output: {
    chunkFilename: 'chunk.[name].[contenthash].js',
    path: paths.build,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  target: 'node12.14',
}

export default config
