var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './public/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};