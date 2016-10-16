/**
 * This webpack config file is for use with the client side code only. NodeJS doesn't need it with server side 
 */
module.exports = {
  entry: {
    'home': __dirname + '/client/src/home/index.js',
    'listing': __dirname + '/client/src/listing/index.js',
    'category': __dirname + '/client/src/category/index.js',
    'utils': __dirname + '/utils/utils.js'
  },
  output: {
    path: __dirname + '/client/dist/',
    filename: '[name].js'
  },
  resolve: {
    root: [
      __dirname + "/node_modules"
    ],
    alias: {
      'fs': 'fs-extra'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: "babel-loader", query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/, loader: "json-loader"
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      }
    ]
  }
}