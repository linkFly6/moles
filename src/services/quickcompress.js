(function () {
    'use strict';
    //const compressor = require('yuicompressor');//yui压缩引擎
    const _ = require('lodash');
    const ipcMain = require('electron').ipcMain;//进程通讯模块
    const uglifyJS = require("uglify-js");//UglifyJS压缩引擎：https://github.com/mishoo/UglifyJS2#api-reference
    //监听js压缩机制
    ipcMain.on('async-compressor-js', function (event, arg) {

        if (typeof arg === 'object') {
            //原始字节数
            var oldBytes = Buffer.byteLength(arg.source, 'utf8'),
                newBytes = 0,
                startDate = Date.now(),
                result = null,
                error = null;
            try {
                result = uglifyJS.minify(
                            //源码
                            arg.source,
                            {
                                fromString: true,
                                //显示代码警告
                                warnings: true,
                                compress: {
                                    warnings: true
                                }
                            });

            } catch (e) {
                error = e;
            }
            if (!error && result != null)
                newBytes = result.code;
            event.sender.send('async-compressor-js-reply', error, result, ''/*extra:警告*/, oldBytes, newBytes, Date.now() - startDate);

        } else
            event.sender.send('async-compressor-js-reply', null);
    });



    module.exports = function (mainWindow) { }
})();