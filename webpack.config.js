/* global module, __dirname */
const Webpack = require('webpack')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const IS_DEV = true // process.env.NODE_ENV === 'development'

const path = require('path')

function join (dest) { return path.resolve(__dirname, dest) }
function web (dest) { return join('web/static/webpack/' + dest) }

const plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': IS_DEV ? JSON.stringify('development') : JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('css/application.css'),
  new ImageminPlugin({
    disable: true, // change to false to compress images even while webpack is in debug mode
    pngquant: {
      quality: '75-90'
    },
    gifsicle: {
      optimizationLevel: 1
    },
    svgo: {},
    plugins: [] // add imagemin-mozjpeg plugin once https://github.com/sindresorhus/execa/issues/61 is available...and prob switch to image-webpack-loader
  })
]

if (IS_DEV) {
  plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin()
  )
} else {
  plugins.push(
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  )
}

module.exports = {
  devtool: IS_DEV ? 'inline-source-map' : 'eval',
  entry: web('main.jsx'),
  output: {
    path: join('priv/static'),
    filename: 'js/application.js'
  },
  resolve: {
    modules: [
      'web/static/webpack',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins,
  module: {
    noParse: /vendor\/phoenix/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap')
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  }
}
