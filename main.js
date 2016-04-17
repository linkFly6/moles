var app = require('app');  // 控制应用生命周期的模块。
var BrowserWindow = require('browser-window');  // 创建原生浏览器窗口的模块
const ipcMain = require('electron').ipcMain;//进程通讯模块
const compressor = require('yuicompressor');//yui压缩引擎
const _ = require('lodash');
const shell = require('shell');

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
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
        maximizable: true,
        //resizable: false,
        //autoHideMenuBar: true,
        webPreferences: {

        }
    });

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/view/home.html');
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

});