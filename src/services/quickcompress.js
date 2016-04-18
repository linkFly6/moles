(function () {
    'use strict';
    const compressor = require('yuicompressor');//yui压缩引擎
    const _ = require('lodash');
    const ipcMain = require('electron').ipcMain;//进程通讯模块
    //监听压缩机制
    ipcMain.on('async-compressor', function (event, arg) {
        if (typeof arg === 'string') {
            compressor.compress(arg, {
                charset: 'utf8',//指定读取输入文件使用的编码
                type: 'js',//指定输入文件的文件类型 
                //nomunge: true,//只压缩不混淆
                //'preserve-semi': true,//保留所有的分号
                //'line-break': 80,//在指定的列后插入一个 line-bread 符号
                //'disable-optimizations': true//禁止优化
            }, function (err, data, extra) {//错误，压缩后的代码，警告
                event.sender.send('async-compressor-reply', data);
            });
        } else
            event.sender.send('async-compressor-reply', null);
    });



    module.exports = function (mainWindow) { }
})();