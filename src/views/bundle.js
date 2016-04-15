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
define("vr.tpl70070700", ["$s", "$"], function ($s, $) {
    'use strict';
    var padNumber = function (num, fill, str) {
        //改自：http://blog.csdn.net/aimingoo/article/details/4492592
        str = str == null ? 0 : str;
        var len = ('' + num).length;
        return (Array(
            fill > len ? fill - len + 1 || 0 : 0
            ).join(str) + num);
    },
    htmlTemplate = '<p class="p1">{week} {day}</p><p class="p2 {className}">{txt}</p>',
    formatHTML = function (week, data) {
        var temp = '',
            dayDate = str2Date(data.date),
            xianxingStr = '<span class="bx">不限行</span>', xianxingTxt = data.num1;
        if (data.num1 != '不限行') {
            temp = 'cheng';
            switch (data.num1) {
                case '单限':
                    xianxingTxt = '单号';
                    break;
                case '双限':
                    xianxingTxt = '双号';
                    break;
            }
            xianxingStr = [xianxingTxt, data.num2 != null ? '<span>和</span>' + data.num2 : '', '<span>限行</span>'].join('');
        };
        return htmlTemplate.replace('{week}', week)
            .replace('{day}', dayDate.getMonth() + 1 + '.' + dayDate.getDate())
            .replace('{className}', temp)
            .replace('{txt}', xianxingStr);
    },
    str2Date = function (str) {
        var strs = str.split('-');
        return new Date(+strs[0], +strs[1] - 1, +strs[2]);
    }

    return function (classId, rank, datas, startdate, enddate) {
        function getId(name) {
            return "sogou_vr_" + classId + "_" + name + "_" + rank;
        }
        var $xianxing = $('#' + getId('main')).find('.m4'),
            dateNow = new Date(window.now),
            dateNowStr = dateNow.getFullYear() + '-' + padNumber(dateNow.getMonth() + 1, 2) + '-' + padNumber(dateNow.getDate(), 2),
            toDayIndex = -1,
            temp, temp1;
        //从下周的数据开始
        $.each(datas.slice(7), function (i, data) {
            if (data.date === dateNowStr) {
                toDayIndex = i + 7;
                return false;
            }
        });
        if (~toDayIndex) {
            $xianxing.eq(0).html(formatHTML('今天(' + datas[toDayIndex].week + ')', datas[toDayIndex]));
            if (datas[toDayIndex + 1]) {
                $xianxing.eq(1).html(formatHTML('明天(' + datas[toDayIndex + 1].week + ')', datas[toDayIndex + 1]));
            }
            if (datas[toDayIndex + 2]) {
                $xianxing.eq(2).html(formatHTML(datas[toDayIndex + 2].week, datas[toDayIndex + 2]));
            }
            if (datas[toDayIndex + 3]) {
                $xianxing.eq(3).html(formatHTML(datas[toDayIndex + 3].week, datas[toDayIndex + 3]));
            }
            $('#' + getId('main')).show();
        }
        if (startdate && enddate) {
            $('#' + getId('xianxingdate')).html(
                [startdate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日'),
                '-',
                enddate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日'), '限行规则'].join('')
                ).show();
        }

    }
});

//var datas = [];
//datas.push({
//    week: '周一',
//    date: '2016-03-28',
//    num1: 3,
//    num2: 8
//});
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