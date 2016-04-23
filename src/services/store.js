'use strict';
const app = require('app');  // 控制应用生命周期的模块。
const _ = require('lodash');
const ipcMain = require('electron').ipcMain;//进程通讯模块
const store = require('electron-json-storage');//API Documents：https://github.com/jviotti/electron-json-storage