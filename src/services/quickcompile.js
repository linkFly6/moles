(function () {
    'use strict';
    //const compressor = require('yuicompressor');//yui压缩引擎
    const _ = require('lodash');
    const ipcMain = require('electron').ipcMain;//进程通讯模块
    const babel = require("babel-core");//babel
    //插件列表
    //[
    //    'transform-es2015-arrow-functions',//ES6箭头
    //    'transform-es2015-block-scoped-functions',//ES6方法块级作用域
    //    'transform-es2015-block-scoping',//ES6块级作用域
    //    'transform-es2015-classes',//ES6 Class
    //    "transform-async-to-module-method",//
    //]

    //监听js压缩机制
    ipcMain.on('async-compile-es', function (event, arg) {
        if (typeof arg === 'object') {
            //原始字节数
            var oldBytes = Buffer.byteLength(arg.source, 'utf8'),
                newBytes = 0,
                startDate = Date.now(),
                result = null,
                error = null;
            try {
                result = babel.transform(arg.source, {
                    //babel配置：http://babeljs.io/docs/usage/options/
                    presets: [/*'es2015'*/],//预设插件（一组插件），内置了"es2015","react"
                    //插件列表
                    plugins: [
                            "babel-plugin-transform-es2015-template-literals",// 字符串模板 http://babeljs.io/docs/plugins/transform-es2015-template-literals/
                            "babel-plugin-transform-es2015-literals",// http://babeljs.io/docs/plugins/transform-es2015-literals/ 尼玛官网一点解释都没
                            "babel-plugin-transform-es2015-function-name",// http://babeljs.io/docs/plugins/transform-es2015-function-name/  官网也木有解释
                            "babel-plugin-transform-es2015-arrow-functions",// 箭头函数  http://babeljs.io/docs/plugins/transform-es2015-arrow-functions/
                            "babel-plugin-transform-es2015-block-scoped-functions",//函数块级作用域 http://babeljs.io/docs/plugins/transform-es2015-block-scoped-functions/
                            "babel-plugin-transform-es2015-classes",//ES6 Class http://babeljs.io/docs/plugins/transform-es2015-classes/
                            "babel-plugin-transform-es2015-object-super",//super提供了调用prototype的方式 http://babeljs.io/docs/plugins/transform-es2015-object-super/
                            "babel-plugin-transform-es2015-shorthand-properties",//对象属性的快捷定义，如obj = { x, y }
                            "babel-plugin-transform-es2015-duplicate-keys",//  http://babeljs.io/docs/plugins/transform-es2015-duplicate-keys/
                            "babel-plugin-transform-es2015-computed-properties",//对象中括号属性obj = {['x']: 1} http://babeljs.io/docs/plugins/transform-es2015-computed-properties/
                            "babel-plugin-transform-es2015-for-of",//for-of http://babeljs.io/docs/plugins/transform-es2015-for-of/
                            "babel-plugin-transform-es2015-sticky-regex", //http://babeljs.io/docs/plugins/transform-es2015-sticky-regex/    正则支持新的标记（y） - /^foo/y 参考：http://dwz.cn/3DdoJt
                            "babel-plugin-transform-es2015-unicode-regex",//这又是啥：http://babeljs.io/docs/plugins/transform-es2015-unicode-regex/ 正则表达式(u) - /\u{61}/u 参考： https://mathiasbynens.be/notes/es6-unicode-regex
                            "babel-plugin-check-es2015-constants",// const常量 http://babeljs.io/docs/plugins/check-es2015-constants/
                            "babel-plugin-transform-es2015-spread",//对象扩展运算符属性，如...foobar http://babeljs.io/docs/plugins/transform-es2015-spread/
                            "babel-plugin-transform-es2015-parameters",// 函数参数默认值及扩展运算符 function(a,b=1){} 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
                            "babel-plugin-transform-es2015-destructuring",//赋值解构  http://babeljs.io/docs/plugins/transform-es2015-destructuring/
                            "babel-plugin-transform-es2015-block-scoping",//let和const块级作用域 http://babeljs.io/docs/plugins/transform-es2015-block-scoping/
                            "babel-plugin-transform-es2015-typeof-symbol",// typeof判断symbol特性 http://babeljs.io/docs/plugins/transform-es2015-typeof-symbol/
                            //"babel-plugin-transform-es2015-modules-commonjs",//commonjs模块加载 http://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/
                            "babel-plugin-transform-es2015-modules-umd",//UMD加载
                            //"transform-es2015-modules-amd",//AMD模块加载
                            "transform-eval",//包装evel - http://babeljs.io/docs/plugins/transform-eval/
                            "transform-async-to-module-method",//async转换 http://babeljs.io/docs/plugins/syntax-async-functions/
                            "babel-plugin-transform-regenerator", //编译generator - http://babeljs.io/docs/plugins/transform-regenerator/
                            //polyfill - http://babeljs.io/docs/plugins/transform-runtime/
                            //["transform-runtime", {
                            //    "polyfill": true
                            //}]
                    ],
                    //highlightCode: true
                    ignore: null,
                    auxiliaryCommentBefore: null,
                    auxiliaryCommentAfter: null,
                    compact: "auto",//不要包括多余的空格字符和行终结。取值“auto”和true
                    minified: false,
                    retainLines: false//保留行号
                });

            } catch (e) {
                //error = e;
                throw e;
            }
            if (!error && result != null)
                newBytes = Buffer.byteLength(result.code, 'utf8');
            event.sender.send('async-compile-es-reply', error, result, oldBytes, newBytes, Date.now() - startDate);
        } else
            event.sender.send('async-compile-es-reply', new Error('参数不正确'));
    });



    module.exports = function (mainWindow) { }
})();