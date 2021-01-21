import path from 'path'

import webpackMerge from 'webpack-merge'
import { Configuration } from 'webpack'

import commonConfig from './webpack.common'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const prodConfig: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  entry: [paths.src],
}

const config = webpackMerge(commonConfig, prodConfig)

export default config
