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