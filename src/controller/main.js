import { app, BrowserWindow, shell } from 'electron';  // 控制应用生命周期的模块和创建原生浏览器窗口的模块
import { ipcMain } from 'electron';//进程通讯模块
import path from 'path';
import url from 'url';

import tools from './services/tools/';
import childWindow from './services/child-windows/';

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', () => {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    //frame: false/*创建一个 Frameless Window，自己重写title最大化最小化关闭按钮*/
    width: 1100, height: 700,
    minWidth: 1100,
    minHeight: 700,
    center: true,
    // fullscreen: false, // 禁止全屏幕 (隐藏 mac os 的全屏幕按钮)
    fullscreenable: false, // 在 mac os 上全屏化按钮是否可用
    maximizable: false, // 禁止最大化
    resizable: false, // 禁止缩放大小
    //autoHideMenuBar: true,
    webPreferences: {

    },
    movable: true,
    frame: false, // windows 下面隐藏标题栏
    titleBarStyle: 'hidden' // mac os 下面隐藏标题栏
  });

  ipcMain.on('window-close-window', () => {
    app.quit();
  });

  ipcMain.on('window-hide-window', () => {
    mainWindow.minimize();
  });

  // 检测操作系统
  ipcMain.once('window-async-get-os-send', (event) => {
    // Linux/Darwin/Windows_NT
    event.sender.send('window-async-get-os-reply', require('./common/os').default.type);
  });

  // 加载应用的 index.html
  // 'dest/views/index.html'
  mainWindow.loadURL(url.format({
    // #1 在 mac os 下试了 __dirname 和 __filename 都并没有什么卵用， 获取的值永远是 /
    // pathname: path.join(__dirname, 'dest/views/index.html'),
    pathname: path.resolve('./', 'dest/views/main.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.isMenuBarVisible(false);
  mainWindow.setMenu(null);//置空菜单栏
  // 打开开发工具
  mainWindow.openDevTools();

  //打开用户默认浏览器浏览指定的网页
  //shell.openExternal('https://tasaid.com');

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });

  // tools(mainWindow);
});
