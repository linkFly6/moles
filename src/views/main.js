var app = angular.module('app', ['ngRoute']),
    ipcRenderer = require('electron').ipcRenderer;
app.controller('main', ['$scope', ($scope) => {
    $scope.viewRouterName = 'index.html';
    $scope.$on('$routeChangeStart', function (event, next, current) {
        $scope.viewRouterName = next.loadedTemplateUrl;
        //console.log(arguments);
    });
}]);