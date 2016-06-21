(function () {
    'use strict';
    const _ = require('lodash');
    //本地存储
    const storage = require('electron-json-storage');
    //本地存储key（文件名称）
    const STORAGENAME = 'VIEWS_SIM_COMPILE_OPTIONS';
    var globalOptions = {
        JS: {
            join_vars: true,////合并多个变量声明，加入连续的var语句
            hoist_funs: true,//函数声明置顶，多个变量合并不利于压缩代码调试
            hoist_vars: true,//变量声明置顶，多个变量合并不利于压缩代码调试
            drop_debugger: true,//删除调试器和调试语句（debugger）
            dead_code: true,//删除运行不到的代码
            unused: true,//删除没用的声明
            loops: true,//优化循环
            if_return: true,//优化if-else表达式
            conditionals: true,//优化条件表达式（转换成二元）
            evaluate: true,//优化常量表达式（尝试去计算常量表达式）
            comparisons: true,//优化逻辑操作符
            booleans: true,//优化布尔表达式
            properties: false//智能对象转换=>类似a['foo'] 智能优化为 a.foo
        },
        CSS: {
        }
    };

    app.controller('simple-Compile-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        //是否正在压缩中
        $scope.compressoring = false;

        //这次压缩是否有异常
        $scope.isErrorResult = false;
        //错误文本
        $scope.errorText = '';

        //js压缩模型
        $scope.jsConfig = {
            jsComprssConfig: false,
            toggleConfig: function () {
                $scope.jsConfig.jsComprssConfig = !$scope.jsConfig.jsComprssConfig;
            },
            options: globalOptions.JS
        };
        ////从本地存储读取配置
        //storage.get(STORAGENAME, function (error, data) {
        //    if (error) return;//throw error //有错误则不读取了
        //    if (data && data.JS) {
        //        globalOptions.JS = data.JS;
        //        $scope.jsConfig.options = data.JS;
        //    }
        //});

        //监听js压缩选项变动，有变动则存入本地
        $scope.$watch('jsConfig.options', _.debounce(function (newOptions, oldOptions) {//函数节流，2s之后才会执行
            globalOptions.JS = newOptions;
            //storage.set(STORAGENAME, globalOptions, function (error, data) {
            //    //if (error) throw error;
            //    if (error) return;//有错误也不抛出
            //});
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
                    options: $scope.jsConfig.options
                });
            }
        }
        //编译完成
        ipcRenderer.on('async-compile-es-reply', function (event, err, data, oldBytes, newBytes, timer) {//事件源，错误，编译后的代码，编译前bytes，编译后bytes，编译耗时（ms）
            console.log(err);
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