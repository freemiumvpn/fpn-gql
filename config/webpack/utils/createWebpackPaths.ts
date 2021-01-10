import path from 'path'

export interface WebpackPaths {
  root: string
  src: string
  build: string
}

const createWebpackPaths = (root: string): WebpackPaths => {
  return {
    root,
    src: path.resolve(root, 'src', 'main'),
    build: path.resolve(root, 'dist'),
  }
}

export default createWebpackPaths
