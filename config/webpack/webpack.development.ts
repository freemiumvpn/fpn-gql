import path from 'path'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpackMerge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

import commonConfig from './webpack.common'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [paths.src],
  externals: [nodeExternals({})],
  plugins: [new CleanWebpackPlugin()],
  watch: true,
}

const config = webpackMerge(commonConfig, devConfig)

export default config
