import { ipcMain } from 'electron';//进程通讯模块
import _ from 'lodash';
import * as babel from 'babel-core';

// 是 presets 不是 【pa】resets
var presets = [
  'es2015',
  'es2016',
  'es2017',
  'stage-0',
  'stage-1',
  'stage-2',
  'stage-3',
  'react'
];

var plugins = {
  templateLiterals: "babel-plugin-transform-es2015-template-literals",// 字符串模板 http://babeljs.io/docs/plugins/transform-es2015-template-literals/
  arrowFunctions: "babel-plugin-transform-es2015-arrow-functions",// 箭头函数  http://babeljs.io/docs/plugins/transform-es2015-arrow-functions/
  blockScopedFunctions: "babel-plugin-transform-es2015-block-scoped-functions",//函数块级作用域 http://babeljs.io/docs/plugins/transform-es2015-block-scoped-functions/
  classes: "babel-plugin-transform-es2015-classes",//ES6 Class http://babeljs.io/docs/plugins/transform-es2015-classes/
  shorthandProperties: "babel-plugin-transform-es2015-shorthand-properties",//对象属性的快捷定义，如obj = { x, y }
  shorthandKeys: "babel-plugin-transform-es2015-duplicate-keys",//  重复属性转换&#10;当检测到属性重复，则采用[对象中括号属性]处理 http://babeljs.io/docs/plugins/transform-es2015-duplicate-keys/
  computedProperties: "babel-plugin-transform-es2015-computed-properties",//对象中括号属性obj = {['x']: 1} http://babeljs.io/docs/plugins/transform-es2015-computed-properties/
  forOf: "babel-plugin-transform-es2015-for-of",//for-of http://babeljs.io/docs/plugins/transform-es2015-for-of/
  stickyRegex: "babel-plugin-transform-es2015-sticky-regex", //http://babeljs.io/docs/plugins/transform-es2015-sticky-regex/    正则支持新的标记（y） - /^foo/y 参考：http://dwz.cn/3DdoJt
  unicodeRegex: "babel-plugin-transform-es2015-unicode-regex",//这又是啥：http://babeljs.io/docs/plugins/transform-es2015-unicode-regex/ 正则表达式(u) - /\u{61}/u 参考： https://mathiasbynens.be/notes/es6-unicode-regex
  constants: "babel-plugin-check-es2015-constants",// const常量 http://babeljs.io/docs/plugins/check-es2015-constants/
  spread: "babel-plugin-transform-es2015-spread",//对象扩展运算符属性，如...foobar http://babeljs.io/docs/plugins/transform-es2015-spread/
  parameters: "babel-plugin-transform-es2015-parameters",// 函数参数默认值及扩展运算符 function(a,b=1){} 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
  destructuring: "babel-plugin-transform-es2015-destructuring",//赋值解构  http://babeljs.io/docs/plugins/transform-es2015-destructuring/
  blockScoping: "babel-plugin-transform-es2015-block-scoping",//let和const块级作用域 http://babeljs.io/docs/plugins/transform-es2015-block-scoping/
  exponentiationOperator: "transform-exponentiation-operator", // 幂运算，ES2016 规范 http://babeljs.io/docs/plugins/transform-exponentiation-operator/


  // 先就这些属性

  transformRuntime: "transform-runtime", // babel 通用模块运行时

  // 特殊需要计算的属性
  modulesCommonjs: "babel-plugin-transform-es2015-modules-commonjs",//编译为commonJS模块&#10;和AMD/UMD编译选项不兼容 http://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/ 
  modulesAmd: "transform-es2015-modules-amd", // 编译为AMD模块&#10;和commonJS/UMC编译选项不兼容
  modulesUmd: "babel-plugin-transform-es2015-modules-umd" // 编译为UMD模块&#10;和commonJS/AMD编译选项不兼容
};


// TODO 还有两个很重要的包，babel-plugin-transform-runtime 和 babel-polyfill
function getBabelPresets(presets) {
  if (!_.isObject(presets)) return [];
  return Object.keys(presets).filter(key => {
    return presets[key];
  });
}


// 是不是 presets 和 plugins 并不互斥？？
function getBabelPlugins(options) {
  if (!_.isObject(options)) return [];
  return Object.keys(options).map(key => {
    return options[key] && plugins[key] ? plugins[key] : false;
  }).filter(plugins => plugins);
}

function loadBabelConfig(presets, plugins) {
  return {
    // https://babeljs.io/docs/core-packages/
    presets: getBabelPresets(presets),
    plugins: getBabelPlugins(plugins),
    /*
       默认 babel 通过 codeFrame 抛出异常 ： http://babeljs.io/docs/core-packages/babel-code-frame/
       codeFrame 抛出的异常是在 shell 下面使用的
     */
    highlightCode: false,
    // 不会尝试自动压缩
    compact: false
  };
}

ipcMain.on('tools-async-quick-compile-js', function (event, arg) {
  if (_.isObject(arg)) {
    //原始字节数
    var oldBytes = Buffer.byteLength(arg.source, 'utf8'),
      newBytes = 0,
      startDate = Date.now(),
      result = null,
      error = null;
    try {
      const config = loadBabelConfig(
        arg.presets,
        arg.plugins
      );
      result = babel.transform(arg.source, config);
    } catch (e) {
      error = e;
    }
    if (!error && result != null)
      newBytes = Buffer.byteLength(result.code, 'utf8');
    event.sender.send('tools-async-quick-compile-js-reply', error, result, oldBytes, newBytes, Date.now() - startDate);

  } else
    event.sender.send('tools-async-quick-compile-js-reply', null);
});

export default function (mainWindow) {


};
