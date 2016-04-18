var app = angular.module('app', ['ngRoute']),
    ipcRenderer = require('electron').ipcRenderer;
(function () {
    'use strict';
    app.controller('index-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        //当前焦点图索引
        var currIndex = 3,
            $bannerBox = $('#b-box'),
            $bannerChild = $bannerBox.children(),
            bannerLength = $bannerChild.length,
            temp,
            createClassName = function (index) {
                return 'i-box' + index;
            },
            move2Right = function () {
                temp = $bannerChild[bannerLength - 1];
                //$bannerChild.removeAttr('class');
                for (var i = bannerLength - 1; i > 0; i--) {
                    $bannerChild[i] = $bannerChild[i - 1];
                    $bannerChild.eq(i).removeAttr('class').addClass(createClassName(i + 1)).data('index', i + 1);

                }
                $bannerChild[0] = temp;
                $bannerChild.eq(0).removeAttr('class').addClass(createClassName(1)).data('index', 1);
            },
            move2Left = function () {
                temp = $bannerChild.eq(0);
                $bannerChild.removeAttr('class');
                for (var i = 0; i < bannerLength - 1; i++) {
                    //if ($bannerChild[i + 1]) {
                    $bannerChild[i] = $bannerChild[i + 1];
                    $bannerChild.eq(i).addClass(createClassName(i + 1)).data('index', i + 1);
                    //}
                }
                temp.addClass(createClassName(bannerLength)).data('index', bannerLength);
                $bannerChild[bannerLength - 1] = temp[0];
            };
        $scope.bannerClick = (e) => {
            var clickIndex = $(e.currentTarget).data('index');
            if (clickIndex == currIndex - 1) {
                move2Right();
            } else if (clickIndex == currIndex + 1) {
                move2Left();
            } else if (currIndex === clickIndex) {
                alert('当前项');
            };
        };


        
    }]);
})();
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
(function () {
    //注册路由
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: "index.html",
            controller: 'index-ctr'
        }).when('/simCom', {
            templateUrl: 'quickcompress.html',
            controller: 'simple-Compressor-ctr'
        }).otherwise('/');//默认路由
    });
})();