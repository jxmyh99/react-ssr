var Path = require('path');

// const nodeExternals = require("webpack-node-externals")

module.exports = {
  // target:"node",
  mode:"development",
  entry:"./client/index.js",
  // externals:[nodeExternals()],
  output:{
    filename:'bundle.js',
    path:Path.resolve(__dirname,'public')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/,
        options:{
          presets:['@babel/preset-react',['@babel/preset-env']]
        }
      }
    ]
  }
}