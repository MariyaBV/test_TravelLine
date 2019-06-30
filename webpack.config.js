const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");
module.exports = {
  entry: { main: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(jpe?g|png|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: './img/',
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          outputPath: './img/',
          name: '[name].[ext]',
        }
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unsafe: true,
            inline: true,
            passes: 2,
            keep_fargs: false,
          },
          output: {
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
  
  entry: [
    path.resolve(__dirname, '../src/js/index.js'),
  ],
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
      }),
    new ImageminPlugin({
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          imageminGifsicle({
            interlaced: true
          }),
          imageminJpegtran({
            progressive: true
          }),
          imageminOptipng({
            optimizationLevel: 5
          }),
          imageminSvgo({
            removeViewBox: true
          })
        ]
      }
    })
  ]
}