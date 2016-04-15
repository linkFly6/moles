(function () {
    var app = angular.module('app', ['ngRoute']);
    //注册路由
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            template: "<h2>这个是默认的模板哦</h2>"
        }).when('/simCom', {
            templateUrl: 'quickcompress.html',
            controller: 'simple-Compressor-ctr'
        }).otherwise('/');//默认路由
    });
})();
(function () {

})();
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