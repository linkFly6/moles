(function () {
    'use strict';
    const _ = require('lodash');
    //本地存储
    const storage = require('electron-json-storage');
    //本地存储key（文件名称）
    const STORAGENAME = 'VIEWS_SIM_COMPILE_OPTIONS';
    var globalOptions = {
        templateLiterals: true,//字符串模板
        arrowFunctions: true,//箭头函数
        blockScopedFunctions: true,//函数块级作用域
        classes: false,//支持Class
        shorthandProperties: false,//对象快捷属性
        shorthandKeys: false,//重复属性转换
        computedProperties: false,//对象中括号属性
        forOf: true,//编译for...of语法
        stickyRegex: false,//正则标记(y)
        unicodeRegex: false,//正则标记(u)
        constants: true,//const常量
        spread: true,//扩展运算符(...values)
        parameters: false,//参数默认值
        destructuring: false,//赋值解构
        blockScoping: true,//let和const块级作用域
        typeofSymbol: false,//编译typeof Symbol()
        modulesCommonjs: false,//commonJS
        modulesAmd: false,//AMD
        modulesUmd: true,//UMD
        eval: true,//包装eval
        asyncMethod: false,//async转换
        regenerator: false//Generator
    };

    app.controller('simple-Compile-ctr', ['$scope', '$timeout', ($scope, $timeout) => {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        //是否正在编译中
        $scope.compressoring = false;

        //这次压缩是否有异常
        $scope.isErrorResult = false;
        //错误文本
        $scope.errorText = '';
        //js压缩模型
        $scope.options = {
            compile: false,
            toggleConfig: function () {
                $scope.options.compile = !$scope.options.compile;
            },
            config: globalOptions
        };
        //从本地存储读取配置
        storage.get(STORAGENAME, (error, data) => {
            if (error) return;//throw error //有错误则不读取了
            if (data) {
                globalOptions = data;
                $scope.options.config = data;
            }
        });

        //监听js压缩选项变动，有变动则存入本地
        $scope.$watch('options.config', _.debounce(function (newOptions, oldOptions) {//函数节流，2s之后才会执行
            globalOptions = newOptions;
            storage.set(STORAGENAME, globalOptions, function (error, data) {
                //if (error) throw error;
                if (error) return;//有错误也不抛出
            });
        }, 2000), true/*对象属性变动都会触发*/);

        $scope.$watch('oldCodeSource', _.debounce(() => {
            if ($scope.isErrorResult) {
                $scope.$apply(() => {
                    $scope.isErrorResult = false;
                    $scope.errorText = '';
                });
            }
        }, 300));



        //开始编译
        $scope.compressor = () => {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                $scope.compressoring = true;
                ipcRenderer.send('async-compile-es', {
                    source: oldValue,
                    options: $scope.options.config
                });
            }
        }
        //编译完成
        ipcRenderer.on('async-compile-es-reply', function (event, err, data, oldBytes, newBytes, timer) {//事件源，错误，编译后的代码，编译前bytes，编译后bytes，编译耗时（ms）
            console.log(err, data);
            if (err != null) {
                $scope.$apply(() => {
                    $scope.compressoring = false;
                    $scope.info = `编译异常 - 错误行：${err.loc.line}，错误列：${err.loc.column} `;
                    $scope.isErrorResult = true;
                    $scope.errorText = `错误信息：\n${err.codeFrame}`;//\n错误明细：\n${err.stack}
                });
                return;
            }
            if (data != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = data.code;
                    $scope.compressoring = false;
                    $scope.info = `当前体积：${newBytes}byte | 原始体积：${oldBytes}byte | 比率：${(newBytes / oldBytes * 100).toFixed(2)}% | 执行时间：${timer} (ms)`;
                });
            } else {
                $scope.$apply(() => {
                    $scope.compressoring = false;
                });
            }

        });
    }]);
})();