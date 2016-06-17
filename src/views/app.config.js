﻿(function () {
    //注册路由
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: "index.html",
            controller: 'index-ctr'
        }).when('/simCom', {
            templateUrl: 'quickcompress.html',
            controller: 'simple-Compressor-ctr'
        }).when('/simCompile', {
            templateUrl: 'quickcompile.html',
            controller: 'simple-Compile-ctr'
        })
            .otherwise('/');//默认路由
    });
})();