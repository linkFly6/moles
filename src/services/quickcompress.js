(function () {
    'use strict';
    const compressor = require('yuicompressor');//yui压缩引擎
    const _ = require('lodash');
    const ipcMain = require('electron').ipcMain;//进程通讯模块
    const UglifyJS = require("uglify-js");//UglifyJS压缩引擎：https://github.com/mishoo/UglifyJS2#api-reference

    var result = UglifyJS.minify("var b = function () {};", { fromString: true });


    //监听压缩机制
    ipcMain.on('async-compressor', function (event, arg) {
        if (typeof arg === 'object') {
            //原始字节数
            var oldBytes = Buffer.byteLength(arg.source, 'utf8'), newBytes, startDate = +new Date;
            compressor.compress(arg.source, {
                charset: 'utf8',//指定读取输入文件使用的编码
                type: arg.compressType,//指定输入文件的文件类型 => js/css
                nomunge: arg.nomunge,//只压缩不混淆,bool
                'preserve-semi': arg.ps,//保留所有的分号,bool
                //'line-break': 80,//在指定的列后插入一个 line-bread 符号,int
                'disable-optimizations': arg.disableOptimizations//禁止优化,bool
            }, function (err, data, extra) {//错误，压缩后的代码，警告
                if (!err) newBytes = Buffer.byteLength(data, 'utf8');//新字节数
                event.sender.send('async-compressor-reply', err, data, extra, oldBytes, newBytes, new Date - startDate);
            });
        } else
            event.sender.send('async-compressor-reply', null);
    });



    module.exports = function (mainWindow) { }
})();