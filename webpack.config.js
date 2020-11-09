const path = require("path")
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = function() {
  return {
    entry: {
      index: "./index.tsx",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        '~': path.resolve(__dirname)
      }
    },  
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'index.html' },
          { from: 'public', to: 'public' }
        ]
      }),
      new ProgressBarPlugin()
    ],
  }
}