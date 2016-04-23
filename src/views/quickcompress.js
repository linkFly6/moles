(function () {
    'use strict';
    const _ = require('lodash');
    //本地存储
    const storage = require('electron-json-storage');
    //本地存储key（文件名称）
    const STORAGENAME = 'VIEWS_SIM_COMPRESSOR_OPTIONS';
    var globalOptions = {
        JS: {
            join_vars: true,////合并多个变量声明，加入连续的var语句
            hoist_funs: true,//函数声明置顶
            hoist_vars: true,//变量声明置顶
            drop_debugger: true,//删除调试器和调试语句（debugger）
            dead_code: true,//删除运行不到的代码
            unused: true,//删除没用的声明
            loops: true,//优化循环
            if_return: true,//优化if-else表达式
            conditionals: true,//优化条件表达式（转换成二元）
            evaluate: true,//优化常量表达式（尝试去计算常量表达式）
            nomunge: true,//优化逻辑操作符
            booleans: true,//优化布尔表达式
            properties: false//智能对象转换=>类似a['foo'] 智能优化为 a.foo
        },
        CSS: {
        }
    };
    storage.get(STORAGENAME, function (error, data) {
        if (error) throw error;
        if (data && data.js) {
            globalOptions.JS = data.js;
        }
    });
    app.controller('simple-Compressor-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        $scope.compressType = 0;
        //是否正在压缩中
        $scope.compressoring = false;
        $scope.selectType = (compressType) => {
            //切换了选项，则清空
            if ($scope.compressType != compressType) {
                $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
            }
            $scope.compressType = compressType;
        };

        //js压缩模型
        $scope.jsConfig = {
            jsComprssConfig: false,
            toggleConfig: function () {
                $scope.jsConfig.jsComprssConfig = !$scope.jsConfig.jsComprssConfig;
            },
            options: globalOptions.JS
        };

        $scope.$watch('jsConfig.options', _.debounce(function (newOptions, oldOptions) {//函数节流，2s之后才会执行
            globalOptions.JS = newOptions;
            storage.set(STORAGENAME, globalOptions, function (error, data) {
                if (error) throw error;
            })
        }, 2000), true/*对象属性变动都会触发*/);

        $scope.compressor = () => {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                $scope.compressoring = true;
                ipcRenderer.send('async-compressor', {
                    source: oldValue,
                    nomunge: $scope.nomunge,
                    ps: $scope.ps,
                    disableOptimizations: $scope.disableOptimizations,
                    compressType: $scope.compressType == 0 ? 'js' : 'css'
                });
            }
        }
        //压缩完成
        ipcRenderer.on('async-compressor-reply', function (event, err, value, extra, oldBytes, newBytes, timer) {//事件源，错误，压缩后的代码，警告，压缩前bytes，压缩后bytes，压缩耗时（ms）
            if (value != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = value;
                    $scope.compressoring = false;
                    $scope.info = `当前体积：${newBytes}byte | 原始体积：${oldBytes}byte | 比率：${(newBytes / oldBytes * 100).toFixed(2)}% | 执行时间：${timer} (ms)`;
                });
            }

        });
    }]);
})();