const path = require('path');
const webpack = require('webpack');
const setup = require('./setup');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackPlugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(path.join(__dirname, './src/public/dist/lib/library-manifest.json'))
  })
];

const webpackConfig = {
  devtool: 'inline-source-map',
  entry: {
    'demo': './src/app/bootstrap.ts',
  },
  output: {
    path: path.join(__dirname, `./src/public/dist/`),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['raw-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?.*$|$)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?inlineSourceMap=true&sourceMap=false',
          'angular2-template-loader',
          '@angularclass/hmr-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader', 
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  devServer: {
    contentBase: './src/public',
    historyApiFallback: false,
    stats: 'minimal',
    setup: (app) => {
      setup(app);
    }
  },
  plugins: webpackPlugins,
};

module.exports = webpackConfig;