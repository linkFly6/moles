(function () {
    'use strict';
    //const compressor = require('yuicompressor');//yui压缩引擎
    const _ = require('lodash');
    const ipcMain = require('electron').ipcMain;//进程通讯模块
    const babel = require("babel-core");//babel
    //插件列表
    [
        'transform-es2015-arrow-functions',//ES6箭头
        'transform-es2015-block-scoped-functions',//ES6方法块级作用域
        'transform-es2015-block-scoping',//ES6块级作用域
        'transform-es2015-classes',//ES6 Class
        "transform-async-to-module-method",//
    ]

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
                    presets: [],//预设插件（一组插件），内置了"es2015","react"
                    //插件列表
                    plugins: [
                        'transform-es2015-arrow-functions',//箭头函数
                        'transform-es2015-classes',//ES6 Class
                        'transform-es2015-computed-properties',//
                        'transform-es2015-duplicate-keys',//重复键自动转换
                        "transform-es2015-for-of",//for-of
                        "transform-es2015-spread",//转换es6到es5
                        "transform-es2015-template-literals",//字符串变量引用
                        "transform-regenerator",//ES6 => generator
                        "transform-async-to-module-method",//async转换

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
                error = e;
            }
            if (!error && result != null)
                newBytes = Buffer.byteLength(result.code, 'utf8');
            event.sender.send('async-compile-es-reply', error, result, oldBytes, newBytes, Date.now() - startDate);

        } else
            event.sender.send('async-compile-es-reply', new Error('参数不正确'));
    });



    module.exports = function (mainWindow) { }
})();