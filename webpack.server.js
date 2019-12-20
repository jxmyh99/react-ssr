var Path = require('path')
// 去除多余的node_modules的代码
const nodeExternals = require('webpack-node-externals')
// isomorphic-style-loader 同构css代码
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: Path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']]
        }
      },
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader', 'css-loader']
      }
    ]
  }
}
