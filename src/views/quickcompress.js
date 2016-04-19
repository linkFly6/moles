(function () {
    'use strict';
    //当前压缩代码信息
    app.controller('simple-Compressor-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        $scope.compressType = 0;
        $scope.nomunge = false;///只压缩，不混淆
        $scope.ps = false;//保留所有的分号
        $scope.disableOptimizations = false;//禁止优化
        //是否正在压缩中
        $scope.compressoring = false;
        $scope.selectType = (compressType) => {
            //切换了选项，则清空
            if ($scope.compressType != compressType) {
                $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
            }
            $scope.compressType = compressType;
        };

        $scope.compressor = function () {
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