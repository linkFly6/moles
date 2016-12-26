var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: 'source-map',// false 关闭调试
  entry: {
    'app': './src/controller/main' // entry 表示入口文件，最终会从这个文件进入，进行打包
  },
  // 配置 webpack 打包环境，否则 webpack 会尝试打包原生模块，参见这里： https://github.com/webpack/docs/wiki/Configuration#target
  target: 'electron',
  output: {
    // 打包后生成的的文件存储位置
    path: path.resolve(__dirname, '../dest/controller/'),
    // 替换所有静态资源的地址　
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    // 写入到该处的扩展名，在加载的时候，可以省略后缀
    extensions: [''/* webpack 2.x 不支持空字符串，要写 * 号 */, '.js', '.vue'],
    fallback: [path.resolve(path.join(__dirname, '../node_modules'))],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve(__dirname, '../src/controller')],
        exclude: /node_modules/,
        query: {
          "presets": ["electron", "stage-2"],
          // "plugins": ["transform-runtime"],
          // "plugins": [
          //   "transform-es2015-modules-commonjs",
          //   "transform-es2015-spread",
          //   "transform-es2015-destructuring",
          //   "transform-es2015-parameters",
          //   "transform-regenerator",
          //   "transform-class-properties",
          //   "syntax-async-functions", ["transform-async-to-module-method", {
          //     "module": "bluebird",
          //     "method": "coroutine"
          //   }]
          // ],
          "comments": false
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    // // 自动压缩 js
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
  ],
  eslint: {
    // formatter: require('eslint-friendly-formatter')
  }
};

module.exports = config;

