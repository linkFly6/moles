(function () {
    'use strict';
    var app = angular.module('app'),
        ipcRenderer = require('electron').ipcRenderer;
    app.controller('simple-Compressor-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = '';
        $scope.compressor = function () {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                ipcRenderer.send('async-compressor', oldValue);
            }
        }
        //压缩完成
        ipcRenderer.on('async-compressor-reply', function (event, value) {
            if (value != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = value;
                });
            }
        });
    }]);
})();