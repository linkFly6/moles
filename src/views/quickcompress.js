(function () {
    'use strict';
    app.controller('simple-Compressor-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = '';
        $scope.compressType = 0;
        $scope.nomunge = false;///只压缩，不混淆
        $scope.ps = false;//保留所有的分号
        $scope.do = false;//禁止优化
        $scope.selectType = (compressType) => {

        }

        $scope.compressor = function () {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                ipcRenderer.send('async-compressor', oldValue);
            }
        }
        //压缩完成
        ipcRenderer.on('async-compressor-reply', function (event, err, value, extra) {//错误，压缩后的代码，警告
            console.info(err);
            console.log(extra);
            if (value != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = value;
                });
            }
        });
    }]);
})();