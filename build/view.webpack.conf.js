var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var css = require('css-loader');

var config = {
    devtool: 'source-map',// false 关闭调试
    entry: {
        'app': './src/home/main' // entry 表示入口文件，最终会从这个文件进入，进行打包
    },
    output: {
        // 打包后生成的的文件存储位置
        path: path.resolve(__dirname, '../dest/scripts/'),
        // 替换所有静态资源的地址　
        publicPath: '../scripts/',
        filename: '[name].js'
    },
    target: 'electron',
    resolve: {
        // 写入到该处的扩展名，在加载的时候，可以省略后缀
        extensions: [''/* webpack 2.x 不支持空字符串，要写 * 号 */, '.js', '.vue'],
        fallback: [path.resolve(path.join(__dirname, '../node_modules'))],
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // alias: {
        //   'src': path.resolve(__dirname, '../src')
        // }
    },
    // vue: {
    //   loaders: cssLoaders({
    //     sourceMap: false,
    //     extract: false
    //   })
    // },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                // include: [path.resolve(__dirname, '../example')],
                exclude: /node_modules/,
                //  export 语法没有编译，在根目录新建了一个 .babelrc 然后把这段代码放进去就好了，但是在这里写的话就没有卵用
                // query: {
                //     "presets": ["es2015", "stage-2"],
                //     "plugins": ["transform-runtime"],
                //     "comments": false
                // }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                loader: "file"
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            }
        ]
    },
    plugins: [
        // 自动压缩 js
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //修正HTML
        new HtmlWebpackPlugin({
            filename: '../views/index.html',// 输出的 html 资源路径,相对于 output 路径
            template: 'src/index.html',// 模板文件路径，相对于项目根目录
            inject: true,
            minify: false // 默认不压缩 HTML
            // minify: {
            //   minifyJS: true,
            //   removeComments: true,
            //   collapseWhitespace: true,
            //   removeAttributeQuotes: true
            //   more options:
            //   // https://github.com/kangax/html-minifier#options-quick-reference
            // }
        })
    ],
    eslint: {
        // formatter: require('eslint-friendly-formatter')
    }
};

module.exports = config;

