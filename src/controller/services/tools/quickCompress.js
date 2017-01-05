import { ipcMain } from 'electron';//进程通讯模块
import _ from 'lodash';
import uglifyJS from 'uglify-js'; // https://github.com/mishoo/UglifyJS2#api-reference

ipcMain.on('tools-async-quick-compressor-js', function (event, arg) {
  if (_.isObject(arg)) {
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
          compress: arg.options//压缩选项
        });

    } catch (e) {
      error = e;
    }
    if (!error && result != null)
      newBytes = Buffer.byteLength(result.code, 'utf8');
    event.sender.send('tools-async-quick-compressor-js-reply', error, result, ''/*extra:警告*/, oldBytes, newBytes, Date.now() - startDate);

  } else
    event.sender.send('tools-async-quick-compressor-js-reply', null);
});

export default function (mainWindow) {


};
