import { ipcMain, BrowserWindow } from 'electron';//进程通讯模块
import _ from 'lodash';
import path from 'path';
import url from 'url';

ipcMain.on('settings-async-new-projects-js', function (event, arg) {
  var win = new BrowserWindow({
    center: true,
    width: 350,
    height: 400,
    // 在其他窗口之前
    alwaysOnTop: true,
    minimizable: false,
    // resizable: false,
    // 最大化的几个选项
    // maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    titleBarStyle: 'hidden-inset'
  });
  win.loadURL(url.format({
    pathname: path.resolve('./', 'dest/views/childs-new-project.html'),
    protocol: 'file:',
    slashes: true
  }));

  // 注册个关闭的一次性事件，反正一定会调的
  ipcMain.once('childs-async-new-projects-config', (event, arg) => {
    if (_.isObject(arg)) {
      // 新建了一个项目，解析配置的路径，类型等等

    }
    // 关掉这个窗口
    if (win) {
      win.close();
    }
  });
  win.on('closed', () => {
    // 如果被用户关闭窗口，则主动移除掉事件
    ipcMain.removeAllListeners('childs-async-new-projects-config');
  });

});