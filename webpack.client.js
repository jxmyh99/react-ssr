var Path = require('path')

const HtmlWebpackPlugi = require('html-webpack-plugin')
// const nodeExternals = require("webpack-node-externals")
const cssloader = require('./utils/cssloader')
module.exports = {
  // target:"node",
  mode: 'development',
  entry: './client/index.js',
  // externals:[nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: Path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugi({
      filename: 'index.csr.html',
      template: 'src/index.csr.html',
      inject: true
    })],
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
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  }
}
