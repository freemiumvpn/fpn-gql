import path from 'path'

import webpackMerge from 'webpack-merge'
import { Configuration } from 'webpack'

import commonConfig from './webpack.common'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [paths.src],
  watch: true,
}

const config = webpackMerge(commonConfig, devConfig)

export default config
