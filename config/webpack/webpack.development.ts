import path from 'path'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpackMerge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import webpack, { Configuration } from 'webpack'

import commonConfig from './webpack.common'
import createWebpackPaths from './utils/createWebpackPaths'

const PATH_ROOT = path.resolve(__dirname, '..', '..')
const paths = createWebpackPaths(PATH_ROOT)

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', paths.src],
  externals: [
    nodeExternals({
      //   whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  watch: true,
}

const config = webpackMerge(commonConfig, devConfig)

export default config
